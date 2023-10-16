import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    invoice: {},
  }),
  actions: {
    async getInvoiceData(params) {
      api({
        url: '/analytics/invoice',
        params,
      })
        .then((res) => {
          const { data } = res;

          // invoices.value = data;
          this.invoice = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
