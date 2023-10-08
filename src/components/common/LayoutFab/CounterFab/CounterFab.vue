<template>
  <q-btn
    v-if="!hiddenPath.includes($route.path)"
    class="counter-fab"
    @click="action($route.path)"
    fab
    icon="receipt_long"
    color="primary"
  >
    <q-badge v-if="invoice.items.length" color="accent" text-color="dark" floating>{{
      invoice.items.length
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
    const invoice = useInvoiceStore();

    const router = useRouter();

    const hiddenPath = ['/checkout/items', '/checkout/details', '/'];

    const popupRef = ref(null);

    const action = (path) => {
      if (path === '/counter') {
        if (invoice.isEmpty) {
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
      invoice,

      hiddenPath,
      popupRef,

      action,
    };
  },
};
</script>

<style lang="scss" scoped></style>
