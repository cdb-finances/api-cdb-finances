const knex = require('../../services/connectionSQL');

const listCharges = async (req, res) => {
    const { status } = req.query;

    const paidCharges = [];
    const pendingCharges = [];
    const expiredCharges = [];

    try {
        if (status) {

            if (status === 'pagas') {
                const chargesTrue = await knex('charge').where('status', true)
                    .rightJoin('client', 'charge.client_id', '=', 'client.id')
                    .select('charge.id', 'name', 'description', 'value', 'due_date', 'status')
                    .returning('*');

                paidCharges.push(chargesTrue)

                return res.status(200).json(paidCharges[0])
            };

            const currentTime = new Date().getTime() / 1000;

            if (status === 'pendentes') {

                const chargesToCome = await knex('charge').where('status', false).andWhere('due_date', '>', currentTime)
                    .rightJoin('client', 'charge.client_id', '=', 'client.id')
                    .select('charge.id', 'name', 'description', 'value', 'due_date', 'status')
                    .returning('*');

                pendingCharges.push(chargesToCome)

                return res.status(200).json(pendingCharges[0])
            };

            if (status === 'vencidas') {

                const chargesFalse = await knex('charge').where('status', false).andWhere('due_date', '<', currentTime)
                    .rightJoin('client', 'charge.client_id', '=', 'client.id')
                    .select('charge.id', 'name', 'description', 'value', 'due_date', 'status')
                    .returning('*');

                expiredCharges.push(chargesFalse)

                return res.status(200).json(expiredCharges[0])
            };
        }

        const chargesList = await knex('charge')
            .rightJoin('client', 'charge.client_id', '=', 'client.id')
            .select('charge.id', 'name', 'description', 'value', 'due_date', 'status')
            .returning('*');

        return res.status(200).json(chargesList)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = listCharges;




