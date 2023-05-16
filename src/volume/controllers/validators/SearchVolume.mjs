import Ajv from 'ajv'
import addFormats from 'ajv-formats'
let ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schemaVolume = {
  type: 'object',
  properties: {
    fromDate: {
      type: 'string',
      format: 'date'
    },
    toDate: {
      type: 'string',
      format: 'date'
    }
  },
  required: ['fromDate', 'toDate'],
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
