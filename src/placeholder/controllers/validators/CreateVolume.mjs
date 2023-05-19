import Ajv from "ajv"
import addFormats from "ajv-formats"
let ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schemaVolume = {
  type: "object",
  properties: {
    identifier: {
      type: "string",
      minLength: 1,
    },
    volume: {
      type: "number",
      minimum: 1,
    },
    date: {
      type: "string",
      format: "date",
    },
    identifierProducer: {
      type: "string",
    },
  },
  required: ["identifier", "volume", "date", "identifierProducer"],
  additionalProperties: false,
}

async function validate(data) {
  const validateVolume = ajv.compile(schemaVolume)
  const resultVolume = validateVolume(data)

  if (resultVolume) {
    return resultVolume
  }
  return validateVolume.errors
}

export default {
  validate,
}
