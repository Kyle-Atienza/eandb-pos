const mapProductItems = (products) => {
  const mappedItems = products.reduce((items, product) => {
    const productItems = [];

    product.variants.forEach((variant) => {
      product.modifiers.forEach((modifierItem) => {
        modifierItem.values.forEach((modifier) => {
          productItems.push({
            product,
            variant,
            modifier: {
              name: modifierItem.name,
              value: modifier,
            },
          });
        });
      });
    });
    return items.concat(productItems);
  }, []);

  return mappedItems;
};

export { mapProductItems };
