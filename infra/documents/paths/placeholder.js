export default {
  "/v1/users": {
    get: {
      summary: "Busca de todos os usuários",
      description:
        "Retorna 10 usuários oriundos do endpoint: https://jsonplaceholder.typicode.com/users",
      tags: ["Users"],
      parameters: [
        {
          in: "header",
          name: "Authorization",
          description: "User token",
          required: false,
        },
        {
          in: "query",
          name: "searchUsers",
          description: "Identificação do produtorSupervisor",
          required: false,
          type: "string",
        },
        {
          in: "query",
          name: "date",
          description: "Date from",
          example: "yyyy-MM-dd",
          required: false,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "User localizado com sucesso.",
        },
        401: {
          description: "Token inválido ou expirado",
        },
        400: {
          description: "Parâmetros inválidos.",
        },
        404: {
          description: "User não localizado",
        },
        500: {
          description: "Erro interno no servidor",
        },
      },
    },
  },
  "/v1/user/{id}": {
    get: {
      summary: "Busca de usuário",
      description: "Busca de usuário",
      tags: ["User"],
      parameters: [
        {
          in: "header",
          name: "Authorization",
          description: "User token",
          required: false,
        },
        {
          in: "path",
          name: "id",
          description: "código único de Identificação do usuário",
          required: true,
          type: "string",
        },
        {
          in: "query",
          name: "fromDate",
          description: "Date from",
          example: "yyyy-MM-dd",
          required: false,
          type: "string",
        },
        {
          in: "query",
          name: "toDate",
          description: "Date to",
          example: "yyyy-MM-dd",
          required: false,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Usuário localizado com sucesso.",
        },
        401: {
          description: "Token inválido ou expirado",
        },
        400: {
          description: "Parâmetros inválidos.",
        },
        404: {
          description: "Usuário volume não localizado",
        },
        500: {
          description: "Erro interno no servidor",
        },
      },
    },
    delete: {
      summary: "remove um usuário",
      description: "remove 1 usuário do banco de dados, conforme id indicado",
      tags: ["User"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "user Id",
          required: true,
          type: "string",
          format: "UUID",
        },
      ],
      responses: {
        200: {
          description: "User localizado com sucesso.",
        },
        401: {
          description: "Token inválido ou expirado",
        },
        400: {
          description: "Parâmetros inválidos.",
        },
        404: {
          description: "User não localizado",
        },
        500: {
          description: "Erro interno no servidor",
        },
      },
    },
  },
  "/v1/users/search/:date": {
    get: {
      summary: "Busca de usuário por data",
      description: "Busca de usuário por data",
      tags: ["Users"],
      parameters: [
        {
          in: "query",
          name: "createdAt",
          description:
            "createdAt (Formato de data ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ)",
          // example: "2023-05-20T00:00:00.000Z", // Exemplo atualizado ou removido
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Usuário localizado com sucesso.",
        },
        400: {
          description: "Parâmetros inválidos.",
        },
        404: {
          description: "Usuário não localizado",
        },
        500: {
          description: "Erro interno no servidor",
        },
      },
    },
  },
  "/v1/user": {
    post: {
      summary: "Cadastro de Usuário",
      description: "Cadastro de Usuário",
      tags: ["User"],
      parameters: [
        // {
        //   in: 'header',
        //   name: 'Authorization',
        //   description: 'User token',
        //   required: false
        // },
        {
          in: "body",
          name: "body",
          description: "Cadastro de Usuário.",
          required: true,
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                required: true,
              },
              username: {
                type: "string",
                required: true,
              },
              email: {
                type: "string",
                required: true,
              },
              address: {
                type: "object",
                properties: {
                  street: {
                    type: "string",
                    required: true,
                  },
                  suite: {
                    type: "string",
                    required: true,
                  },
                  city: {
                    type: "string",
                    required: true,
                  },
                  zipcode: {
                    type: "string",
                    required: true,
                  },
                  geo: {
                    type: "object",
                    properties: {
                      lat: {
                        type: "string",
                        required: false,
                      },
                      lng: {
                        type: "string",
                        required: false,
                      },
                    },
                    required: false,
                  },
                },
                required: true,
              },
              phone: {
                type: "string",
                required: true,
              },
              website: {
                type: "string",
                required: true,
              },
              company: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    required: true,
                  },
                  catchPhrase: {
                    type: "string",
                    required: true,
                  },
                  bs: {
                    type: "string",
                    required: true,
                  },
                },
                required: true,
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "Usuário cadastrado com sucesso.",
        },
        401: {
          description: "Token inválido ou expirado",
        },
        400: {
          description: "Parâmetros inválidos.",
        },
        422: {
          description: "Usuário já existe",
        },
        500: {
          description: "Erro interno no servidor",
        },
      },
    },
  },
}
