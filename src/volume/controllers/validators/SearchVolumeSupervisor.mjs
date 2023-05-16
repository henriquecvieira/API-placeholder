import Ajv from 'ajv';
import addFormats from 'ajv-formats';
let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schemaVolumeSupervisor = {
  type: 'object',
  properties: {
    codSupBuy: {
      type: 'string'
    },
    fromDate: {
      type: 'string',
      format: 'date'
    },
    toDate: {
      type: 'string',
      format: 'date'
    }
  },
  required: ['fromDate', 'toDate', 'codSupBuy'],
  additionalProperties: false
};

async function validate(data) {
  const validateVolume = ajv.compile(schemaVolumeSupervisor);
  const resultVolume = validateVolume(data);

  if (resultVolume) {
    return resultVolume;
  }
  return validateVolume.errors;
}

export default {
  validate
};
