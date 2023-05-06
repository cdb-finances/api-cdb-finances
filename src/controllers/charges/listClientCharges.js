const knex = require('../../services/connectionSQL');

const listClientCharges = async (req, res) => {
  const { id: clientId } = req.params;

  try {

    const chargesList = await knex('charge')
      .rightJoin('client', 'charge.client_id', '=', 'client.id')
      .select('charge.id', 'name', 'description', 'value', 'due_date', 'paid_out', 'client_id')
      .where('client_id', clientId)
      .returning('*');

    return res.json(chargesList)

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }

}

module.exports = listClientCharges;