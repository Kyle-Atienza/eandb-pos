<template>
  <div :class="['product-card', 'card', skeleton ? 'card--skeleton' : '']">
    <div class="card__thumbnail">
      <div v-if="quantity" class="card__counter">
        {{ quantity }}
      </div>
      <img v-if="data.variants?.length" :src="data.variants[0].image" alt="" />
    </div>
    <div class="card__name">
      <q-chip v-if="data.variants.length === 1" color="primary" text-color="secondary">{{
        data.variants[0].name
      }}</q-chip>
      <p class="q-mt-xs q-mb-none">{{ data.name }}</p>
    </div>
    <div class="actions">
      <product-quantity v-bind="$props" />
      <q-btn
        v-if="quantity"
        @click="onRemoveItem"
        icon="remove"
        flat
        class="action action--remove"
      />
    </div>
  </div>
</template>

<script>
import { parseAmount } from 'src/helpers/utils';
import { computed, provide } from 'vue';
import { useInvoiceStore } from 'src/stores/invoice';
import { getDisplayName } from 'src/helpers/products';
import ProductQuantity from './ProductQuantity.vue';

export default {
  props: {
    data: Object,
  },
  components: {
    ProductQuantity,
  },
  setup({ data }) {
    const invoiceStore = useInvoiceStore();

    const quantity = computed(() => invoiceStore.getQuantity(data._id));
    const name = computed(() => {
      if (data.variants.length === 1) {
        const variant = data.variants[0].name;
        return `${data.name} - ${variant}`;
      }
      return data.name;
    });

    const onRemoveItem = () => {
      const key = `${data._id}_${data.variants[0]._id}`;

      invoiceStore.removeItem(key);
    };

    provide('product', data);

    return {
      parseAmount,

      name,
      quantity,

      getDisplayName,
      onRemoveItem,
    };
  },
};
</script>

<style lang="scss" scoped>
$gap: 8px;

.card {
  background-color: $accent;
  padding: $gap;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  gap: $gap;

  &--skeleton {
    pointer-events: none;
  }

  &__thumbnail {
    width: 100%;
    height: 100px;

    border-radius: 15px;
    overflow: hidden;

    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__counter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(67, 67, 67, 0.6);

    color: white;
    display: grid;
    place-content: center;

    font-size: 3rem;
  }

  &__name {
    font-size: 1rem;
    line-height: 1em;
    font-weight: 500;
    margin: 0;
    color: $dark;

    background-color: $secondary;
    padding: $gap;
    border-radius: 10px;

    &--skeleton {
      height: 2em;
      transform: unset;
    }
  }

  &__bottom {
    display: flex;
    gap: $gap;
  }
}

.details {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: $gap;
  color: $dark-page;

  &__pill {
    background-color: $secondary;
    border-radius: 10px;
    padding: 2px 10px;

    text-align: center;
    font-size: 0.8rem;

    position: relative;

    &--skeleton {
      height: 1.8em;
      transform: unset;
    }
  }
}

.amount {
  font-size: 28px;
  font-weight: 500;
  line-height: 1em;
  color: $dark;
}

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

  &--remove {
    background: #f27979;
    flex: 2;
  }
}
</style>
