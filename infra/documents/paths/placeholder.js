export default {
  '/v1/users': {
    post: {
      summary: 'Cadastro de Usuário',
      description: 'Cadastro de Usuário',
      tags: ['User'],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'User token',
          required: true
        },
        {
          in: 'body',
          name: 'body',
          description: 'Cadastro de useuário.',
          required: true,
          schema: {
            type: 'object',
            properties: {
              _______: {
                type: 'string',
                required: true
              },
              ___________r: {
                type: 'string',
                required: true
              },
              _____: {
                type: 'number',
                example: 9.999,
                required: true
              },
              date: {
                type: 'string',
                example: '2022-08-23',
                required: true
              }
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'User cadastrado com sucesso.'
        },
        401: {
          description: 'Token inválido ou expirado'
        },
        400: {
          description: 'Parâmetros inválidos.'
        },
        422: {
          description: 'User já existe'
        },
        500: {
          description: 'Erro interno no servidor'
        }
      }
    },
    get: {
      summary: 'Busca de todos os usuários',
      description: 'Retorna 10 usuários oriundos do endpoint: https://jsonplaceholder.typicode.com/users',
      tags: ['Users'],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'User token',
          required: false
        },
        {
          in: 'query',
          name: 'searchUsers',
          description: 'Identificação do produtorSupervisor',
          required: false,
          type: 'string'
        },
        {
          in: 'query',
          name: 'date',
          description: 'Date from',
          example: 'yyyy-MM-dd',
          required: false,
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'User localizado com sucesso.'
        },
        401: {
          description: 'Token inválido ou expirado'
        },
        400: {
          description: 'Parâmetros inválidos.'
        },
        404: {
          description: 'User não localizado'
        },
        500: {
          description: 'Erro interno no servidor'
        }
      }
    }
  },
  '/v1/user/{id}': {
    get: {
      summary: 'Busca de usuário',
      description: 'Busca de usuário',
      tags: ['User'],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'User token',
          required: false
        },
        {
          in: 'path',
          name: 'id',
          description: 'código único de Identificação do usuário',
          required: true,
          type: 'string'
        },
        {
          in: 'query',
          name: 'fromDate',
          description: 'Date from',
          example: 'yyyy-MM-dd',
          required: false,
          type: 'string'
        },
        {
          in: 'query',
          name: 'toDate',
          description: 'Date to',
          example: 'yyyy-MM-dd',
          required: false,
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'Usuário localizado com sucesso.'
        },
        401: {
          description: 'Token inválido ou expirado'
        },
        400: {
          description: 'Parâmetros inválidos.'
        },
        404: {
          description: 'Usuário volume não localizado'
        },
        500: {
          description: 'Erro interno no servidor'
        }
      }
    },
    delete: {
      summary: 'remove um usuário',
      description: 'remove 1 usuário do banco de dados, conforme id indicado',
      tags: ['User'],
      parameters: [
        // {
        //   in: 'header',
        //   name: 'Authorization',
        //   description: 'User token',
        //   required: false
        // },
        {
          in: 'path',
          name: 'id',
          description: 'user Id',
          required: true,
          type: 'string',
          format: 'UUID'
        },
        {
          in: 'query',
          name: 'date',
          description: 'Date from',
          example: 'yyyy-MM-dd',
          required: false,
          type: 'string'
        }
      ],
      responses: {
        200: {
          description: 'User localizado com sucesso.'
        },
        401: {
          description: 'Token inválido ou expirado'
        },
        400: {
          description: 'Parâmetros inválidos.'
        },
        404: {
          description: 'User não localizado'
        },
        500: {
          description: 'Erro interno no servidor'
        }
      }
    }
  }
  // '/v1/user': {
  //   post: {
  //     summary: 'Cadastro de Volume',
  //     description: 'Cadastro de Volume',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'body',
  //         name: 'body',
  //         description: 'Cadastro de volume.',
  //         required: true,
  //         schema: {
  //           type: 'object',
  //           properties: {
  //             identifier: {
  //               type: 'string',
  //               required: true
  //             },
  //             identifierProducer: {
  //               type: 'string',
  //               required: true
  //             },
  //             volume: {
  //               type: 'number',
  //               example: 9.999,
  //               required: true
  //             },
  //             date: {
  //               type: 'string',
  //               example: '2022-08-23',
  //               required: true
  //             }
  //           }
  //         }
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume cadastrado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       422: {
  //         description: 'Volume já existe'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // }
  // '/v1/user': {
  //   post: {
  //     summary: 'Cadastro de Volume',
  //     description: 'Cadastro de Volume',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'body',
  //         name: 'body',
  //         description: 'Cadastro de volume.',
  //         required: true,
  //         schema: {
  //           type: 'object',
  //           properties: {
  //             identifier: {
  //               type: 'string',
  //               required: true
  //             },
  //             identifierProducer: {
  //               type: 'string',
  //               required: true
  //             },
  //             volume: {
  //               type: 'number',
  //               example: 9.999,
  //               required: true
  //             },
  //             date: {
  //               type: 'string',
  //               example: '2022-08-23',
  //               required: true
  //             }
  //           }
  //         }
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume cadastrado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       422: {
  //         description: 'Volume já existe'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // }
  // '/v1/volume/Supervisor/sumAndMedia': {
  //   get: {
  //     summary: 'Busca de Volume por Carteira de Supervisor',
  //     description: 'Busca de Volume por Carteira de Supervisor',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'query',
  //         name: 'codSupBuy',
  //         description: 'Identificação do produtorSupervisor',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'fromDate',
  //         description: 'Date from',
  //         example: 'yyyy-MM-dd',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'toDate',
  //         description: 'Date to',
  //         example: 'yyyy-MM-dd',
  //         required: true,
  //         type: 'string'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume localizado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       404: {
  //         description: 'Volume não localizado'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // },
  // '/v1/volume/Supervisor/dailyAverage': {
  //   get: {
  //     summary: 'Busca de Média Diária por Carteira de Supervisor',
  //     description: 'Busca de Média Diária por Carteira de Supervisor',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: false
  //       },
  //       {
  //         in: 'query',
  //         name: 'codSupBuy',
  //         description: 'Identificação do produtorSupervisor',
  //         required: false,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'fromDate',
  //         description: 'Date from',
  //         example: 'yyyy-MM-dd',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'toDate',
  //         description: 'Date to',
  //         example: 'yyyy-MM-dd',
  //         required: true,
  //         type: 'string'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume localizado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       404: {
  //         description: 'Volume não localizado'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // },
  // '/v1/volume/Supervisor/priceAverage': {
  //   get: {
  //     summary: 'Busca de Média de Preço do Litro de Leite por Carteira de Supervisor',
  //     description: 'Busca de Média de Preço do Litro de Leite por Carteira de Supervisor',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'query',
  //         name: 'codSupBuy',
  //         description: 'Identificação do produtorSupervisor',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'date',
  //         description: 'Date from',
  //         example: 'yyyy-MM-dd',
  //         required: true,
  //         type: 'string'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume localizado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       404: {
  //         description: 'Volume não localizado'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // },
  // '/v1/volume/Supervisor/priceAverage/months': {
  //   get: {
  //     summary: 'Busca de Média de Preço dos Últimos Doze Meses por Carteira de Supervisor',
  //     description: 'Busca de Média de Preço do Litro de LeiteÚltimos Doze Meses por Carteira de Supervisor',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: false
  //       },
  //       {
  //         in: 'query',
  //         name: 'codSupBuy',
  //         description: 'Identificação do produtorSupervisor',
  //         required: false,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'date',
  //         description: 'Date from',
  //         example: 'yyyy-MM-dd',
  //         required: true,
  //         type: 'string'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume localizado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       404: {
  //         description: 'Volume não localizado'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // },
  // '/v1/volume/{identifier}': {
  //   put: {
  //     summary: 'Atualização de Volume',
  //     description: 'Atualização de Volume',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'path',
  //         name: 'identifier',
  //         description: 'Identificação do cadastro',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'body',
  //         name: 'body',
  //         description: 'Atualização de Volume',
  //         required: true,
  //         schema: {
  //           type: 'object',
  //           properties: {
  //             identifierProducer: {
  //               type: 'string'
  //             },
  //             volume: {
  //               type: 'number',
  //               example: 9.999
  //             },
  //             date: {
  //               type: 'string',
  //               example: '2022-08-23'
  //             }
  //           }
  //         }
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume atualizado com sucesso.'
  //       },
  //       400: {
  //         description: 'Error: Parâmetros inválidos.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       422: {
  //         description: 'Error: Volume já existe'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   },
  //   delete: {
  //     summary: 'Excluir Volume',
  //     description: 'Excluir Volume',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'path',
  //         name: 'identifier',
  //         description: 'identifier',
  //         required: true,
  //         type: 'string'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume removido com sucesso.'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       404: {
  //         description: 'Volume não localizado'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // },
  // // '/v1/volume/sumVolume': {
  // //   get: {
  // //     summary: 'Sum Volume search date',
  // //     description: 'Sum Volume search date',
  // //     tags: ['Volume'],
  // //     parameters: [
  // //       {
  // //         in: 'query',
  // //         name: 'code',
  // //         description: 'code user',
  // //         required: true,
  // //         example: '0101282882'
  // //       },
  // //       {
  // //         in: 'query',
  // //         name: 'from',
  // //         required: true,
  // //         type: 'string',
  // //         example: '2020-02-10'
  // //       },
  // //       {
  // //         in: 'query',
  // //         name: 'to',
  // //         required: true,
  // //         type: 'string',
  // //         example: '2020-02-10'
  // //       }
  // //     ],
  // //     responses: {
  // //       200: {
  // //         description: 'Volume successfully search'
  // //       },
  // //       400: {
  // //         description: 'Error searching Volume'
  // //       },
  // //       500: {
  // //         description: 'Internal server Error'
  // //       }
  // //     }
  // //   }

  // // },
  // // '/v1/volume/mediaVolume': {
  // //   get: {
  // //     summary: 'Media Volume search date',
  // //     description: 'Media Volume search date',
  // //     tags: ['Volume'],
  // //     parameters: [
  // //       {
  // //         in: 'query',
  // //         name: 'code',
  // //         description: 'code user',
  // //         required: true,
  // //         example: '0101282882'
  // //       },
  // //       {
  // //         in: 'query',
  // //         name: 'from',
  // //         required: true,
  // //         type: 'string',
  // //         example: '2020-02-10'
  // //       }
  // //     ],
  // //     responses: {
  // //       200: {
  // //         description: 'Volume successfully search'
  // //       },
  // //       400: {
  // //         description: 'Error searching Volume'
  // //       },
  // //       500: {
  // //         description: 'Internal server Error'
  // //       }
  // //     }
  // //   }

  // // },
  // // '/v1/volume/mediaVolumeMonths': {
  // //   get: {
  // //     summary: 'Media Volume months',
  // //     description: 'Media Volume months',
  // //     tags: ['Volume'],
  // //     parameters: [
  // //       {
  // //         in: 'query',
  // //         name: 'code',
  // //         description: 'code user',
  // //         required: true,
  // //         example: '0101282882'
  // //       },
  // //       {
  // //         in: 'query',
  // //         name: 'from',
  // //         required: true,
  // //         type: 'string',
  // //         example: '2020-02-10'
  // //       },
  // //       {
  // //         in: 'query',
  // //         name: 'to',
  // //         required: true,
  // //         type: 'string',
  // //         example: '2020-02-10'
  // //       }
  // //     ],
  // //     responses: {
  // //       200: {
  // //         description: 'Volume successfully search'
  // //       },
  // //       400: {
  // //         description: 'Error searching Volume'
  // //       },
  // //       500: {
  // //         description: 'Internal server Error'
  // //       }
  // //     }
  // //   }

  // // },
  // // '/v1/volume/variantVolumeMonths': {
  // //   get: {
  // //     summary: 'Variant Volume months',
  // //     description: 'Variant Volume months',
  // //     tags: ['Volume'],
  // //     parameters: [
  // //       {
  // //         in: 'query',
  // //         name: 'code',
  // //         description: 'code user',
  // //         required: true,
  // //         example: '0101282882'
  // //       },
  // //       {
  // //         in: 'query',
  // //         name: 'from',
  // //         required: true,
  // //         type: 'string',
  // //         example: '2020-02-10'
  // //       }
  // //     ],
  // //     responses: {
  // //       200: {
  // //         description: 'Volume successfully search'
  // //       },
  // //       400: {
  // //         description: 'Error searching Volume'
  // //       },
  // //       500: {
  // //         description: 'Internal server Error'
  // //       }
  // //     }
  // //   }

  // // },
  // '/v1/volumeMetric': {
  //   get: {
  //     summary: 'Busca de Volume',
  //     description: 'Busca de Volume',
  //     tags: ['Volume'],
  //     parameters: [
  //       {
  //         in: 'header',
  //         name: 'Authorization',
  //         description: 'User token',
  //         required: true
  //       },
  //       {
  //         in: 'query',
  //         name: 'dateFrom',
  //         description: 'Date from',
  //         example: 'yyyy-mm-dd',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'dateTo',
  //         description: 'Date to',
  //         example: 'yyyy-mm-dd',
  //         required: true,
  //         type: 'string'
  //       },
  //       {
  //         in: 'query',
  //         name: 'identifierProducer',
  //         description: 'Identifier producer',
  //         example: '000099999',
  //         required: true,
  //         type: 'string'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Volume localizado com sucesso.'
  //       },
  //       401: {
  //         description: 'Token inválido ou expirado'
  //       },
  //       400: {
  //         description: 'Parâmetros inválidos.'
  //       },
  //       404: {
  //         description: 'Volume volume não localizado'
  //       },
  //       500: {
  //         description: 'Erro interno no servidor'
  //       }
  //     }
  //   }
  // }
};
