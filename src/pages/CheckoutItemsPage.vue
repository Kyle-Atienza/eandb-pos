<template>
  <h2 class="q-mx-md text-h6">Selected Items</h2>
  <div class="items q-px-md">
    <div class="items--inner q-px-md">
      <checkout-item v-for="(item, key) in invoice.items" :key="key" :data="item" />
    </div>
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
.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.items {
  position: relative;
  width: 100%;
  flex: 1;

  &--inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    overflow-y: scroll;
  }
}

.item {
  &:not(:first-child) {
    margin-top: 20px;
  }
}
</style>
