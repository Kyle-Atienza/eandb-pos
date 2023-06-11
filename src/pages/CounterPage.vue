<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <header-layout label="Counter">
      <div class="header q-mt-sm">
        <outlined-text-input
          dense
          class="header__search"
          placeholder="Search Products"
          icon="search"
          v-model="searchValue"
          indicator
        />
        <filter-products class="header__filter" />
      </div>
    </header-layout>
    <page-wrapper>
      <div class="q-mx-md">
        <div v-if="loading" class="products products--loading">
          <product-card
            v-for="(product, index) in 6"
            :key="index"
            :data="product"
            skeleton
          />
        </div>
        <div class="products">
          <product-card
            v-for="(product, index) in products"
            :key="index"
            :data="product"
          />
        </div>
      </div>
    </page-wrapper>
    <router-view></router-view>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';

import { fetchData } from 'src/helpers/api';
import { mapProductItems } from 'src/helpers/products';

import ProductCard from 'src/components/cards/ProductCard/ProductCard.vue';
import FilterProducts from 'src/components/pages/counter/FilterProducts/FilterProducts.vue';
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';

export default {
  components: {
    PageWrapper,
    ProductCard,
    HeaderLayout,
    FilterProducts,

    OutlinedTextInput,
  },
  setup() {
    const searchValue = ref('');
    const products = ref([]);
    const loading = ref(false);

    const fetchProducts = (query) => {
      loading.value = true;
      fetchData('/products', query)
        .then((res) => {
          const { data } = res.data;

          products.value = mapProductItems(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      searchValue,
      products,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 15px;

  :deep(.filter) {
    aspect-ratio: 1/1;
    font-size: 0.6rem;
    height: min-content;

    &::before {
      border: 2px solid currentColor;
    }
  }

  &__search {
    flex: 1;
  }
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
