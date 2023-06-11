<template>
  <h2 class="q-mx-md text-h6">Customer Information</h2>
  <customer-information class="q-mx-md" />
  <h2 class="q-mx-md text-h6">Payment Method</h2>
  <payment-method class="q-mx-md" />
</template>

<script>
import CustomerInformation from 'src/components/pages/checkout/CustomerInformation.vue/CustomerInformation.vue';
import PaymentMethod from 'src/components/pages/checkout/PaymentMethod/PaymentMethod.vue';

export default {
  components: {
    CustomerInformation,
    PaymentMethod,
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
