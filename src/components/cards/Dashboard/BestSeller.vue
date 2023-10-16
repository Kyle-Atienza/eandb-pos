<template>
  <dashboard-card label="Best Seller" class="dashboard-card" :loading="!bestSeller">
    <q-carousel
      v-if="Object.keys(bestSeller).length"
      v-model="slide"
      swipeable
      animated
      control-color="white"
      transition-prev="slide-right"
      transition-next="slide-left"
      padding
      infinite
      height="100px"
      class="bg-primary text-white carousel"
      autoplay="2000"
    >
      <q-carousel-slide name="1" class="column">
        <div class="flex column">
          <p class="name text-h6 text-weight-light text-secondary">{{ bestSeller?.name }}</p>
          <div style="gap: 5px" class="flex q-mt-sm">
            <q-chip
              class="self-start"
              color="secondary"
              text-color="dark"
              size="sm"
              :label="bestSeller?.variant.name"
            />
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <q-img class="fit" :src="bestSeller?.variant.image" alt="" />
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column">
        <div class="divider"></div>
        <p class="name text-subtitle1 text-weight-light text-secondary">Total Sales (PHP):</p>
        <p class="text-h3 q-mt-sm q-mb-none text-weight-bold text-secondary">
          {{ bestSeller?.totalProductSales.toLocaleString() }}
        </p>
      </q-carousel-slide>
      <q-carousel-slide name="4" class="column">
        <div class="divider"></div>
        <p class="name text-subtitle1 text-weight-light text-secondary">Total Sold:</p>
        <p class="text-h3 q-mt-sm q-mb-none text-weight-bold text-secondary">
          {{ bestSeller?.totalSold }}
        </p>
      </q-carousel-slide>
    </q-carousel>
    <div v-else style="min-height: 100px" class="flex items-center justify-center">
      <p class="text-subtitle1 text-weight-light">No Data Yet</p>
    </div>
  </dashboard-card>
</template>

<script>
import { useDashboardStore } from 'src/stores/dahsboard';

import { computed, ref } from 'vue';

import DashboardCard from './DashboardCard.vue';

export default {
  components: {
    DashboardCard,
  },
  setup() {
    const dashboardStore = useDashboardStore();
    const bestSeller = computed(() => dashboardStore.invoice.bestSellerProduct);

    return {
      bestSeller,
      slide: ref('1'),
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  border-radius: 10px;
}

.q-carousel__slide {
  padding: 0 !important;
}

.q-chip {
  height: unset;
}

.name {
  text-wrap: wrap;
  line-height: 1em !important;
  margin-bottom: 0;
}

.divider {
  width: 100%;
  height: 2px;
  background: $secondary;
  margin: 5px 0 10px;
}
</style>
