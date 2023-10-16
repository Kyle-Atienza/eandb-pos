<template>
  <dashboard-card label="Transactions" :loading="!transactions">
    <p class="text-h3 q-mb-none text-weight-bold">{{ transactions }}</p>
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
    const transactions = computed(() => dashboardStore.invoice.totalTransactions?.toLocaleString());

    return {
      transactions,
    };
  },
};
</script>

<style lang="scss" scoped></style>
