<template>
  <div class="actions">
    <q-btn icon="add" @click="onAddQuantity" unelevated color="primary" class="add full-width" />
    <q-btn
      v-if="quantity && !hasSelect"
      icon="remove"
      flat
      class="action action--right action--remove"
      @click="onRemoveQuantity"
    />
    <q-btn
      v-if="quantity && hasSelect"
      flat
      class="action action--right action--edit"
      @click="dialog = true"
    >
      <q-icon name="edit" size="xs"></q-icon>
    </q-btn>
  </div>

  <q-dialog persistent full-height v-model="dialog">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">Select Variants</div>
        <q-btn icon="close" round color="negative" size="sm" unelevated @click="dialog = false" />
      </q-card-section>

      <q-card-section class="border-bottom">
        <div class="product-info flex q-gutter-md">
          <div class="product-info__image">
            <img :src="data.variants[0]?.image" class="variant-image__content" alt="" />
          </div>
          <h2 class="product-info__name text-h6">{{ data.name }}</h2>
        </div>
      </q-card-section>

      <q-card-section v-if="productItems.length">
        <variant-quantity
          class="product-item"
          v-for="(item, index) in productItems"
          :key="index"
          :data="item"
          quantity
        />
        <q-btn class="q-mt-md full-width" unelevated color="primary" size="md">
          <span class="flex items-center justify-between full-width">
            Add Variant
            <q-icon name="add" size="xs" />
          </span>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, inject, onMounted, ref } from 'vue';
import { useInvoiceStore } from 'src/stores/invoice';

import VariantQuantity from './VariantQuantity.vue';

export default {
  props: {
    data: Object,
  },
  emits: ['select-variant'],
  components: {
    VariantQuantity,
  },
  setup(props, { emit }) {
    const product = inject('product');

    const invoiceStore = useInvoiceStore();

    const dialog = ref(false);
    const defaultItems = ref([]);

    const productItems = computed(() => invoiceStore.productItems(product._id));
    const quantity = computed(() => invoiceStore.getQuantity(product._id));
    const hasSelect = computed(() => product.modifier.values.length || product.variants.length > 1);
    const singleItemKey = computed(() => `${product._id}_${product.variants[0]._id}`);

    onMounted(() => {
      if (product.variants.length === 1) {
        defaultItems.value.push({
          item: `${product._id}_${product.variants[0]._id}`,
          name: product.name,
          variant: product.variants[0],
          modifier: '',
        });
      }
    });

    const onAddQuantity = () => {
      if (product.modifier.values.length || product.variants.length > 1) {
        emit('select-variant');
      } else if (invoiceStore.getItemQuantity(singleItemKey.value)) {
        invoiceStore.setItemQuantity(singleItemKey.value, 1);
      } else {
        const item = {
          item: singleItemKey.value,
          name: product.name,
          variant: product.variants[0],
          quantity: 1,
        };

        invoiceStore.addItem(item);
      }
    };

    const onRemoveQuantity = () => {
      invoiceStore.setItemQuantity(singleItemKey.value, -1);
    };

    const open = () => {
      dialog.value = true;
    };

    return {
      product,
      dialog,
      defaultItems,

      productItems,
      quantity,
      hasSelect,

      onAddQuantity,
      onRemoveQuantity,
      open,
    };
  },
};
</script>

<style lang="scss" scoped>
.actions {
  flex: 2;
  display: flex;
  border-radius: 15px;
  overflow: hidden;

  height: 80px;
}

.action {
  border-radius: 0;
  width: 100%;

  /* &--add {
    background: #00bc89;
    flex: 3;
  } */

  &--right {
    background: #f27979;
    flex: 2;
  }
}

.add {
  border-radius: 0;
}

.product-info {
  &__image {
    width: 110px;
    aspect-ratio: 1/1;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23F9EACDFF' stroke-width='4' stroke-dasharray='6%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 15px;
    display: grid;
    padding: 8px;

    img {
      grid-row: 1/1;
      grid-column: 1/1;
      width: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
      object-position: center;
      border-radius: 10px;
    }
  }

  &__name {
    flex: 1;
  }
}

.product-item {
  &:not(:first-child) {
    margin-top: 15px;
  }
}
</style>
