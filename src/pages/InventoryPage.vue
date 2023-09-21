<template>
  <header-layout label="Inventory" />
  <q-page>
    <page-wrapper>
      <div :key="items.length" class="q-mx-md inventory-items">
        <inventory-item
          v-for="(product, index) in items"
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

import { useProductsStore } from 'src/stores/products';

import { computed, onMounted, reactive, watch } from 'vue';
import { api } from 'src/boot/axios';

export default {
  components: {
    HeaderLayout,
    PageWrapper,
    InventoryItem,
  },
  setup() {
    const productsStore = useProductsStore();
    const items = computed(() => productsStore.items);

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

          productsStore.setItems(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    watch(items, () => {
      console.log('items updated');
    });

    return { items, updateProduct };
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
