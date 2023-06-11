const parseAmount = (amount) => `₱ ${amount.toFixed(2)}`;

const getProductItemId = (data) => {
  const productName = data.product.name;
  const productInitials = productName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  const variantName = data.variant.name;
  const modifierString = `${data.modifier.name}_${data.modifier.value}`;

  return `${productInitials}-${variantName}-${modifierString}`;
};

const capitalizeCase = (text) => text.slice(0, 1).toUpperCase() + text.slice(1);

export { parseAmount, getProductItemId, capitalizeCase };
