const joi = require('joi');

const registerChargeSchema = joi.object({
    description: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo deve ser preenchido'
    }),
    due_date: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido'
    }),
    value: joi.number().positive().required().messages({
        'number.base': 'Este campo precisa estar em um formato válido',
        'number.positive': 'Este campo precisa estar em um formato válido',
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo deve ser preenchido'
    }),
    status: joi.boolean().required()
})


module.exports = registerChargeSchema;

