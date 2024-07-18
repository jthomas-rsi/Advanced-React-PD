const formatMoney = (amount = 0) => {
  // options object to pass to the formatter method
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // check if it's a clean dollar amount using modulus
  // if it is, we don't want to show decimal places
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-US', options);

  // return the formatted dollar amount divided by 100
  return formatter.format(amount / 100);
};

export default formatMoney;
