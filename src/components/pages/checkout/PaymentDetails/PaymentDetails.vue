<template>
  <div class="payment-details">
    <h2 class="text-h6">Payment Details</h2>

    <outlined-text-input
      class="input"
      :value="invoice.amountReceived"
      v-model="invoice.amountReceived"
      type="number"
      label="Amount Received"
      placeholder="P100.00"
      :rules="[isValidAmount]"
    />
    <outlined-text-input
      class="input disable"
      :value="invoice.change"
      v-model="invoice.change"
      label="Change"
      placeholder="P100.00"
    />
  </div>
</template>

<script>
import { inject, watch } from 'vue';

import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';

import { getTotal } from 'src/helpers/invoice';

export default {
  components: {
    OutlinedTextInput,
  },
  setup() {
    const invoice = inject('invoice');

    const isValidAmount = (amount) => amount >= getTotal(invoice.value.items);

    watch(
      () => invoice.value.amountReceived,
      () => {
        invoice.value.setChange();
      }
    );

    return {
      invoice,

      getTotal,
      isValidAmount,
    };
  },
};
</script>

<style lang="scss" scoped>
.input {
  &:not(:first-child) {
    margin-top: 20px;
  }
}

.disable {
  pointer-events: none;
}
</style>
