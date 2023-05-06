const formatValue = (num) => {
  const options = {
    minFractionDigits: 2,
    maxFractionDigits: 2
  };

  const formattedNum = Number(num).toLocaleString('pt-BR', options);

  if (formattedNum.indexOf(',') !== -1) {
    return formattedNum;
  }
  return formattedNum + ',00';
}

module.exports = formatValue