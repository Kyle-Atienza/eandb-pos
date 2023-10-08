<template>
  <header-layout label="Inventory" />
  <q-page>
    <page-wrapper>
      <div :key="products.length" class="q-mx-md inventory-items">
        <inventory-item
          v-for="(product, index) in alphanumericSort(products, 'name')"
          :key="index"
          :data="product"
          @update="(product) => openProductDialog(product)"
          v-bind="$attrs"
        />
      </div>
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';
import InventoryItem from 'src/components/cards/InventoryItem/InventoryItem.vue';

import { useInventoryStore } from 'src/stores/inventory';

import { computed, onBeforeUpdate, onMounted, ref } from 'vue';
import { alphanumericSort } from 'src/helpers/utils';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

export default {
  components: {
    HeaderLayout,
    PageWrapper,
    InventoryItem,
  },
  setup() {
    const $q = useQuasar();

    const inventoryStore = useInventoryStore();
    const products = computed(() => inventoryStore.products);

    const inventoryItems = ref([]);

    onBeforeUpdate(() => {
      inventoryItems.value = [];
    });

    const fetchProducts = () => {
      $q.loading.show();
      api
        .get('/products')
        .then((res) => {
          const { data } = res.data;

          inventoryStore.setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          $q.loading.hide();
        });
    };

    onMounted(() => {
      if (!products.value.length) {
        fetchProducts();
      }
    });
    return { products, alphanumericSort };
  },
};
</script>

<style lang="scss" scoped>
.inventory-item {
  &:not(:first-child) {
    margin-top: 15px;
  }
}
</style>
