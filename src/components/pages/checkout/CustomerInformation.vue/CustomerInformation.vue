<template>
  <div class="customer-information">
    <outlined-text-input
      class="input"
      :value="invoice.buyer"
      v-model="invoice.buyer"
      label="Name"
      placeholder="Juan Dela Cruz"
    />
    <outlined-text-input
      class="input"
      :value="invoice.contactNumber"
      v-model="invoice.contactNumber"
      label="Contact Number"
      placeholder="0912 345 6789"
    />
    <outlined-text-input
      class="input"
      :value="invoice.email"
      v-model="invoice.email"
      label="Email Address"
      placeholder="juan@delcruz.com"
    />
    <outlined-text-input
      class="input"
      :value="invoice.notes"
      v-model="invoice.notes"
      label="Additional Notes"
      placeholder="Your Notes Here"
      type="textarea"
    />
  </div>
</template>

<script>
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import { inject } from 'vue';

export default {
  components: {
    OutlinedTextInput,
  },
  setup() {
    const invoice = inject('invoice');

    return {
      invoice,
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
</style>
