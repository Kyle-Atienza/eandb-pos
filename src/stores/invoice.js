import { defineStore } from 'pinia';
import { getTotal } from 'src/helpers/invoice';
import { api } from 'src/boot/axios';

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    buyer: '',
    contactNumber: '',
    emailAddress: '',
    notes: '',
    paymentMethod: '',
    items: [],
    invoices: [],
  }),
  getters: {
    selectedProductVariants() {},
    isEmpty(state) {
      return !state.items.length;
    },
    validate(state) {
      if (!state.buyer || !state.paymentMethod || !state.items.length) {
        return false;
      }

      return true;
    },
  },
  actions: {
    setInvoices(invoices) {
      this.invoices = invoices;
    },
    addItem(product) {
      this.items.push(product);
    },
    removeItem(key) {
      this.items = this.items.filter(({ item }) => item !== key);
    },
    updateItem(key, updatedData) {
      const productIndex = this.items.map((item) => item.key).indexOf(key);
      this.items[productIndex] = updatedData;
    },
    clearItems() {
      this.items = [];
    },
    hasItem(key) {
      return this.items.map((item) => item.key).includes(key);
    },
    findItem(key) {
      return this.items.find((item) => item.key === key);
    },
    productItems(id) {
      const items = this.items.filter(({ item }) => {
        const itemId = item.split('_')[0];
        return itemId === id;
      });

      return items;
    },
    updateDetails(key, value) {
      this.details[key] = value;
    },
    getQuantity(id) {
      // find all items with the id provided
      const products = this.items.filter(({ item }) => {
        const itemId = item.split('_')[0];
        return itemId === id;
      });

      const quantity = products.reduce((total, product) => {
        total += product.quantity;
        return total;
      }, 0);

      return quantity || 0;
    },
    getItemQuantity(key) {
      const findItem = this.items.find(({ item }) => item === key);

      if (!findItem) {
        return 0;
      }

      const { quantity } = this.items.find(({ item }) => item === key);

      return quantity;
    },
    setItemQuantity(key, addQuantity, replaceQuantity = 0) {
      const itemIndex = this.items.map(({ item }) => item).indexOf(key);
      let newQuantity = this.items[itemIndex].quantity + addQuantity;

      if (!addQuantity) {
        newQuantity = replaceQuantity;
      }

      this.items[itemIndex] = {
        ...this.items[itemIndex],
        quantity: newQuantity,
      };

      if (!newQuantity) {
        this.items.splice(itemIndex, 1);
      }
    },
    async create() {
      /* let { items } = this;
      items = this.items.map((item) => {
        const invoiceItem = item;

        delete invoiceItem.variant;
        delete invoiceItem.name;

        return invoiceItem;
      }); */

      return api.post('/invoices', {
        buyer: this.buyer,
        contactNumber: this.contactNumber,
        emailAddress: this.emailAddress,
        notes: this.notes,
        paymentMethod: this.paymentMethod,
        total: getTotal(this.items),
        items: this.items.map((item) => ({
          item: item.item,
          quantity: item.quantity,
        })),
      });
    },
    async getAll(params) {
      api({
        url: '/invoices',
        params,
      })
        .then((res) => {
          const { data } = res.data;

          // invoices.value = data;
          this.invoices = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      this.buyer = '';
      this.contactNumber = '';
      this.emailAddress = '';
      this.notes = '';
      this.paymentMethod = '';
      this.items = [];
    },
  },
});
