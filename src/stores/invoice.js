import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    buyer: '',
    contactNumber: '',
    emailAddress: '',
    notes: '',
    paymentMethod: '',
    items: [],
  }),
  getters: {
    getTotal(state) {
      return state.items.reduce((amount, item) => {
        const itemAmount = amount + item.quantity * item.amount;
        amount = itemAmount;
        return amount;
      }, 0);
    },
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
    addItem(product) {
      this.items.push(product);
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    updateItem(id, updatedData) {
      const productIndex = this.items.map((item) => item.id).indexOf(id);
      this.items[productIndex] = updatedData;
    },
    hasItem(id) {
      return this.items.map((item) => item.id).includes(id);
    },
    findItem(id) {
      return this.items.find((item) => item.id === id);
    },
    updateDetails(key, value) {
      this.details[key] = value;
    },
    async create() {
      return api.post('/invoices', {
        buyer: this.buyer,
        contactNumber: this.contactNumber,
        emailAddress: this.emailAddress,
        notes: this.notes,
        paymentMethod: this.paymentMethod,
        items: this.items,
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
