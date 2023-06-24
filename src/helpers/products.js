const mapProductItems = (products) => {
  const mappedProducts = products.reduce((items, product) => {
    items.push(...product.variants);

    return items;
  }, []);

  return mappedProducts;
};

export { mapProductItems };
