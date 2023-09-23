<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6 col">Add Modifier</div>
      <q-btn icon="close" round color="negative" size="sm" unelevated @click="$emit('close')">
      </q-btn>
    </q-card-section>
    <q-card-section>
      <div class="flex column q-gutter-md">
        <outlined-text-input label="Name" placeholder="Modifier Name" v-model="modifier" />
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        v-if="$attrs.create"
        class="col"
        unelevated
        label="Create"
        color="primary"
        @click="createModifier"
      />
      <q-btn v-else class="col" unelevated label="Update" color="primary" @click="updateModifier" />
      <q-btn class="col" unelevated label="Delete" color="negative" @click="deleteModifier" />
    </q-card-actions>
  </q-card>
</template>

<script>
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';

import { useInventoryStore } from 'src/stores/inventory';

import { computed, inject, onMounted, ref, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

export default {
  components: {
    OutlinedTextInput,
  },
  emits: ['close'],
  setup(props, { attrs, emit }) {
    const $q = useQuasar();
    const inventoryStore = useInventoryStore();

    const modifier = ref('');
    const selected = inject('selected');
    const product = inject('product');

    const products = computed(() => inventoryStore.products);
    const isUpdating = computed(
      () => inventoryStore.updatingProduct && inventoryStore.updatingProduct._id === product._id
    );

    const otherModifiers = computed(() => {
      const output = inventoryStore.updatingProduct.modifier.values.filter(
        (value) => value !== selected.value.modifier
      );

      return output;
    });
    const params = computed(() => new URLSearchParams(`id=${inventoryStore.updatingProduct._id}`));

    const setData = () => {
      if (!attrs.create) {
        modifier.value = selected.value.modifier;
      }
    };

    onMounted(() => {
      setData();
    });

    watch(selected.value, () => {
      setData();
    });

    const modifierRequest = (values) => ({
      url: '/products/',
      method: 'put',
      params: params.value,
      data: {
        modifier: {
          name: inventoryStore.updatingProduct.modifier.name,
          values,
        },
      },
    });

    const onUpdate = (request) => {
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

          emit('close');
          $q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const updateModifier = () => {
      onUpdate(() => api(modifierRequest([...otherModifiers.value, modifier.value])));
    };

    const deleteModifier = () => {
      onUpdate(() => api(modifierRequest(otherModifiers.value)));
    };

    const createModifier = () => {
      const payload = [...inventoryStore.updatingProduct.modifier.values, modifier.value];
      onUpdate(() => api(modifierRequest(payload)));
    };

    return {
      modifier,
      selected,
      isUpdating,

      updateModifier,
      deleteModifier,
      createModifier,
    };
  },
};
</script>

<style lang="scss" scoped></style>
