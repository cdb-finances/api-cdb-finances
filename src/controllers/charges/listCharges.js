const knex = require('../../services/connectionSQL');

const listCharges = async (req, res) => {

    try {
        const chargesList = await knex('charge')
            .rightJoin('client', 'charge.client_id', '=', 'client.id')
            .select('charge.id', 'name', 'description', 'value', 'due_date', 'paid_out')
            .returning('*');

        return res.status(200).json(chargesList)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listCharges;




