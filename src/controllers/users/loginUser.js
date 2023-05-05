const jwt = require('jsonwebtoken');
const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');
const hash = "uV9R6dJBs7erwsBw8giLZyexOjw";

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(404).json('O usuario não foi encontrado');
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json("Email ou senha inválidos");
        }

        const token = jwt.sign({ id: user.id }, hash, { expiresIn: '8h' });

        const { password: _, ...userInfo } = user;


        return res.status(200).json({
            user: userInfo,
            token
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = loginUser;