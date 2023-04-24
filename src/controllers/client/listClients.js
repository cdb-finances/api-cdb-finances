const knex = require('../../services/connectionSQL');

const listClients = async (req, res) => {

    try {
        const clientList = await knex('client');

        return res.status(200).json(clientList);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = listClients;