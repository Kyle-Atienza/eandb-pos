<template>
  <q-carousel
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
  >
    <q-carousel-slide name="1" class="column">
      <div class="flex column">
        <p class="name text-h6 text-weight-light text-secondary">Oyster Mushroom Chicharon</p>
        <div style="gap: 5px" class="flex q-mt-sm">
          <q-chip class="self-start" color="secondary" text-color="dark" size="sm" label="100g" />
          <q-chip
            class="self-start"
            color="secondary"
            text-color="dark"
            size="sm"
            label="Barbeque"
          />
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      <q-img class="fit" src="../../../assets/images/temp/temp-product.jpg" alt="" />
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column">
      <div class="divider"></div>
      <p class="name text-subtitle1 text-weight-light text-secondary">Total Sales:</p>
      <p class="text-h3 q-mt-sm q-mb-none text-weight-bold text-secondary">12</p>
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column">
      <div class="divider"></div>
      <p class="name text-subtitle1 text-weight-light text-secondary">Total Sold:</p>
      <p class="text-h3 q-mt-sm q-mb-none text-weight-bold text-secondary">25</p>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { ref } from 'vue';

import tempProduct from 'src/assets/images/temp/tem-product.jpg';

export default {
  setup() {
    return {
      slide: ref('1'),
      tempProduct,
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
