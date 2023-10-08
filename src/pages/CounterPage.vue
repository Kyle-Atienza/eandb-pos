<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <header-layout label="Counter">
      <div class="row q-pt-md  full-width">
        <div class="col row flex bg-secondary search-bar">
          <outlined-text-input
            dense
            class="col-grow bg-primary"
            label="Product Name"
            placeholder="Juan Dela Cruz"
            v-model="buyer"
          />
          <q-btn class="filter bg-secondary" @click="onSearch" round color="secondary" outline>
            <q-icon name="search" color="primary" />
          </q-btn>
        </div>
        <q-btn
          class="filter q-ml-md"
          @click="dialog = !dialog"
          round
          color="secondary"
          outline
          icon="filter_list"
        />
      </div>
    </header-layout>
    <page-wrapper>
      <div class="q-mx-md">
        <q-pull-to-refresh class="products" @refresh="fetchProducts">
          <product-card
            v-for="(product, index) in inventoryStore.products"
            :key="index"
            :data="product"
          />
        </q-pull-to-refresh>
      </div>
    </page-wrapper>
    <router-view></router-view>
  </q-page>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue';

import ProductCard from 'src/components/cards/CounterItem/ProductCard.vue';
// import FilterProducts from 'src/components/pages/counter/FilterProducts/FilterProducts.vue';
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';

import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

import { useInventoryStore } from 'src/stores/inventory';

export default {
  components: {
    PageWrapper,
    ProductCard,
    HeaderLayout,
    // FilterProducts,

    OutlinedTextInput,
  },
  setup() {
    const $q = useQuasar();

    const inventoryStore = useInventoryStore();

    const search = ref('');
    let filter = reactive({
      brand: [],
    });

    const products = computed(() => inventoryStore.products);

    const fetchProducts = (done) => {
      $q.loading.show();
      api({
        url: '/products',
        params: {
          search: search.value || '',
          ...filter,
        },
      })
        .then((res) => {
          const { data } = res.data;

          inventoryStore.setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          $q.loading.hide();
          if (done) done();
        });
    };

    const setFilter = (data) => {
      filter = data;
      fetchProducts();
    };

    watch(search, () => fetchProducts());

    onMounted(() => {
      if (!products.value.length) {
        fetchProducts();
      }
    });

    return {
      inventoryStore,

      search,
      filter,

      products,

      setFilter,
      fetchProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  border-radius: 15px;
}

.products {
  ::v-deep .q-pull-to-refresh__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding-bottom: 80px;
  }
}

/* @media screen and (min-width: $breakpoint-sm-min) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: $breakpoint-lg-min) {
  .products {
    grid-template-columns: repeat(4, 1fr);
  }
} */
</style>
