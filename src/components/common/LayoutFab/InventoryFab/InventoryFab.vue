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
          <outlined-text-input
            label="Name"
            placeholder="Product Name"
            v-model="product.name"
            :rules="[(val) => !!val || '']"
          />
          <select-input
            required
            :items="brands"
            label="Brand"
            color="primary"
            @pick="(selected) => (product.brand = selected)"
            :rules="[(val) => !!val || '']"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="col" unelevated label="Create" color="primary" @click="createProduct" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <alert-popup ref="alert" />
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

import { useInventoryStore } from 'src/stores/inventory';

import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import SelectInput from 'src/components/forms/SelectInput/SelectInput.vue';
import { checkEmptyObjectValues, mapEmptyFieldErrorMessage } from 'src/helpers/utils';
import AlertPopup from '../../AlertPopup/AlertPopup.vue';

export default {
  components: {
    OutlinedTextInput,
    SelectInput,
    AlertPopup,
  },
  setup() {
    const $q = useQuasar();

    const inventoryStore = useInventoryStore();

    const alert = ref(null);

    const dialog = ref();
    const product = ref({
      name: '',
      brand: '',
    });

    const brands = ['E and B Farm', 'NutriPage', 'ThreeK'];

    const createProduct = () => {
      const emptyValues = checkEmptyObjectValues(product.value);

      if (emptyValues.length) {
        alert.value.open('Product Error', mapEmptyFieldErrorMessage(emptyValues), [
          {
            label: 'OK',
            action: () => {
              alert.value.close();
            },
          },
        ]);
      } else {
        $q.loading.show();
        api({
          url: '/products/',
          method: 'post',
          data: product.value,
        })
          .then((res) => {
            inventoryStore.insertProduct(res.data);
            dialog.value = false;
          })
          .catch((err) => {
            alert.value.open('Product Error', err.response.data.error.message, [
              {
                label: 'OK',
                action: () => {
                  alert.value.close();
                },
              },
            ]);
          })
          .finally(() => {
            $q.loading.hide();
            product.value = {
              name: '',
              brand: '',
              variants: [],
              modifier: {},
            };
          });
      }
    };

    return {
      alert,

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
