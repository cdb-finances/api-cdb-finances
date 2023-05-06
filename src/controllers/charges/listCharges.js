const knex = require('../../services/connectionSQL');

const listCharges = async (req, res) => {
    const { search } = req.query;

    try {
        let chargesList = [];

        if (search) {
            const query = knex('charge')
                .rightJoin('client', 'charge.client_id', '=', 'client.id')
                .select('charge.id', 'client.name', 'charge.description', 'charge.value', 'charge.due_date', 'charge.paid_out')
                .whereILike('client.name', `%${search}%`)

            if (!isNaN(Number(search))) {
                query.orWhere('charge.id', search)
            }
            chargesList = await query.returning('*');
        } else {
            chargesList = await knex('charge')
                .rightJoin('client', 'charge.client_id', '=', 'client.id')
                .select('charge.id', 'name', 'description', 'value', 'due_date', 'paid_out', 'client_id')
                .where('charge.id', 'is not', null)
                .returning('*');
        }
        return res.status(200).json(chargesList)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

};

module.exports = listCharges;




