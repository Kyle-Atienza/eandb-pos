<template>
  <div class="q-mx-md flex q-mt-md items-center justify-between">
    <dashboard-date @update="fetchInvoice" />
  </div>

  <div class="dashboard-cards q-mx-md q-mt-md">
    <total-sales class="dashboard-card dashboard-card--wide" />
    <transactions-count class="dashboard-card" />
    <best-seller class="dashboard-card" />
    <brand-sales />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import { useDashboardStore } from 'src/stores/dahsboard';
import DashboardDate from './DashboardDate.vue';
import BestSeller from '../../cards/Dashboard/BestSeller.vue';
import TotalSales from '../../cards/Dashboard/TotalSales.vue';
import TransactionsCount from '../../cards/Dashboard/TransactionsCount.vue';
import BrandSales from '../../cards/Dashboard/BrandSales.vue';

export default {
  components: {
    DashboardDate,
    BestSeller,
    TotalSales,
    TransactionsCount,
    BrandSales,
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const dashboardDate = ref(null);

    const requestParams = computed(() => {
      let paramsObject = {};
      if (dashboardDate.value?.date.from && dashboardDate.value?.date.to) {
        paramsObject = {
          date_min: dashboardDate.value?.date.from,
          date_max: dashboardDate.value?.date.to,
        };
      }
      const params = new URLSearchParams(paramsObject);
      return params;
    });

    const fetchInvoiceData = () => {
      dashboardStore.getInvoiceData(requestParams.value);
    };

    onMounted(() => {
      fetchInvoiceData();
      /* if (!invoices.value.length) {
        fetchInvoice();
      } */
    });

    return {
      dashboardDate,
      fetchInvoiceData,
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.dashboard-card {
  &--wide {
    grid-column: 1/3;
  }
}
</style>
