/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import Application from "../../src/support/Application.mjs"

function handleError(error, request, response, next) {
  const status = error.httpCode || 500

  const responseObject = {
    status,
    message: status === 400 ? JSON.parse(error.message) : error.message,
  }

  if (!Application.isInProductionMode()) {
    responseObject.stack = error.stack || null
  }
  console.log(responseObject)

  return response.status(status).json(responseObject)
}

export default {
  handle: (app) => {
    app.use(handleError)
  },
}
