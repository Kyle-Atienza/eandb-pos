<template>
  <button-wrapper
    class="variant-item__wrapper full-width"
    :disabled="!option"
    @click="$emit('pick', data)"
  >
    <div :class="['variant-item', 'full-width', selected ? 'variant-item--selected' : '']">
      <div class="variant-item__details full-width flex column">
        <div v-if="name" class="variant-detail variant-detail--name">
          <p class="text-subtitle1 q-ma-none text-left">
            {{ data.name }}
          </p>
        </div>
        <div class="variant-detail variant-detail--flex full-width">
          <div class="variant-image">
            <img :src="data.variant.image" alt="" />
          </div>
          <div class="">
            <div class="variant-detail__section full-width">
              <div class="variant-section--chips full-width">
                <q-chip
                  class="variant-detail__modifier"
                  :color="selected ? 'dark' : 'primary'"
                  text-color="secondary"
                  :label="data.variant.name"
                />
                <q-chip
                  v-if="data.modifier"
                  class="variant-detail__name self-start ellipsis"
                  color="secondary"
                  text-color="dark"
                  :label="data.modifier"
                />
              </div>
              <p class="variant-details__amount text-h6 q-ma-none">
                {{ parseAmount(data.variant.amount) }}
              </p>
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
                item: `${data.item}_${modifier}`,
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
import { capitalizeCase, parseAmount } from 'src/helpers/utils';

import SelectInput from 'src/components/forms/SelectInput/SelectInput.vue';
import { inject, ref } from 'vue';

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper.vue';

export default {
  props: {
    data: Object,
    selected: Boolean,
    option: Boolean,
    quantity: Boolean,
    name: Boolean,
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
      parseAmount,

      capitalizeCase,
    };
  },
};
</script>

<style lang="scss" scoped>
.variant-item {
  display: flex;
  position: relative;

  &__details {
    background: darken($dark, 5);

    border-radius: 15px;
    overflow: hidden;

    /* display: flex;
    flex-direction: column;
    gap: 10px; */
  }

  &--selected {
    .variant-item__details {
      background: $primary;
    }
  }

  &__wrapper:disabled {
    opacity: 1 !important;
  }
}

.variant-detail {
  padding: 10px;

  &--name {
    /* background: $secondary;
    color: $dark; */

    p {
      line-height: 1.1em;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 1px;
        background: $secondary;
      }
    }
  }

  &--flex {
    display: flex;
    gap: 12px;
  }

  &__section {
    display: flex;
    align-items: flex-start;

    display: flex;
    flex-direction: column;
    /* gap: 5px; */

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

.variant-section {
  &--chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
}

.select-modifier {
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

  flex-shrink: 0;

  display: flex;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
  }
}
</style>
