<template>
  <dashboard-card label="Total Sales" icon="payments" :loading="!totalSales">
    <p class="text-h3 q-mb-none text-weight-bold">
      {{ totalSales }} <span style="font-size: 0.4em" class="text-weight-medium">PHP</span>
    </p>
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
    const totalSales = computed(() => dashboardStore.invoice.totalSales?.toLocaleString());

    return {
      totalSales,
    };
  },
};
</script>

<style lang="scss" scoped></style>
