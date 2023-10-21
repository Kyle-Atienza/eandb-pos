<template>
  <header-layout label="Dashboard" root />
  <q-page>
    <page-wrapper>
      <div class="actions q-mx-md">
        <q-btn
          to="/counter"
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
        <generate-report />
        <!-- <q-btn unelevated size="lg" color="secondary" text-color="dark">
          <span class="flex items-center justify-between full-width">
            Generate Report
            <q-icon name="summarize" size="sm" />
          </span>
        </q-btn> -->
      </div>
      <main-dashboard />
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';
import MainDashboard from 'src/components/pages/index/MainDashboard.vue';
import GenerateReport from 'src/components/pages/index/GenerateReport.vue';

import { useInvoiceStore } from 'src/stores/invoice';
import { computed } from 'vue';

export default {
  components: { PageWrapper, HeaderLayout, MainDashboard, GenerateReport },
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

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
