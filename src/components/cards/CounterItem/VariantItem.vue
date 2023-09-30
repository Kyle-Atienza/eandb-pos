<template>
  <button-wrapper
    class="variant-item__wrapper full-width"
    :disabled="!option"
    @click="$emit('pick', data)"
  >
    <div :class="['variant-item', 'full-width', selected ? 'variant-item--selected' : '']">
      <div class="variant-item__details full-width flex column">
        <div class="flex q-gutter-sm">
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
          </div>
        </div>
        <div v-if="selected && product.modifier.values.length" class="select-modifier">
          <select-input
            class="select-modifier__select"
            required
            v-model="modifier"
            :items="product.modifier.values"
            :label="product.modifier.name ? capitalizeCase(product.modifier.name) : 'Modifier'"
            color="secondary"
            label-color="secondary"
            dense
            @update:model-value="
              $emit('pick', {
                ...data,
                modifier: modifier,
              })
            "
            :rules="[(val) => !!val || '']"
          >
          </select-input>
        </div>
      </div>

      <slot name="quantity"></slot>
    </div>
  </button-wrapper>
</template>

<script>
import { capitalizeCase } from 'src/helpers/utils';

import SelectInput from 'src/components/forms/SelectInput/SelectInput.vue';
import { inject, ref } from 'vue';
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
    SelectInput,
  },
  setup() {
    const product = inject('product');
    const modifier = ref('');

    return {
      product,
      modifier,

      capitalizeCase,
    };
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

.select-modifier {
  margin-top: 10px;

  &__select {
    background: $dark;
    border-radius: 13px;
    overflow: hidden;
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
