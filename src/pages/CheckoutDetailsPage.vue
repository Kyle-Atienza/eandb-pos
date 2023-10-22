<template>
  <h2 class="q-mx-md text-h6">Customer Information</h2>
  <customer-information class="q-mx-md" />
  <h2 class="q-mx-md text-h6">Payment Method</h2>
  <payment-method class="q-mx-md" />
  <payment-details v-if="invoice.paymentMethod === 'cash'" class="q-mx-md" />
</template>

<script>
import CustomerInformation from 'src/components/pages/checkout/CustomerInformation.vue/CustomerInformation.vue';
import PaymentMethod from 'src/components/pages/checkout/PaymentMethod/PaymentMethod.vue';
import PaymentDetails from 'src/components/pages/checkout/PaymentDetails/PaymentDetails.vue';

import { computed, inject, provide } from 'vue';
import { useInvoiceStore } from 'src/stores/invoice';

export default {
  components: {
    CustomerInformation,
    PaymentMethod,
    PaymentDetails,
  },
  setup() {
    const invoice = computed(() => {
      const fetched = inject('fetchedInvoice');
      if (!fetched) {
        return useInvoiceStore();
      }

      return fetched.value;
    });

    provide('invoice', invoice);

    return {
      invoice,
    };
  },
};
</script>

<style lang="scss" scoped></style>
