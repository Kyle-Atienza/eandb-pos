<template>
  <div class="payment-options">
    <payment-option
      v-for="({ icon, name, value, color }, index) in options"
      :selected="invoice.paymentMethod === value"
      :key="index"
      :icon="icon"
      :label="name"
      :color="color"
      @click="invoice.paymentMethod = value"
    />
  </div>
</template>

<script>
import { inject, reactive } from 'vue';
import PaymentOption from './PaymentOption.vue';

export default {
  components: {
    PaymentOption,
  },
  setup() {
    const invoice = inject('invoice');

    const options = reactive([
      {
        icon: '/src/assets/images/payment-methods/wallet-outline-white.svg',
        name: 'Cash',
        value: 'cash',
        color: '#306a3a',
      },
      {
        icon: '/src/assets/images/payment-methods/gcash-outline-white.svg',
        name: 'GCash',
        value: 'GCash',
        color: '#3477ee',
      },
      {
        icon: '/src/assets/images/payment-methods/card-outline-white.svg',
        name: 'Bank Transfer',
        value: 'bank',
        color: '#ac3432',
      },
    ]);

    return {
      invoice,

      options,
    };
  },
};
</script>

<style lang="scss" scoped>
.payment-options {
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
