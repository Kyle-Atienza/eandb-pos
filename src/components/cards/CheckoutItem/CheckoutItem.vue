<template>
  <div class="checkout-item item">
    <div class="thumbnail">
      <img :src="data.variant.image" alt="" />
    </div>
    <!-- <div class="divider" /> -->
    <div class="details">
      <div class="name text-h6">{{ getDisplayName(data) }}</div>
      <div class="chips">
        <q-chip class="chip" color="secondary" text-color="dark"> {{ data.variant.name }} </q-chip>
        <q-chip v-if="data.modifier" class="chip" color="secondary" text-color="dark">
          <q-icon name="img:src/assets/images/icons/modifiers/flavor.svg" class="q-mr-xs" />
          {{ data.modifier.value }}
        </q-chip>
      </div>
    </div>
    <q-input
      type="number"
      class="quantity"
      outlined
      rounded
      dense
      v-model="quantity"
      color="primary"
      @blur="onReplaceQuantity"
    />
    <div class="total text-h6">{{ parseAmount(data.variant.amount * data.quantity) }}</div>
    <!-- <div class="amount">
    </div> -->
  </div>
</template>

<script>
import { parseAmount } from 'src/helpers/utils';
import { useInvoiceStore } from 'src/stores/invoice';
import { getDisplayName } from 'src/helpers/products';

import { ref, onMounted, watch } from 'vue';

export default {
  props: {
    data: Object,
  },
  setup(props) {
    const invoiceStore = useInvoiceStore();

    const quantity = ref(0);

    onMounted(() => {
      quantity.value = invoiceStore.getItemQuantity(props.data.item);
    });

    const onReplaceQuantity = () => {
      quantity.value = quantity.value || 1;

      invoiceStore.setItemQuantity(props.data.item, 0, parseFloat(quantity.value));
    };

    watch(quantity, () => {
      if (false) {
        invoiceStore.updateItem(props.data.key, {
          ...props.data,
          quantity: Number(quantity.value) ? Number(quantity.value) : 1,
        });

        if (!Number(quantity.value)) {
          quantity.value = 1;
        }
      }
    });

    return {
      quantity,

      onReplaceQuantity,

      parseAmount,
      getDisplayName,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  background-color: $accent;
  padding: 10px;
  border-radius: 20px;

  display: grid;
  grid-template-columns: 70px 1fr;
  grid-row: repeat(3, auto);
  gap: 15px;

  color: $dark;
}

.details {
  flex: 1;
}

.amount {
  grid-column: 2/3;
  /* width: 120px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
  position: relative;
}

.thumbnail {
  /* width: 90px;
  min-width: 90px; */
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
  /* display: flex; */
  /* width: 60px; */
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

.total {
  display: flex;
  align-items: center;
  text-align: end;
  justify-content: flex-end;
  font-size: 30px;
}
</style>
