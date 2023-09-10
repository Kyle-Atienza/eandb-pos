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
  }),
  getters: {
    /* getTotal(state) {
      return state.items.reduce((amount, item) => {
        const itemAmount = amount + item.quantity * item.variant.amount;
        amount = itemAmount;
        return amount;
      }, 0);
    }, */
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
    removeItem(key) {
      this.items = this.items.filter((item) => item.key !== key);
    },
    updateItem(key, updatedData) {
      const productIndex = this.items.map((item) => item.key).indexOf(key);
      this.items[productIndex] = updatedData;
    },
    hasItem(key) {
      return this.items.map((item) => item.key).includes(key);
    },
    findItem(key) {
      return this.items.find((item) => item.key === key);
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
        items: this.items.map((item) => ({
          id: item._id,
          item: item.key,
          variant: item.variant._id,
          quantity: item.quantity,
        })),
        total: getTotal(this.items),
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
