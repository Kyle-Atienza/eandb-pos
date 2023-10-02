<template>
  <div>
    <variant-item v-bind="$props">
      <template #quantity>
        <div class="variant-quantity bg-dark-page">
          <div class="variant-quantity__actions actions">
            <q-btn
              class="action action--add"
              icon="add"
              unelevated
              @click="invoiceStore.setItemQuantity(data.item, 1)"
            />
            <div class="variant-quantity__value value">
              <p class="q-mb-none">{{ quantity }}</p>
            </div>
            <q-btn
              class="action action--remove"
              icon="remove"
              unelevated
              @click="onRemoveQuantity"
            />
          </div>
        </div>
      </template>
    </variant-item>
    <alert-popup ref="alertPopup" />
  </div>
</template>

<script>
import { useInvoiceStore } from 'src/stores/invoice';

import { computed, ref } from 'vue';

import AlertPopup from 'src/components/common/AlertPopup/AlertPopup.vue';
import VariantItem from './VariantItem.vue';

export default {
  components: {
    VariantItem,
    AlertPopup,
  },
  props: {
    data: Object,
  },
  setup(props) {
    const invoiceStore = useInvoiceStore();

    const alertPopup = ref(null);

    const quantity = computed(() => invoiceStore.getItemQuantity(props.data.item));

    const onRemoveQuantity = () => {
      if (quantity.value === 1) {
        alertPopup.value.open('Remove Item', 'Are you sure you want to remove this item?', [
          {
            label: 'Yes',
            action: () => {
              invoiceStore.setItemQuantity(props.data.item, -1);
            },
          },
          {
            label: 'Cancel',
            action: () => {
              alertPopup.value.close();
            },
          },
        ]);
      } else {
        invoiceStore.setItemQuantity(props.data.item, -1);
      }
    };

    return {
      invoiceStore,

      alertPopup,

      quantity,

      onRemoveQuantity,
    };
  },
};
</script>

<style lang="scss" scoped>
.variant-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 120px;
  /* border-radius: 15px; */
  /* overflow: hidden; */

  border-left: 15px solid $dark;

  &__value {
    padding: 10px 5px;

    p {
      font-size: 1.2em;
    }
  }
}

.actions {
  height: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;

  background: darken($dark, 5);
}

.action {
  flex: 1;
  border-radius: 0;

  &--add {
    background: $primary;
  }

  &--remove {
    background: $negative;
  }
}
</style>
