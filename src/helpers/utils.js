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

const alphanumericSort = (array, key) => {
  const sorted = array.sort((a, b) => {
    const nameA = key ? a[key].toLowerCase() : a.toLowerCase();
    const nameB = key ? b[key].toLowerCase() : b.toLowerCase();

    if (nameA > nameB) {
      return 1;
    }
    if (nameA < nameB) {
      return -1;
    }
    return 0;
  });

  return sorted;
};

const capitalizeCase = (text) => text.slice(0, 1).toUpperCase() + text.slice(1);

const checkEmptyObjectValues = (object, allowed = []) => {
  const keys = Object.keys(object).filter((key) => !allowed.includes(key));

  const emptyValues = keys.reduce((empty, key) => {
    if (!object[key]) {
      empty.push(key);
    }

    return empty;
  }, []);

  return emptyValues;
};

const mapEmptyFieldErrorMessage = (errorArray) => {
  const errorMessage = errorArray.map((field) => `${capitalizeCase(field)} is required`).join('\n');

  return errorMessage;
};

export {
  parseAmount,
  getProductItemId,
  capitalizeCase,
  alphanumericSort,
  checkEmptyObjectValues,
  mapEmptyFieldErrorMessage,
};
