<template>
  <q-expansion-item
    header-class="item__header"
    :class="[`inventory-item item`, isEditing ? 'item--edit' : '']"
    v-model="expanded"
  >
    <template v-slot:header>
      <div class="item__displayed">
        <div class="thumbnail">
          <img :src="selectedVariant.image" alt="" />
        </div>
        <div class="details">
          <h2 class="name text-h6">{{ data.name }}</h2>
          <!-- <attribute-chip v-if="selectedVariant.amount" class="q-mt-md">
            <span style="font-size: 1.1em">{{ parseAmount(selectedVariant.amount) }}</span>
          </attribute-chip> -->
          <q-input
            v-if="selectedVariant.amount"
            type="number"
            class=""
            outlined
            rounded
            dense
            v-model="amount"
            v-on:click.stop
            :disable="!isEditing"
            color="primary"
          />
        </div>
        <div class="toggle">
          <q-btn
            class="toggle__button"
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

      <div class="attributes">
        <div class="attribute-list">
          <h4 class="attribute-list__label text-subtitle1">Variants</h4>
          <div class="flex">
            <div class="attribute-list__chips">
              <attribute-chip
                v-for="(variant, index) in data.variants"
                :key="index"
                :selected="variant.name === selectedVariant.name"
                @click="selectedVariant = variant"
              >
                {{ variant.name }}
              </attribute-chip>
            </div>
          </div>
        </div>

        <div class="attribute-list">
          <h4 class="attribute-list__label text-subtitle1">Modifiers</h4>
          <div class="attribute-list__chips">
            <attribute-chip v-for="(variant, index) in data.modifier.values" :key="index">
              {{ variant }}
            </attribute-chip>
            <attribute-chip :edit="isEditing" />
          </div>
        </div>
      </div>

      <div class="actions q-mt-lg">
        <h4 class="q-my-none text-subtitle1">Actions</h4>
        <div class="flex q-gutter-sm">
          <q-btn
            class="col"
            padding="sm"
            unelevated
            label="Edit"
            color="primary"
            style="font-size: 1.1em"
            @click="isEditing = !isEditing"
          />
          <q-btn
            class="col"
            padding="sm"
            unelevated
            label="Delete"
            color="negative"
            style="font-size: 1.1em"
          />
        </div>
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { onMounted, ref } from 'vue';
import { capitalizeCase, parseAmount } from 'src/helpers/utils';
import AttributeChip from './AttributeChip.vue';

export default {
  components: {
    AttributeChip,
  },
  props: {
    data: Object,
  },
  setup({ data }) {
    const expanded = ref(false);
    const selectedVariant = ref({});
    const isEditing = ref(false);
    const amount = ref(0);

    const setDefaultVariant = () => {
      const defaultVariant = data.variants[0];
      selectedVariant.value = defaultVariant;
      amount.value = defaultVariant.amount;
    };

    onMounted(() => {
      setDefaultVariant();
    });

    return {
      expanded,
      selectedVariant,
      isEditing,
      amount,

      capitalizeCase,
      parseAmount,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  /* pointer-events: none; */

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

  transition: background 0.2s ease-in-out;

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

  &--edit {
    background: $negative;
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

.toggle {
  width: 30px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  pointer-events: auto;

  &__button {
    border-radius: 15px;
    /* flex: 1; */
    width: 100%;
  }
}

.action {
  border-radius: 15px;
  /* flex: 1; */
  width: 100%;
}

.attributes {
  /* padding: 0 5px 5px 5px; */

  &__edit {
    border-radius: 15px;
  }

  &__label {
    margin: 0;
  }
}

.attribute-list {
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
