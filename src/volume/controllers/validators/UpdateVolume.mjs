import Ajv from 'ajv'
import addFormats from 'ajv-formats'
let ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schemaVolume = {
  type: 'object',
  properties: {
    volume: {
      type: 'number',
      minLength: 1
    },
    date: {
      type: 'string',
      format: 'date'
    },
    identifierProducer: {
      type: 'string',
      minLength: 1
    }
  },
  required: [],
  additionalProperties: false
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
  validate
}
