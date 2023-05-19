import Ajv from 'ajv';
import InvalidParameterException from '../../../core/exceptions/InvalidParameterException.mjs'
import addFormats from 'ajv-formats';
let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: [ 'id'],
  additionalProperties: false
};

async function validate(data) {
  const validateId = ajv.compile(schema);
  const resultId = validateId(data);

  if (resultId) {
    return resultId;
  }
  throw new InvalidParameterException(JSON.stringify(validateId.errors))

}

export default {
  validate
};
