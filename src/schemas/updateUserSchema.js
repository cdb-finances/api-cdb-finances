const joi = require('joi');

const updateUserSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    password: joi.string().allow('').default('Não informado.'),
    cpf: joi.string().allow('').default('Não informado.'),
    phone: joi.string().allow('').default('Não informado.')
})

module.exports = updateUserSchema;