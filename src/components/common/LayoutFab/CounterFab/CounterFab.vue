<template>
  <q-btn v-if="show" class="counter-fab" @click="onInvoice" fab icon="receipt_long" color="primary">
    <q-badge v-if="invoiceStore.items.length" color="accent" text-color="dark" floating>{{
      invoiceStore.items.length
    }}</q-badge>
  </q-btn>

  <alert-popup ref="popupRef" />
</template>

<script>
import { useInvoiceStore } from 'src/stores/invoice';
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import AlertPopup from '../../AlertPopup/AlertPopup.vue';

export default {
  components: {
    AlertPopup,
  },
  setup() {
    const invoiceStore = useInvoiceStore();
    const router = useRouter();
    const route = useRoute();
    const hiddenPath = ['/checkout/items', '/checkout/details', '/'];

    const popupRef = ref(null);

    const onInvoice = () => {
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
        router.replace({ name: 'Checkout Items' });
      }
    };

    const show = computed(() => invoiceStore.items.length || route.path === '/counter');

    return {
      invoiceStore,

      hiddenPath,
      popupRef,

      onInvoice,
      show,
    };
  },
};
</script>

<style lang="scss" scoped></style>
