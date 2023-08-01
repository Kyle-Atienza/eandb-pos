const mapProductItems = (products) => {
  const mappedProducts = products.reduce((items, product) => {
    items.push(...product.variants);

    return items;
  }, []);

  return mappedProducts;
};

const getDisplayName = (item) => `${item.name} ${item.variant.name} - ${item.modifier.value}`;

export { mapProductItems, getDisplayName };
