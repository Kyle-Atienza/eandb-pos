<template>
  <q-btn
    v-if="invoiceStore.items.length"
    class="counter-fab"
    to="/checkout/items"
    fab
    icon="receipt_long"
    color="primary"
  >
    <q-badge v-if="invoiceStore.items.length" color="accent" text-color="dark" floating>{{
      invoiceStore.items.length
    }}</q-badge>
  </q-btn>

  <alert-popup ref="popupRef" />
</template>

<script>
import { useInvoiceStore } from 'src/stores/invoice';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AlertPopup from '../../AlertPopup/AlertPopup.vue';

export default {
  components: {
    AlertPopup,
  },
  setup() {
    const invoiceStore = useInvoiceStore();
    const router = useRouter();
    const hiddenPath = ['/checkout/items', '/checkout/details', '/'];

    const popupRef = ref(null);

    const action = (path) => {
      if (path === '/counter') {
        if (invoiceStore.isEmpty) {
          popupRef.value.open('Empty Items', 'Please select at least one item to checkout.', [
            {
              label: 'OK',
              action: () => {
                popupRef.value.close();
              },
            },
          ]);
        } else {
          router.push('checkout/items');
        }
      } else {
        router.push('counter');
      }
    };

    return {
      invoiceStore,

      hiddenPath,
      popupRef,

      action,
    };
  },
};
</script>

<style lang="scss" scoped></style>
