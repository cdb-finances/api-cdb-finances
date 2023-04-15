const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');
const hash = process.env.JWT_HASH;

const registerUser = async (req, res) => {
    const { name, email, password, cpf, phone } = req.body;

    try {
        const userExist = await knex('users').where({ email }).first();
        if (userExist) {
            return res.status(400).json({ mensagem: "Email já cadastrado" })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await knex('users')
            .insert({
                name: name,
                email: email,
                password: encryptedPassword,
                cpf: cpf || '',
                phone: phone || ''
            })
            .returning('*')

        const { password: _, ...registeredUser } = user[0]

        return res.status(201).json(registeredUser);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}


module.exports = registerUser;