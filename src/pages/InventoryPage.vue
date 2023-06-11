<template>
  <header-layout label="Inventory" />
  <q-page>
    <page-wrapper>
      <div class="q-mx-md inventory-items">
        <inventory-item v-for="(product, index) in products" :key="index" :data="product" />
      </div>
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';
import InventoryItem from 'src/components/cards/InventoryItem/InventoryItem.vue';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  components: {
    HeaderLayout,
    PageWrapper,
    InventoryItem,
  },
  setup() {
    const products = ref();

    onMounted(() => {
      api
        .get('/products')
        .then((res) => {
          const { data } = res.data;

          products.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      products,
    };
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
