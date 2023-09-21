<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6 col">Add Variant</div>
      <q-btn icon="close" round color="negative" size="sm" unelevated @click="$emit('close')">
      </q-btn>
    </q-card-section>
    <q-card-section>
      <div class="flex column q-gutter-md">
        <div class="variant-image">
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
          ></q-input>
        </div>
        <outlined-text-input label="Name" placeholder="Variant Name" v-model="variant.name" />
        <outlined-text-input label="Amount" placeholder="Variant Amount" v-model="variant.amount" />
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        v-if="$attrs.create"
        class="col"
        unelevated
        label="Create"
        color="primary"
        @click="createVariant"
      />
      <q-btn v-else class="col" unelevated label="Update" color="primary" @click="updateVariant" />
      <q-btn class="col" unelevated label="Delete" color="negative" @click="deleteVariant" />
    </q-card-actions>
  </q-card>
</template>

<script>
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';

import { useProductsStore } from 'src/stores/products';

import { computed, inject, onMounted, ref, watch } from 'vue';
import { api } from 'src/boot/axios';
import { imageToBase64 } from 'src/helpers/image';
import { useQuasar } from 'quasar';

export default {
  components: {
    OutlinedTextInput,
  },
  props: {
    update: Boolean,
  },
  emits: ['close'],
  setup(props, { attrs, emit }) {
    const $q = useQuasar();
    const productsStore = useProductsStore();

    const variant = ref({});
    const selected = inject('selected');
    const isUpdating = inject('isUpdating');

    const products = computed(() => productsStore.items);

    const otherVariants = computed(() => {
      const output = selected.value.product.variants.filter(
        (data) => data._id !== selected.value.variant._id
      );

      return output;
    });
    const params = computed(() => new URLSearchParams(`id=${selected.value.product._id}`));

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
      $q.loading.show();
      request()
        .then((res) => {
          const otherProducts = products.value.filter(
            (product) => product._id !== selected.value.product._id
          );

          productsStore.setItems([...otherProducts, res.data]);

          emit('close');
          $q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updateVariant = () => {
      onUpdate(() => api(variantRequest([...otherVariants.value, variant.value])));
    };

    const deleteVariant = () => {
      onUpdate(() => api(variantRequest(otherVariants.value)));
    };

    const createVariant = () => {
      onUpdate(() => api(variantRequest([...selected.value.product.variants, variant.value])));
    };

    const uploadImage = (image) => {
      imageToBase64(image).then((res) => {
        variant.value.image = `data:image/png;base64,${res}`;
      });
    };

    return {
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
    opacity: 0;
  }
}
</style>
