<template>
  <div class="flex justify-between q-mx-md items-center">
    <h2 class="text-h6">Basket Items</h2>
    <q-btn
      v-if="!history"
      class="align-self"
      color="negative"
      label="Clear Items"
      size=""
      unelevated
      @click="onClearItems"
    />
  </div>
  <div class="items q-mt-md q-px-md">
    <div class="items--inner q-px-md" v-if="false">
      <checkout-item v-for="(item, key) in invoice.items" :key="key" :data="item" />
    </div>
    <div class="items--inner q-px-md">
      <variant-quantity
        class="item"
        v-for="(item, key) in invoice.items"
        :key="key"
        :data="item"
        invoice
        :record="history"
      />
    </div>
  </div>

  <alert-popup ref="alertPopup" />
</template>

<script>
import CheckoutItem from 'src/components/cards/CheckoutItem/CheckoutItem.vue';
import VariantQuantity from 'src/components/cards/CounterItem/VariantQuantity.vue';
import AlertPopup from 'src/components/common/AlertPopup/AlertPopup.vue';

import { useInvoiceStore } from 'src/stores/invoice';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    CheckoutItem,
    VariantQuantity,
    AlertPopup,
  },
  props: {
    history: Boolean,
  },
  setup() {
    const alertPopup = ref(null);

    const invoiceStore = useInvoiceStore();
    const router = useRouter();

    const invoice = computed(() => {
      const fetched = inject('fetchedInvoice');
      if (!fetched) {
        return useInvoiceStore();
      }

      return fetched.value;
    });

    const onClearItems = () => {
      alertPopup.value.open('Clear Items', 'Are you sure you want to remove all items?', [
        {
          label: 'Yes',
          color: 'negative',
          action: () => {
            invoiceStore.clearItems();
            router.replace({ name: 'Counter' });
          },
        },
        {
          label: 'Cancel',
          action: () => {
            alertPopup.value.close();
          },
        },
      ]);
    };

    return {
      invoice,
      alertPopup,

      onClearItems,
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
    margin-top: 15px;
  }
}
</style>
