const { log } = require("handlebars");
const isDateAfterToday = require("./verifyDate");

const addStatusOnCharges = (chargesArray) => {
  const charges = chargesArray.map(charge => {

    if (charge.paid_out) {
      return { ...charge, status: 'paga' }
    }

    if (charge.paid_out && isDateAfterToday(charge.due_date)) {
      return { ...charge, status: 'pendente' }

    }

    return { ...charge, status: 'vencida' }
  });
  return charges;
}


module.exports = addStatusOnCharges