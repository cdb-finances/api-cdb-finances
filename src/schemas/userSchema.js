const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    password: joi.string().min(6).minOfUppercase(1).minOfSpecialCharacters(2)
        .minOfUppercase(1).minOfNumeric(1).required().noWhiteSpaces().messages({
            'any.required': 'O campo senha é obrigatório.',
            'password.minOfUppercase': 'O campo senha deve conter pelo menos uma letra maiúscula.',
            'password.minOfSpecialCharacters': 'O campo senha deve conter pelo menos 2 caracteres especiais.',
            'password.minOfNumeric': 'O campo senha deve conter pelo menos 1 número.',
            'password.noWhiteSpaces': 'O campo senha não deve conter espacços em branco.'
        })
})

module.exports = userSchema;