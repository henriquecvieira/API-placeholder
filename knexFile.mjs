import express from "express"
import knex from "knex"
import { v4 as uuidv4 } from "uuid"
import { getCoords } from "@turf/turf"

const app = express()

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "najela2503",
    database: "teste",
  },
})

app.use(express.json())

// Função para criar a tabela "users" com a coluna "geolocation"
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
    table.specificType("area", "GEOMETRY(Polygon, 4326)") // Adicionando a coluna de área como um polígono
  })
}

const createPolygonGeometry = (coordinates) => {
  // O objeto geométrico de polígono deve ser representado como um array de arrays de coordenadas
  // O primeiro e o último ponto devem ser iguais para fechar o polígono

  // Convertendo as coordenadas em um formato compatível com o PostgreSQL
  const polygonCoordinates = coordinates.map((coord) => {
    return `${coord[1]} ${coord[0]}` // Invertendo a ordem das coordenadas (latitude, longitude)
  })

  return `POLYGON((${polygonCoordinates.join(", ")}, ${polygonCoordinates[0]}))`
}

app.get("/users/polygon", async (req, res) => {
  try {
    // Obter as coordenadas do polígono do banco de dados (substitua "users" pelo nome correto da tabela)
    const polygonCoordinates = await db
      .select("area") // Selecionar a coluna "area" que contém as coordenadas do polígono
      .from("users") // Tabela onde os dados estão armazenados (substitua "users" pelo nome correto da tabela)
      .first() // Obter apenas o primeiro resultado (supondo que haja apenas um registro com as coordenadas)

    if (polygonCoordinates && polygonCoordinates.area) {
      // Retornar as coordenadas do polígono como resposta
      res.status(200).json({ polygonCoordinates: polygonCoordinates.area })
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

app.post("/users", async (req, res) => {
  try {
    const { areaCoordinates, ...userData } = req.body

    // Gerando um ID único para o usuário usando o pacote "uuid"
    const userId = uuidv4()

    const area = createPolygonGeometry(areaCoordinates)

    if (!(await db.schema.hasTable("users"))) {
      await createUsersTable()
    }

    await db("users").insert({ ...userData, _id: userId, area })

    res.status(201).json({ message: "Usuário salvo com sucesso!" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao salvar usuário." })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
