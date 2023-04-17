const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { name, email, password, cpf, phone } = req.body
  const userId = req.user.id

  try {
    const userExist = await knex('users').where({ email });

    if (userExist.length > 1) {
      return res.status(400).json({ mensagem: "Email já cadastrado" })
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await knex('users')
      .where('id', userId)
      .update(
        {
          name: name,
          email: email,
          password: encryptedPassword || 'Não informado',
          cpf: cpf || 'Não informado',
          phone: phone || 'Não informado',
        }
      )
      .returning('*')

    return res.status(200).json(updatedUser[0]);

  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = updateUser;