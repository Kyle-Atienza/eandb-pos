import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: [],
    isUpdating: false,
  }),
  getters: {
    updatingProduct(state) {
      return state.products.find((product) => product.updating === true);
    },
  },
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
    toggleProductUpdate(id) {
      if (this.updatingProduct && this.updatingProduct._id === id) {
        this.products = this.products.map((product) => ({
          ...product,
          updating: false,
        }));
      } else {
        this.products = this.products.map((product) => {
          if (product._id === id) {
            return {
              ...product,
              updating: true,
            };
          }
          return {
            ...product,
            updating: false,
          };
        });
      }
    },
    stopUpdate() {
      this.products = this.products.map((product) => ({
        ...product,
        updating: false,
      }));
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
