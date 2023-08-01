const getTotal = (items) => {
  const total = items?.reduce((amount, item) => {
    const itemAmount = amount + item.quantity * item.variant.amount;
    amount = itemAmount;
    return amount;
  }, 0);

  return total;
};

export { getTotal };
