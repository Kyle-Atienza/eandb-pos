import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
  }),
  getters: {},
  actions: {
    setItems(products) {
      this.items = [...products];
    },
    insertItem(item) {
      this.items = [...this.items, item];
    },
    deleteItem(id) {
      this.items = this.items.filter((item) => item._id !== id);
    },
    async fetchItems() {
      api
        .get('/products/')
        .then((res) => {
          this.items = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
