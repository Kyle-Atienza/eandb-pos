<template>
  <header-layout label="Inventory" />
  <q-page>
    <page-wrapper>
      <div :key="products.length" class="q-mx-md inventory-items">
        <inventory-item
          v-for="(product, index) in products"
          :key="index"
          :data="product"
          @update="(product) => openProductDialog(product)"
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

import { computed, onMounted, reactive, watch } from 'vue';
import { api } from 'src/boot/axios';

export default {
  components: {
    HeaderLayout,
    PageWrapper,
    InventoryItem,
  },
  setup() {
    const inventoryStore = useInventoryStore();
    const products = computed(() => inventoryStore.products);

    const updateProduct = reactive({
      dialog: {
        isOpen: false,
        form: '',
      },
      id: '',
      data: {},
    });

    onMounted(() => {
      api
        .get('/products')
        .then((res) => {
          const { data } = res.data;

          inventoryStore.setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    watch(products, () => {
      console.log('items updated');
    });

    return { products, updateProduct };
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
