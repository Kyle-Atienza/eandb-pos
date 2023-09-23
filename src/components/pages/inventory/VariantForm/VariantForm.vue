<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6 col">Add Variant</div>
      <q-btn icon="close" round color="negative" size="sm" unelevated @click="$emit('close')">
      </q-btn>
    </q-card-section>
    <q-card-section>
      <div class="flex column q-gutter-md">
        <div :class="['variant-image', !variant.image ? 'variant-image--warn' : '']">
          <div class="variant-image__placeholder"><span>Add</span><span>Image</span></div>
          <img v-if="variant.image" :src="variant.image" class="variant-image__content" alt="" />
          <q-input
            @update:model-value="
              (val) => {
                uploadImage(val[0]);
              }
            "
            class="variant-image__input"
            type="file"
            outlined
            :rules="[(val) => !!val || '']"
          ></q-input>
        </div>
        <outlined-text-input
          label="Name"
          placeholder="Variant Name"
          v-model="variant.name"
          :rules="[(val) => !!val || '']"
        />
        <outlined-text-input
          label="Amount"
          placeholder="Variant Amount"
          v-model="variant.amount"
          :rules="[(val) => !!val || '']"
        />
      </div>
    </q-card-section>
    <q-card-actions v-if="$attrs.create" align="right">
      <q-btn class="col" unelevated label="Create" color="primary" @click="createVariant" />
    </q-card-actions>
    <q-card-actions v-else align="right">
      <q-btn class="col" unelevated label="Update" color="primary" @click="updateVariant" />
      <q-btn class="col" unelevated label="Delete" color="negative" @click="deleteVariant" />
    </q-card-actions>
  </q-card>

  <alert-popup ref="alert" />
</template>

<script>
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import AlertPopup from 'src/components/common/AlertPopup/AlertPopup.vue';

import { useInventoryStore } from 'src/stores/inventory';

import { computed, inject, onMounted, ref, watch } from 'vue';
import { api } from 'src/boot/axios';
import { imageToBase64 } from 'src/helpers/image';
import { useQuasar } from 'quasar';
import { checkEmptyObjectValues, mapEmptyFieldErrorMessage } from 'src/helpers/utils';

export default {
  components: {
    OutlinedTextInput,
    AlertPopup,
  },
  props: {
    update: Boolean,
  },
  emits: ['close', 'create'],
  setup(props, { attrs, emit }) {
    const $q = useQuasar();
    const inventoryStore = useInventoryStore();

    const alert = ref(null);
    const variant = ref({
      image: '',
      name: '',
      amount: '',
    });
    const selected = inject('selected');
    const product = inject('product');

    const products = computed(() => inventoryStore.products);
    const isUpdating = computed(
      () => inventoryStore.updatingProduct && inventoryStore.updatingProduct._id === product._id
    );

    const otherVariants = computed(() => {
      const output = inventoryStore.updatingProduct.variants.filter(
        (data) => data._id !== selected.value.variant._id
      );

      return output;
    });
    const params = computed(() => new URLSearchParams(`id=${inventoryStore.updatingProduct._id}`));

    const setData = () => {
      if (!attrs.create) {
        variant.value = { ...selected.value.variant };
      }
    };

    onMounted(() => {
      setData();
    });

    watch(selected.value, () => {
      setData();
    });

    const variantRequest = (variants) => ({
      url: '/products/',
      method: 'put',
      params: params.value,
      data: {
        variants,
      },
    });

    const onUpdate = (request) => {
      const emptyValues = checkEmptyObjectValues(variant.value, ['image']);

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
        request()
          .then((res) => {
            const otherProducts = products.value.filter(
              (item) => item._id !== inventoryStore.updatingProduct._id
            );

            inventoryStore.setProducts([
              ...otherProducts,
              {
                ...res.data,
                updating: true,
              },
            ]);

            emit('create');
            emit('close');
          })
          .catch((err) => {
            console.log(err);
            alert.value.open('Variant Error', err.response ?? err.response.data.error.message, [
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
          });
      }
    };

    const updateVariant = () => {
      onUpdate(() => api(variantRequest([...otherVariants.value, variant.value])));
    };

    const deleteVariant = () => {
      onUpdate(() => api(variantRequest(otherVariants.value)));
    };

    const createVariant = () => {
      const payload = [...inventoryStore.updatingProduct.variants, variant.value];
      onUpdate(() => api(variantRequest(payload)));
    };

    const uploadImage = (image) => {
      imageToBase64(image).then((res) => {
        variant.value.image = `data:image/png;base64,${res}`;
      });
    };

    return {
      alert,

      variant,
      selected,
      isUpdating,

      updateVariant,
      deleteVariant,
      createVariant,
      uploadImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.variant-image {
  width: 90px;
  aspect-ratio: 1/1;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23F9EACDFF' stroke-width='4' stroke-dasharray='6%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 15px;
  display: grid;
  padding: 8px;
  position: relative;

  & > * {
    grid-row: 1/1;
    grid-column: 1/1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  &__placeholder {
    color: $dark;
    background: $secondary;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1em;
  }

  &__input {
    ::v-deep .q-field__control {
      height: 100%;
      border-radius: 10px !important;
    }

    ::v-deep .q-field__control-container {
      max-width: 0 !important;
    }

    ::v-deep .q-field__append {
      padding: 0;
      position: absolute;
      left: 100%;
      height: 100%;
      transform: translateX(50%);
    }
  }

  &__input-validation {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
