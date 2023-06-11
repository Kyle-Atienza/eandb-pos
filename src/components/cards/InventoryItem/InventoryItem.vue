<template>
  <q-expansion-item header-class="item__header" class="inventory-item item" v-model="expanded">
    <template v-slot:header>
      <div class="item__displayed">
        <div class="thumbnail">
          <img src="../../../assets/images/temp/temp-product.jpg" alt="" />
        </div>
        <div class="details">
          <h2 class="name text-h6">{{ data.name }}</h2>
          <q-chip v-if="selectedVariant.amount" class="amount" color="secondary" text-color="dark">
            {{ parseAmount(selectedVariant.amount) }}
          </q-chip>
        </div>
        <div class="actions">
          <q-btn
            class="action"
            unelevated
            color="dark"
            size="sm"
            :icon="expanded ? 'expand_less' : 'expand_more'"
          />
        </div>
      </div>
    </template>

    <div class="item__expandable">
      <div class="item__divider" />

      <div class="variants">
        <div class="variant">
          <h4 class="variant__label text-subtitle1">Variants</h4>
          <div class="variant__chips">
            <variant-chip
              v-for="(variant, index) in data.variants"
              :key="index"
              :label="variant.name"
              :selected="variant.name === selectedVariant.name"
              @click="selectedVariant = variant"
            />
          </div>
        </div>

        <div v-for="(modifier, index) in data.modifiers" :key="index" class="variant">
          <h4 class="variant__label text-subtitle1">{{ capitalizeCase(modifier.name) }}</h4>
          <div class="variant__chips">
            <variant-chip
              v-for="(modifier, index) in modifier.values"
              :key="index"
              :label="modifier"
              @click="onSelectVariant(category, value)"
            />
          </div>
        </div>
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { onMounted, ref } from 'vue';
import { capitalizeCase, parseAmount } from 'src/helpers/utils';
import VariantChip from './VariantChip.vue';

export default {
  components: {
    VariantChip,
  },
  props: {
    data: Object,
  },
  setup({ data }) {
    const expanded = ref(false);
    const selectedVariant = ref({});

    const setDefaultVariant = () => {
      const defaultVariant = data.variants[0];
      selectedVariant.value = defaultVariant;
    };

    onMounted(() => {
      setDefaultVariant();
    });

    return {
      expanded,
      selectedVariant,

      capitalizeCase,
      parseAmount,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  pointer-events: none;

  &__section {
    &--side {
      display: none;
    }
  }
}

.item {
  background-color: $accent;
  padding: 10px;
  border-radius: 20px;

  color: $dark;

  ::v-deep &__header {
    padding: 0;
  }

  &__displayed {
    display: flex;
    gap: 15px;
  }

  &__divider {
    width: 100%;
    height: 2px;
    background: $dark;
    margin: 15px 0 10px;
    border-radius: 100px;
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

.details {
  flex: 3;
}

.name {
  line-height: 1em;
  font-size: 1.1rem;
  letter-spacing: 0;
  margin: 0;
}

.amount {
  font-size: 1.1rem;
  margin-top: 8px;
}

.actions {
  width: 30px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  pointer-events: auto;
}

.action {
  border-radius: 15px;
  /* flex: 1; */
  width: 100%;
}

.variants {
  padding: 0 5px 5px 5px;

  &__edit {
    border-radius: 15px;
  }

  &__label {
    margin: 0;
  }
}

.variant {
  &:not(:first-of-type) {
    margin-top: 10px;
  }

  &__label {
    margin: 0;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__chip {
    border-radius: 1000px;
  }
}
</style>
