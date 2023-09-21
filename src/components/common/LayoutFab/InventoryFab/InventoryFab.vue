<template>
  <q-btn class="inventory-fab" @click="dialog = !dialog" fab icon="add" color="primary"> </q-btn>

  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">Add Product</div>
        <q-btn icon="close" round color="negative" size="sm" unelevated v-close-popup> </q-btn>
      </q-card-section>

      <q-card-section class="categories">
        <div class="flex column q-gutter-md">
          <outlined-text-input label="Name" placeholder="Product Name" v-model="product.name" />
          <select-input
            :items="brands"
            label="Brand"
            color="primary"
            @pick="(selected) => (product.brand = selected)"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="col" unelevated label="Create" color="primary" @click="createProduct" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import SelectInput from 'src/components/forms/SelectInput/SelectInput.vue';

import { useProductsStore } from 'src/stores/products';

import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

export default {
  components: {
    OutlinedTextInput,
    SelectInput,
  },
  setup() {
    const $q = useQuasar();

    const productsStore = useProductsStore();

    const dialog = ref();
    const product = ref({
      name: '',
      brand: '',
      variants: [],
      modifier: {},
    });

    const brands = ['E and B Farm', 'NutriPage', 'ThreeK'];

    const createProduct = () => {
      $q.loading.show();
      api({
        url: '/products/',
        method: 'post',
        data: product.value,
      })
        .then((res) => {
          productsStore.insertItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          $q.loading.hide();
          product.value = {
            name: '',
            brand: '',
            variants: [],
            modifier: {},
          };
          dialog.value = false;
        });
    };

    return {
      dialog,
      product,
      brands,

      createProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-field {
  border: 2px solid $secondary;
  border-radius: 15px;
  color: $secondary;
  overflow: hidden;

  ::v-deep &__label {
    color: $secondary;
  }
}

::v-deep .q-icon {
  color: $secondary;
}

.q-select {
  &__dialog {
    background: red !important;
  }
}
</style>
