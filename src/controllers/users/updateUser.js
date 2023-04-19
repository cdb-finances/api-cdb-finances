const { number } = require('joi');
const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { name, email, password, cpf, phone } = req.body
  const userId = req.user.id
  const toUpdate = { name, email }

  try {
    const userExist = await knex('users').where({ email });

    if (userExist.length > 1) {
      return res.status(400).json({ mensagem: "Email já cadastrado" })
    }

    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      toUpdate.password = encryptedPassword;
    }

    if (cpf) {
      toUpdate.cpf = cpf
    }

    if (phone) {
      toUpdate.phone = phone
    }

    const updatedUser = await knex('users')
      .where('id', userId)
<<<<<<< HEAD
      .update(
        {
          name: name,
          email: email,
          password: encryptedPassword || 'Não informado',
          cpf: cpf || 'Não informado',
          phone: phone || 'Não informado',
        }
      )
=======
      .update(toUpdate)
>>>>>>> b6df7df227b12a82a7262986528da979b57ef23d
      .returning('*')

    return res.status(200).json(updatedUser[0]);

  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = updateUser;