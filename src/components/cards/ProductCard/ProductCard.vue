<template>
  <div :class="['product-card', 'card', skeleton ? 'card--skeleton' : '']">
    <div class="card__thumbnail">
      <div v-if="quantity" class="card__counter">
        {{ quantity }}
      </div>
      <q-skeleton v-if="skeleton" height="100%" />
      <img v-else src="src/assets/images/temp/temp-product.jpg" alt="" />
    </div>
    <q-skeleton v-if="skeleton" class="card__name card__name--skeleton" type="text" />
    <h3 v-else class="card__name">{{ data?.product.name }}</h3>
    <div class="card__bottom">
      <div v-if="skeleton" class="details">
        <q-skeleton
          v-for="(pill, index) in 3"
          :key="index"
          class="details__pill details__pill--skeleton"
          type="text"
        />
      </div>
      <div v-else class="details">
        <div class="details__pill">
          {{ parseAmount(data?.variant.amount) }}
        </div>
        <div class="details__pill">
          {{ data?.variant.name }}
        </div>
        <div class="details__pill">
          <q-icon name="img:src/assets/images/icons/modifiers/flavor.svg" />
          {{ data?.modifier.value }}
        </div>
      </div>
      <div class="actions">
        <q-btn @click="quantity += 1" icon="add" flat class="action action--add" />
        <q-btn
          v-if="quantity"
          @click="quantity -= 1"
          icon="remove"
          flat
          class="action action--remove"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { parseAmount, getProductItemId } from 'src/helpers/utils';
import { computed, onMounted, ref, watch } from 'vue';
import { useInvoiceStore } from 'src/stores/invoice';

export default {
  props: {
    data: Object,
    skeleton: {
      type: Boolean,
      default: false,
    },
  },
  setup({ data, skeleton }) {
    const invoice = useInvoiceStore();

    const quantity = ref(0);

    onMounted(() => {
      if (!skeleton) {
        quantity.value = invoice.findItem(getProductItemId(data))?.quantity || 0;
      }
    });

    const invoiceItem = computed(() => ({
      id: getProductItemId(data),
      ref: {
        product: data.product._id,
        variant: data.variant._id,
      },
      name: data.product.name,
      brand: data.product.brand,
      variant: data.variant.name,
      amount: data.variant.amount,
      modifier: data.modifier,
      quantity: quantity.value,
    }));

    watch(quantity, () => {
      if (quantity.value) {
        if (!invoice.hasItem(getProductItemId(data))) {
          invoice.addItem(invoiceItem.value);
        } else {
          invoice.updateItem(getProductItemId(data), invoiceItem.value);
        }
      } else {
        invoice.removeItem(getProductItemId(data));
      }
    });

    return {
      parseAmount,

      quantity,
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
    color: $dark-page;

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

.actions {
  flex: 2;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
}

.action {
  border-radius: 0;
  width: 100%;

  &--add {
    background: #00bc89;
    flex: 3;
  }

  &--remove {
    background: #f27979;
    flex: 2;
  }
}
</style>
