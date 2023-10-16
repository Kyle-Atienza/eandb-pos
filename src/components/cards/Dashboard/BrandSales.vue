<template>
  <dashboard-card label="Sales By Brands" class="dashboard-card" :loading="!brandSales">
    <div v-if="brandSales.length" class="flex column">
      <div v-for="(brand, index) in brandSales" :key="index">
        <div class="flex items-center justify-between">
          <p class="q-mb-none text-subtitle1">{{ brand._id }}</p>
          <q-chip size="sm" color="secondary" text-color="dark" :label="brand.count" />
        </div>
        <q-separator
          v-if="index + 1 !== brandSales.length"
          spaced
          color="secondary"
          style="height: 2px"
        />
      </div>
    </div>
    <div v-else style="min-height: 80px" class="flex items-center justify-center">
      <p class="text-subtitle1 text-weight-light">No Data Yet</p>
    </div>
  </dashboard-card>
</template>

<script>
import { useDashboardStore } from 'src/stores/dahsboard';

import { computed } from 'vue';
import DashboardCard from './DashboardCard.vue';

export default {
  components: {
    DashboardCard,
  },
  setup() {
    const dashboardStore = useDashboardStore();
    const brandSales = computed(() => dashboardStore.invoice.groupedInvoiceByBrand);

    return {
      brandSales,
    };
  },
};
</script>

<style></style>
