<template>
  <q-dialog persistent v-model="dialog" class="q-px-md">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">Select Variants</div>
        <q-btn icon="close" round color="negative" size="sm" unelevated @click="dialog = false" />
      </q-card-section>
      <q-card-section class="variant-items">
        <variant-item
          class="variant-item"
          v-for="(variant, index) in variants"
          :key="index"
          :data="variant"
          :selected="isSelected(variant.variant._id)"
          @pick="(variant) => (selected = variant)"
          option
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          :disable="!'item' in selected || !isValidItem"
          class="q-mx-md full-width"
          unelevated
          color="primary"
          size="md"
          label="Select"
          @click="onSelectVariant"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, inject, onMounted, onUpdated, provide, ref } from 'vue';
import { useInvoiceStore } from 'src/stores/invoice';

import VariantItem from './VariantItem.vue';

export default {
  props: {
    props: Object,
  },
  components: {
    VariantItem,
  },
  emits: ['selected'],
  setup(_, { emit }) {
    const invoiceStore = useInvoiceStore();

    const product = inject('product');

    const dialog = ref(false);
    const selected = ref({});

    const isValidItem = computed(() => {
      const conditions = [];

      if (product.modifier.values.length) {
        conditions.push(!!selected.value.modifier);
      }

      conditions.push('item' in selected.value);

      return conditions.every((condition) => !!condition);
    });

    const variants = computed(() => {
      const output = product.variants.map((variant) => ({
        item: `${product._id}_${variant._id}`,
        name: product.name,
        variant,
        modifier: '',
      }));

      return output;
    });
    onMounted(() => {});

    onUpdated(() => {
      if (!dialog.value) {
        selected.value = {};
      }
    });

    const onSelectVariant = () => {
      if (invoiceStore.getItemQuantity(selected.value.item)) {
        invoiceStore.setItemQuantity(selected.value.item, 1);
      } else if (isValidItem.value) {
        invoiceStore.addItem({
          ...selected.value,
          quantity: 1,
        });
      }
      dialog.value = false;
      emit('selected');
    };

    const isSelected = (id) => {
      const output = Object.keys(selected.value).length && selected.value.variant._id === id;

      return output;
    };

    const open = () => {
      dialog.value = true;
    };

    const close = () => {
      dialog.value = false;
    };

    provide('selected', selected);

    return {
      product,
      dialog,
      selected,
      variants,
      isValidItem,

      onSelectVariant,
      isSelected,

      open,
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
.variant-items {
  min-height: 300px;
  height: 45vh;
  max-height: 600px;
}

.variant-item {
  &:not(:first-child) {
    margin-top: 10px;
  }
}
</style>
