import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: [],
  }),
  getters: {},
  actions: {
    setProducts(products) {
      this.products = [...products];
    },
    insertProduct(item) {
      this.products = [...this.products, item];
    },
    deleteProduct(id) {
      this.products = this.products.filter((item) => item._id !== id);
    },
    async fetchItems() {
      api
        .get('/products/')
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
