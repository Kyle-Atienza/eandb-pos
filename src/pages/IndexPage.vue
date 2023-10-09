<template>
  <header-layout label="Dashboard" root />
  <q-page>
    <page-wrapper>
      <q-btn
        to="/counter"
        class="q-mx-md"
        unelevated
        :color="invoiceItems.length ? 'secondary' : 'primary'"
        :text-color="invoiceItems.length ? 'dark' : 'secondary'"
        size="lg"
      >
        <span class="flex items-center justify-between full-width">
          {{ invoiceItems.length ? `Pending Items (${invoiceItems.length})` : 'New Order' }}
          <q-icon name="point_of_sale" size="sm" />
        </span>
      </q-btn>
      <h2 class="q-mx-md text-h6">Today</h2>
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';

import { useInvoiceStore } from 'src/stores/invoice';
import { computed } from 'vue';

export default {
  components: { PageWrapper, HeaderLayout },
  setup() {
    const invoiceStore = useInvoiceStore();

    const invoiceItems = computed(() => invoiceStore.items);

    return {
      invoiceStore,
      invoiceItems,
    };
    // console.log('you should only see this in dev');
  },
};
</script>

<style lang="scss" scoped></style>
