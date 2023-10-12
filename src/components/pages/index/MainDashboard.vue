<template>
  <div class="dashboard-cards q-mx-md q-mt-md">
    <dashboard-card class="dashboard-card dashboard-card--wide" label="Total Sales" icon="payments">
      <p class="text-h3 q-mb-none text-weight-bold">
        5,452.00 <span style="font-size: 0.4em" class="text-weight-medium">PHP</span>
      </p>
    </dashboard-card>
    <dashboard-card label="Transactions" class="dashboard-card">
      <p class="text-h3 q-mb-none text-weight-bold">12</p>
    </dashboard-card>
    <dashboard-card label="Best Seller" class="dashboard-card">
      <best-seller />
    </dashboard-card>
    <dashboard-card label="Sales By Brands" class="dashboard-card">
      <div class="flex column">
        <div class="flex items-center justify-between">
          <p class="q-mb-none text-subtitle1">E and B Farm</p>
          <q-chip size="sm" color="secondary" text-color="dark" label="12" />
        </div>
        <q-separator spaced color="secondary" style="height: 2px" />
        <div class="flex items-center justify-between">
          <p class="q-mb-none text-subtitle1">NutriPage</p>
          <q-chip size="sm" color="secondary" text-color="dark" label="12" />
        </div>
        <q-separator spaced color="secondary" style="height: 2px" />
        <div class="flex items-center justify-between">
          <p class="q-mb-none text-subtitle1">ThreeK</p>
          <q-chip size="sm" color="secondary" text-color="dark" label="12" />
        </div>
      </div>
    </dashboard-card>
  </div>
</template>

<script>
import DashboardCard from 'src/components/cards/Dashboard/DashboardCard.vue';

import { ref } from 'vue';
import BestSeller from './BestSeller.vue';

export default {
  components: {
    DashboardCard,
    BestSeller,
  },
  setup() {
    return {
      slide: ref(1),
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
