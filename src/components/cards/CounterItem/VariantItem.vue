<template>
  <button-wrapper
    class="variant-item__wrapper full-width"
    :disabled="!option"
    @click="$emit('pick', data)"
  >
    <div :class="['variant-item', 'full-width', selected ? 'variant-item--selected' : '']">
      <div class="variant-item__details full-width">
        <div class="variant-item__detail variant-image">
          <img :src="data.variant.image" alt="" />
        </div>
        <div class="variant-item__detail variant-detail">
          <div class="variant-detail__section">
            <q-chip
              :color="selected ? 'dark' : 'primary'"
              text-color="secondary"
              :label="data.variant.name"
            />
            <p class="text-h5">{{ data.variant.amount }}</p>
          </div>
          <!-- <div class="variant-detail__section variant-detail--inventory">
                <div class="inventory-count">
                  <p class="text-subtitle2">24</p>
                  <q-icon name="inventory_2" size="xs"></q-icon>
                </div>
              </div> -->
        </div>
      </div>
      <slot name="quantity" v-bind="$props"></slot>
    </div>
  </button-wrapper>
</template>

<script>
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper.vue';

export default {
  props: {
    data: Object,
    selected: Boolean,
    option: Boolean,
    quantity: Boolean,
  },
  components: {
    ButtonWrapper,
  },
  setup(props) {
    console.log(props.variant);
  },
};
</script>

<style lang="scss" scoped>
.variant-item {
  background: darken($dark, 5);
  border-radius: 15px;
  display: flex;
  overflow: hidden;
  position: relative;

  &__details {
    display: flex;
    gap: 15px;
    padding: 10px;
  }

  &--selected {
    background: $primary;
  }

  &__wrapper:disabled {
    opacity: 1 !important;
  }
}

.variant-detail {
  flex: 1;
  display: flex;

  &__section {
    display: flex;
    align-items: flex-start;

    &:first-child {
      flex: 1;
      flex-direction: column;
    }
  }

  &--inventory {
    display: flex;
    align-items: center;
  }
}

.inventory-count {
  color: $dark;

  background: $secondary;
  border-radius: 10px;
  border: $accent 4px solid;
  padding: 5px;
  width: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    line-height: 0.9em;
  }
}

.variant-image {
  $dimensions: 80px;

  width: $dimensions;
  height: $dimensions;
  border-radius: 10px;
  overflow: hidden;

  display: flex;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
  }
}
</style>
