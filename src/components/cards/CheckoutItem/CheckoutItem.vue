<template>
  <div class="checkout-item item">
    <div class="thumbnail">
      <img src="../../../assets/images/temp/temp-product.jpg" alt="" />
    </div>
    <div class="item__details">
      <div class="name text-h6">{{ data.name }}</div>
      <div class="chips">
        <q-chip class="chip" color="secondary" text-color="dark"> {{ data.variant }} </q-chip>
        <q-chip class="chip" color="secondary" text-color="dark">
          <q-icon name="img:src/assets/images/icons/modifiers/flavor.svg" class="q-mr-xs" />
          {{ data.modifier.value }}
        </q-chip>
      </div>
    </div>
    <div class="item__amount">
      <div class="total text-h6">{{ parseAmount(data.amount * data.quantity) }}</div>
      <q-input
        type="number"
        class="quantity"
        outlined
        rounded
        dense
        v-model="quantity"
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import { parseAmount } from 'src/helpers/utils';
import { useInvoiceStore } from 'src/stores/invoice';

import { onMounted, ref, watch } from 'vue';

export default {
  props: {
    data: Object,
  },
  setup({ data }) {
    const invoice = useInvoiceStore();

    const quantity = ref(0);

    onMounted(() => {
      quantity.value = data.quantity;
    });

    watch(quantity, () => {
      invoice.updateItem(data.id, {
        ...data,
        quantity: Number(quantity.value) ? Number(quantity.value) : 1,
      });

      if (!Number(quantity.value)) {
        quantity.value = 1;
      }
    });

    return {
      quantity,

      parseAmount,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  background-color: $accent;
  padding: 10px;
  border-radius: 20px;

  display: flex;
  gap: 15px;

  color: $dark;

  &__details {
    flex: 1;
  }

  &__amount {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 5px;
  }
}

.thumbnail {
  width: 90px;
  min-width: 90px;
  aspect-ratio: 1/1;
  align-self: flex-start;

  border-radius: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.name {
  line-height: 1em;
  font-size: 1.1rem;
  letter-spacing: 0;
}

.chips {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quantity {
  width: 60px;
  font-size: 1.2rem;

  ::v-deep input {
    text-align: center;
    color: $dark;
  }

  ::v-deep .q-field__control {
    background: $secondary;

    &::before {
      border: 0;
    }
  }
}
</style>
