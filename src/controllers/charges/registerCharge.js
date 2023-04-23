const knex = require('../../services/connectionSQL');

const registerCharge = async (req, res) => {
    const { description, due_date, value, status } = req.body;
    const { id } = req.params;

    try {
        const clientExist = await knex('client').where({ id }).returning(['name']);

        const userCharge = await knex('charge')
            .insert({
                client_id: id,
                value,
                due_date: Date.parse(due_date) / 1000,
                status,
                description
            }).returning('*');

        const charge = { ...userCharge[0], name: clientExist[0].name };

        return res.status(200).json(charge);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};


module.exports = registerCharge;
