// app.mjs
import express from "express"
import knex from "knex"
import { v4 as uuidv4 } from "uuid"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import geolib from "geolib"
import * as turf from "@turf/turf"
import wellknown from "wellknown";
import wkx from "wkx";


const app = express()
app.use(express.json())

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "najela2503",
    database: "teste",
  },
})

const createUsersTable = async () => {
  await db.schema.createTable("users", (table) => {
    table.uuid("_id").primary()
    table.integer("id").notNullable()
    table.string("name").notNullable()
    table.jsonb("address").notNullable()
    table.string("phone").notNullable()
    table.string("website").notNullable()
    table.jsonb("company").notNullable()
    table.string("email").notNullable()
    table.timestamp("createdAt").defaultTo(db.fn.now())
    table.specificType("area", "GEOMETRY(Polygon, 4326)")
  })
}
app.post("/users", async (req, res) => {
  try {
    const { areaCoordinates, ...userData } = req.body
    const userId = uuidv4()
    const areaGeomWKT = `POLYGON((${areaCoordinates
      .map((coords) => coords.join(" "))
      .join(",")}))`

    if (!(await db.schema.hasTable("users"))) {
      await createUsersTable()
    }

    await db("users").insert({
      ...userData,
      _id: userId,
      area_geom: db.raw(`ST_GeomFromText('${areaGeomWKT}', 4326)`),
    })

    res.status(201).json({ message: "Usuário salvo com sucesso!" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao salvar usuário." })
  }
})

app.get("/users/polygon", async (req, res) => {
  try {
    const polygonCoordinates = await db.select("area").from("users").first()

    if (polygonCoordinates && polygonCoordinates.area) {
      res.status(200).json(polygonCoordinates.area)
    } else {
      res.status(404).json({ message: "Nenhum polígono encontrado." })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: "Erro ao obter as coordenadas do polígono." })
  }
})



const wktToGeoJSON = (wktString) => {
  if (typeof wktString !== "string") {
    throw new Error("Invalid input format for areaCoordinates.");
  }

  console.log("WKT:", wktString);

  const geoJSON = wellknown.parse(wktString);

  console.log("Parsed GeoJSON:", geoJSON);

  if (geoJSON === null) {
    throw new Error("Failed to parse WKT to GeoJSON.");
  }

  if (geoJSON.type !== "Polygon") {
    throw new Error("Invalid GeoJSON type. Only Polygon is supported.");
  }

  return geoJSON;
};

app.get("/check-point/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const pointWKT = `POINT(${lng} ${lat})`;
    console.log("pointWKT:", pointWKT);

    const usersResult = await db.select("*").from("users");

    const point = turf.point([Number(lng), Number(lat)]);

    const usersInsidePolygon = await Promise.all(
      usersResult.map(async (user) => {
        if (!user.area_geom) {
          return null;
        }

        const geoJSONPolygon = wktToGeoJSON(user.area_geom);
        console.log("GeoJSON polygon:", geoJSONPolygon);

        const isInside = await db.raw(
          `SELECT ST_Contains(ST_SetSRID(ST_GeomFromWKB(?), 4326), ST_SetSRID(ST_GeomFromText('POINT(${lng} ${lat})'), 4326)) as is_inside`,
          [user.area_geom]
        );

        if (isInside.rows[0].is_inside) {
          return user;
        } else {
          return null;
        }
      })
    );

    const filteredUsers = usersInsidePolygon.filter((user) => user !== null);

    res.status(200).json({
      message: "Usuários encontrados dentro do polígono:",
      users: filteredUsers,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Erro ao processar a solicitação." });
  }
});



const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
