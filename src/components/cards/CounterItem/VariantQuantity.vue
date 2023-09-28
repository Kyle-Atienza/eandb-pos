<template>
  <variant-item>
    <template #quantity>
      <div class="variant-quantity">
        <div class="variant-quantity__value value">
          <p class="q-mb-none">0</p>
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
import VariantItem from './VariantItem.vue';

export default {
  components: {
    VariantItem,
  },
  setup() {
    return {};
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
