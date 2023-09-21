<template>
  <q-expansion-item
    header-class="item__header"
    :class="[`inventory-item item`, isUpdating ? 'item--edit' : '']"
    v-model="expanded"
  >
    <template v-slot:header>
      <div class="item__displayed">
        <div class="thumbnail">
          <div class="thumbnail__image">
            <div class="thumbnail__placeholder">
              <q-icon name="image" size="lg" color="accent"></q-icon>
            </div>
            <img
              :class="!selected.variant?.image ? 'thumbnail__image--empty' : ''"
              :src="selected.variant?.image"
              alt=""
            />
          </div>
          <attribute-chip v-if="selected.variant?.amount" class="amount q-mt-sm">
            <span style="font-size: 1.1em; white-space: nowrap">{{
              parseAmount(selected.variant?.amount)
            }}</span>
          </attribute-chip>
        </div>
        <div class="details">
          <h2 class="name text-h6">{{ data.name }}</h2>
          <div class="attribute-list q-mt-sm">
            <div class="flex">
              <div class="attribute-list__chips">
                <attribute-chip
                  v-for="(variant, index) in data.variants"
                  :key="index"
                  :selected="variant.name === selected.variant?.name"
                  :update="isUpdating"
                  type="variant"
                  @click="selected.variant = variant"
                  :data="variant"
                >
                  {{ variant.name }}
                </attribute-chip>
                <attribute-chip create v-if="isUpdating" type="variant" />
              </div>
            </div>
          </div>
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
          <h4
            v-if="data.modifier.values.length || isUpdating"
            class="attribute-list__label text-subtitle1"
          >
            Modifiers
          </h4>
          <div class="attribute-list__chips">
            <attribute-chip
              v-for="(modifier, index) in data.modifier.values"
              :key="index"
              :update="isUpdating"
              @click="selected.modifier = modifier"
              type="modifier"
            >
              {{ modifier }}
            </attribute-chip>
            <attribute-chip create v-if="isUpdating" type="modifier" />
          </div>
        </div>
      </div>

      <div class="actions q-mt-lg">
        <div class="flex q-gutter-sm">
          <q-btn
            class="col"
            padding="sm"
            unelevated
            :label="isUpdating ? 'Done' : 'Edit'"
            color="primary"
            style="font-size: 1.1em"
            @click="onUpdate"
          />
          <q-btn
            v-if="isUpdating"
            class="col"
            padding="sm"
            unelevated
            label="Cancel"
            color="secondary"
            style="font-size: 1.1em"
            outline
          />
          <q-btn
            v-else
            class="col"
            padding="sm"
            unelevated
            label="Delete"
            color="negative"
            style="font-size: 1.1em"
            @click="deleteProduct"
          />
        </div>
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { useInventoryStore } from 'src/stores/inventory';

import { onMounted, provide, ref } from 'vue';
import { capitalizeCase, parseAmount } from 'src/helpers/utils';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import AttributeChip from './AttributeChip.vue';

export default {
  components: {
    AttributeChip,
  },
  props: {
    data: Object,
  },
  setup({ data }) {
    const $q = useQuasar();

    const inventoryStore = useInventoryStore();

    const expanded = ref(false);
    const isUpdating = ref(false);

    const selected = ref({
      product: {},
      variant: {},
      modifier: '',
    });

    const setDefaultVariant = () => {
      const defaultVariant = data.variants[0];
      selected.value.variant = defaultVariant;
    };

    const onAttributeClick = (callback) => {
      selected.value.product = data;
      callback();
    };

    const onUpdate = () => {
      selected.value.product = data;
      isUpdating.value = !isUpdating.value;
    };

    const deleteProduct = () => {
      $q.loading.show();
      api
        .delete(`/products/${data._id}`)
        .then(() => {
          inventoryStore.deleteProduct(data._id);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          $q.loading.hide();
          expanded.value = false;
        });
    };

    onMounted(() => {
      setDefaultVariant();
    });

    provide('selected', selected);
    provide('isUpdating', isUpdating);

    return {
      expanded,
      isUpdating,
      selected,

      onUpdate,
      capitalizeCase,
      parseAmount,
      onAttributeClick,
      deleteProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  &__section {
    &--side {
      display: none;
    }
  }

  .q-focus-helper {
    display: none;
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
    width: 100%;
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
  width: 100px;

  display: flex;
  flex-direction: column;
  align-self: flex-start;

  margin-right: 10px;
  overflow: hidden;

  &__image {
    position: relative;

    &--empty {
      opacity: 0;
    }
  }

  &__placeholder {
    position: absolute;
    width: 100%;
    aspect-ratio: 1/1;
    background: $secondary;
    border-radius: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    border-radius: 15px;

    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;

    position: relative;
  }
}

.amount {
  white-space: nowrap !important;
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

.toggle {
  width: 30px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  pointer-events: auto;

  &__button {
    border-radius: 15px;
    width: 100%;
  }
}

.action {
  width: 100%;
}

.attributes {
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
