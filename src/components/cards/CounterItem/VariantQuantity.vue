<template>
  <variant-item v-bind="$props">
    <template #quantity>
      <div class="variant-quantity">
        <div class="variant-quantity__value value">
          <p class="q-mb-none">{{ quantity }}</p>
        </div>
        <div class="variant-quantity__actions actions">
          <q-btn class="action action--add" icon="add" unelevated />
          <q-btn class="action action--remove" icon="remove" unelevated />
        </div>
      </div>
    </template>
  </variant-item>
</template>

<script>
import { useInvoiceStore } from 'src/stores/invoice';

import { computed, onMounted } from 'vue';
import VariantItem from './VariantItem.vue';

export default {
  components: {
    VariantItem,
  },
  props: {
    data: Object,
  },
  setup(props) {
    const invoiceStore = useInvoiceStore();

    const quantity = computed(() => invoiceStore.getItemQuantity(props.data.item));

    onMounted(() => {
      console.log();
    });

    return {
      quantity,
    };
  },
};
</script>

<style lang="scss" scoped>
.variant-quantity {
  display: flex;
  align-items: center;
  gap: 10px;

  &__value {
    min-width: 40px;
    height: 50px;
    border: 2px solid $secondary;
    border-radius: 99px;

    background: $dark;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.actions {
  height: 100%;

  display: flex;
  flex-direction: column;
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
