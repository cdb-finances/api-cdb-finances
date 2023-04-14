const knex = require('../conexão');
const bcrypt = require('bcrypt');
const { rmSync } = require('fs');
const hash = process.env.JWT_HASH;

const registerUser = async (req, res) => {
    const { name, email, password, cpf, phone } = req.body;

    try {
        const userExist = await knex('users').where({ email }).first();
        if (userExist) {
            return res.status(400).json({ mensagem: "Email já cadastrado" })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await knex('users').insert({
            name,
            email,
            password: encryptedPassword,
            cpf,
            phone
        }).returning('*')

        const { password: _, ...registeredUser } = user[0]

        return res.status(201).json(registeredUser);
    } catch (error) {
        return rmSync.status(500).json({ mensagem: "Erro interno do servido." })
    }
};


module.exports = registerUser;