<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <header-layout label="Counter">
      <div class="row q-pt-md  full-width">
        <div class="col row flex bg-secondary search-bar no-wrap">
          <outlined-text-input
            class="col-grow bg-primary"
            label="Product Name"
            placeholder="Juan Dela Cruz"
            v-model="search"
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
    <q-dialog persistent v-model="dialog">
        <q-card>
          <q-card-section class="row">
            <div class="text-h6 col">Filter Products</div>
            <q-btn
              icon="close"
              round
              color="negative"
              size="sm"
              unelevated
              @click="dialog = false"
            />
          </q-card-section>
          <q-card-section class="row q-gutter-y-md">
            <choice-filter v-model="brands" label="Brands" />
          </q-card-section>
          <q-card-actions class="row">
            <q-btn
              class="col"
              unelevated
              color="negative"
              size="md"
              label="Reset"
              @click="onResetParams"
            />
            <q-btn
              class="col"
              unelevated
              color="primary"
              size="md"
              label="Apply"
              @click="onSearch"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    <page-wrapper>
      <div class="q-mx-md">
        <q-pull-to-refresh
          class="products"
          @refresh="fetchProducts"
          :key="inventoryStore.products.length"
        >
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
import { computed, onMounted, ref } from 'vue';

import ProductCard from 'src/components/cards/CounterItem/ProductCard.vue';
import ChoiceFilter from 'src/components/common/SearchOptions/ChoiceFilter/ChoiceFilter.vue';
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
    ChoiceFilter,

    OutlinedTextInput,
  },
  setup() {
    const $q = useQuasar();

    const inventoryStore = useInventoryStore();

    const dialog = ref(false);

    const brands = ref([
      {
        name: 'E and B Farm',
        selected: false,
      },
      {
        name: 'NutriPage',
        selected: false,
      },
      {
        name: 'ThreeK',
        selected: false,
      },
    ]);
    const search = ref('');
    const paramsObject = computed(() => ({
      name: search.value,
      brand: brands.value.find((brand) => brand.selected)?.name || '',
    }));
    const requestParams = computed(() => new URLSearchParams(paramsObject.value));

    const products = computed(() => inventoryStore.products);

    const fetchProducts = (done) => {
      $q.loading.show();
      api({
        url: '/products',
        params: requestParams.value,
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

    const onSearch = () => {
      fetchProducts();
      dialog.value = false;
    };

    const onResetParams = () => {
      search.value = '';
      brands.value = brands.value.map((brand) => ({
        ...brand,
        selected: false,
      }));

      fetchProducts();
      dialog.value = false;
    };

    onMounted(() => {
      if (!products.value.length) {
        fetchProducts();
      }
    });
    return {
      inventoryStore,
      paramsObject,

      search,
      dialog,
      brands,

      products,

      fetchProducts,
      onSearch,
      onResetParams,
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
