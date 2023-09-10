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
          v-model="search"
          indicator
        />
        <filter-products @on-filter="setFilter" class="header__filter" />
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
        <div v-else class="products">
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
import { onMounted, reactive, ref, watch } from 'vue';

import ProductCard from 'src/components/cards/ProductCard/ProductCard.vue';
import FilterProducts from 'src/components/pages/counter/FilterProducts/FilterProducts.vue';
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';
import { api } from 'src/boot/axios';

export default {
  components: {
    PageWrapper,
    ProductCard,
    HeaderLayout,
    FilterProducts,

    OutlinedTextInput,
  },
  setup() {
    const search = ref('');
    let filter = reactive({
      brand: [],
    });

    const products = ref([]);
    const loading = ref(false);

    const fetchProducts = () => {
      loading.value = true;
      api({
        url: '/products',
        params: {
          search: search.value || '',
          ...filter,
        },
      })
        .then((res) => {
          const { data } = res.data;

          products.value = data.reduce((productItems, product) => {
            const items = [];
            product.variants?.forEach((variant) => {
              if (product.modifier.name) {
                product.modifier.values.forEach((modifier) => {
                  items.push({
                    key: `${product._id}_${variant._id}_${modifier}`.replaceAll(' ', '-'),
                    id: variant._id,
                    name: product.name,
                    brand: product.brand,
                    image: variant.image,
                    variant,
                    modifier: {
                      name: product.modifier.name,
                      value: modifier,
                    },
                  });
                });
              } else {
                items.push({
                  key: `${product._id}_${variant._id}`.replaceAll(' ', '-'),
                  id: variant._id,
                  name: product.name,
                  brand: product.brand,
                  image: variant.image,
                  variant,
                });
              }
            });

            productItems.push(...items);
            return productItems;
          }, []);

          // products.value = data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const setFilter = (data) => {
      filter = data;
      fetchProducts();
    };

    watch(search, () => fetchProducts());

    onMounted(() => {
      fetchProducts();
    });

    return {
      search,
      filter,

      products,
      loading,

      setFilter,
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

@media screen and (min-width: $breakpoint-sm-min) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: $breakpoint-lg-min) {
  .products {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
