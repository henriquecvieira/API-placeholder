import Ajv from 'ajv';
import addFormats from 'ajv-formats';
let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schemaDailyAverageSupervisor = {
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
  const validateAverage = ajv.compile(schemaDailyAverageSupervisor);
  const resultAverage = validateAverage(data);

  if (resultAverage) {
    return resultAverage;
  }
  return validateAverage.errors;
}

export default {
  validate
};
