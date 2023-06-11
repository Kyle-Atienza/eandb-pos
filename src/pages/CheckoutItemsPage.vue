<template>
  <h2 class="q-mx-md text-h6">Selected Items</h2>
  <div class="q-mx-md items">
    <checkout-item v-for="(item, key) in invoice.items" :key="key" :data="item" />
  </div>
</template>

<script>
import CheckoutItem from 'src/components/cards/CheckoutItem/CheckoutItem.vue';
import { useInvoiceStore } from 'src/stores/invoice';
import { computed, inject } from 'vue';

export default {
  components: {
    CheckoutItem,
  },
  setup() {
    const invoice = computed(() => {
      const fetched = inject('fetchedInvoice');
      if (!fetched) {
        return useInvoiceStore();
      }

      return fetched.value;
    });

    return {
      invoice,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  &:not(:first-child) {
    margin-top: 20px;
  }
}
</style>
