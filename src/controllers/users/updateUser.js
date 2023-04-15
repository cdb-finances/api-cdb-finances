const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { name, email, password, cpf, phone } = req.body
  const userId = req.user

  try {
    const userExist = await knex('users').where({ email }).first();

    if (userExist) {
      return res.status(400).json({ mensagem: "Email já cadastrado" })
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await knex('users')
      .where('id', userId)
      .update(
        {
          name: name,
          email: email,
          password: encryptedPassword,
          cpf: cpf || '',
          phone: phone || '',
        }
      )
      .returning('*')

    return res.status(204).json(updatedUser[0]);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = updateUser