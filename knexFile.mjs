// app.mjs
import express from "express"
import knex from "knex"
import { v4 as uuidv4 } from "uuid"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import geolib from "geolib"
import * as turf from "@turf/turf"

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
function wktToGeoJSON(wkt) {
  let polygonCoordinates
  if (typeof wkt === "string") {
    console.log("wkt recebido:", wkt)
    // Extract coordinates from WKT string
    const coords = wkt.substring(wkt.indexOf("((") + 2, wkt.lastIndexOf("))"))
    polygonCoordinates = coords.split(",").map((coord) => {
      const [lng, lat] = coord.trim().split(" ")
      return [parseFloat(lat), parseFloat(lng)]
    })
  } else if (Array.isArray(wkt)) {
    // Assume the input is already an array of coordinates [lng, lat]
    polygonCoordinates = wkt.map((coord) => [
      parseFloat(coord[1]),
      parseFloat(coord[0]),
    ])
  } else {
    throw new Error("Invalid input format for areaCoordinates.")
  }

  return {
    type: "Polygon",
    coordinates: [polygonCoordinates],
  }
}

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

app.get("/check-point/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params

    // Arredondar as coordenadas para evitar problemas de precisão
    const roundedLat = parseFloat(lat).toFixed(6)
    const roundedLng = parseFloat(lng).toFixed(6)
    const pointWKT = `POINT(${roundedLng} ${roundedLat})`

    const users = await db
      .select("area_geom")
      .from("users")
      .whereRaw("ST_Contains(area_geom, ST_GeomFromText(?, 4326))", [pointWKT])

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum usuário encontrado dentro do polígono." })
    }

    const point = turf.point([parseFloat(roundedLng), parseFloat(roundedLat)])

    const usersInsidePolygon = users.filter((user) => {
      const geoJSONPolygon = wktToGeoJSON(user.area_geom)
      return turf.booleanPointInPolygon(point, geoJSONPolygon, {
        ignoreBoundary: true,
      })
    })

    if (usersInsidePolygon.length > 0) {
      res.status(200).json({
        message: "Existem usuários dentro do polígono.",
        users: usersInsidePolygon,
      })
    } else {
      res.status(200).json({ message: "Não há usuários dentro do polígono." })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    res.status(500).json({ message: "Erro ao processar a solicitação." })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
