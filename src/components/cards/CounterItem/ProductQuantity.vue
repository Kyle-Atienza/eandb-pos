<template>
  <q-btn icon="add" @click="onAddProduct" unelevated color="primary" class="add full-width" />

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

      <q-card-section>
        <variant-quantity
          v-for="(item, index) in defaultItems"
          :key="index"
          :data="item"
          quantity
        />
      </q-card-section>

      <q-card-actions>
        <!-- if there is only one variant no need to display select variant -->
        <!-- <variant-selection v-if="product.variants.length > 1 || true" /> -->
        <q-btn class="q-mx-md full-width" unelevated color="primary" size="md">
          <span class="flex items-center justify-between full-width q-px-sm">
            Add Variant
            <q-icon name="add" size="xs" />
          </span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { useInvoiceStore } from 'src/stores/invoice';

// import VariantSelection from './VariantSelect.vue';
import VariantQuantity from './VariantQuantity.vue';

export default {
  props: {
    data: Object,
  },
  emits: ['select-variant'],
  components: {
    // VariantSelection,
    VariantQuantity,
  },
  setup(props, { emit }) {
    const invoiceStore = useInvoiceStore();

    const dialog = ref(false);
    const defaultItems = ref([]);

    const product = inject('product');

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

    const onAddProduct = () => {
      // check if product only has 1 variant

      if (product.modifier.values.length || product.variants.length > 1) {
        emit('select-variant');
      } else {
        dialog.value = true;
      }

      if (false) {
        if (product.variants.length === 1 && product.modifier.values.length === 0) {
          const item = {
            item: `${product._id}_${product.variants[0]._id}`,
            name: product.name,
            variant: product.variants[0],
            quantity: 1,
          };

          invoiceStore.addItem(item);
        } else {
          dialog.value = true;
        }
      }
    };

    return {
      product,
      dialog,
      defaultItems,

      onAddProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
