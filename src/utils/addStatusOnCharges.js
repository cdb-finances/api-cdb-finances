const isDateAfterToday = require("./verifyDate");

const addStatusOnCharges = (chargesArray) => {
  chargesArray.forEach(charge => {

    if (charge.paid_out) {
      return 'Paga'
    }

    if (charge.paid_out && isDateAfterToday(charge.due_date)) {
      return 'Pendente'
    }

    return 'Vencida'
  });
  return chargesArray;
}


module.exports = addStatusOnCharges