const mapProductItems = (products) => {
  const mappedProducts = products.reduce((items, product) => {
    items.push(...product.variants);

    return items;
  }, []);

  return mappedProducts;
};

const getDisplayName = (item) => {
  if (item.modifier?.value) {
    return `${item.name} ${item.variant.name} - ${item.modifier.value}`;
  }
  return `${item.name} ${item.variant.name}`;
};

export { mapProductItems, getDisplayName };
