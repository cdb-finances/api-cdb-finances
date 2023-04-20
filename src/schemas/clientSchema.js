const joi = require('joi');

const clientSchema = joi.object({
  name: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório.',
    'string.empty': 'O campo nome é obrigatório.'
  }),
  email: joi.string().email().required().messages({
    'any.required': 'O campo e-mail é obrigatório.',
    'string.empty': 'O campo e-mail é obrigatório.',
    'string.email': 'O campo e-mail precisa ter um formato válido.'
  }),
  cpf: joi.string().required().messages({
    'any.required': 'O campo cpf é obrigatório.',
    'string.empty': 'O campo cpf é obrigatório.'
  }),
  phone: joi.string().required().messages({
    'any.required': 'O campo telefone é obrigatório.',
    'string.empty': 'O campo telefone é obrigatório.'
  }),
  defaulter: joi.boolean().messages({
    "boolean.base": "O valor não é um boolean"
  }),
  address: joi.string().allow(null, ''),
  complement: joi.string(),
  zip_code: joi.string(),
  neighborhood: joi.string(),
  city: joi.string(),
  state: joi.string(),
});

module.exports = clientSchema;
