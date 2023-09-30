<template>
  <q-select
    :class="[border ? 'select-input--bordered' : '']"
    v-model="selected"
    :options="items"
    outlined
    v-bind="$attrs"
  >
    <!-- <template v-slot:prepend>
      <q-chip style="font-size: 0.45em" :color="this.$attrs['label-color']">
        <slot name="label"></slot>
      </q-chip>
    </template> -->
  </q-select>
</template>

<script>
import { onUpdated, ref } from 'vue';

export default {
  props: {
    items: Array,
    border: Boolean,
    color: String,
  },
  emits: ['pick'],
  setup(props, { emit, attrs }) {
    const selected = ref('');

    onUpdated(() => {
      emit('pick', selected.value);

      console.log(attrs);
    });

    return {
      selected,
    };
  },
};
</script>

<style lang="scss" scoped>
.select-input {
  ::v-deep .q-field__control::before {
    border: 0 !important;
  }

  &--bordered {
  }

  /* 2px solid currentColor */
}

.q-field--dense {
  ::v-deep .q-field__control {
    min-height: 50px;
  }

  ::v-deep .q-field__label {
    top: 15px;
  }

  ::v-deep .q-field__append {
    min-height: inherit;
  }
}

::v-deep .q-field__control {
  color: currentColor;
}

::v-deep .q-field__control::before {
  border: 2px solid currentColor;
}

::v-deep .q-field__marginal {
  color: currentColor;

  .q-icon {
    font-size: 1.5em;
  }
}

::v-deep .q-field__native {
  color: $secondary;
  font-size: 18px;
}
</style>
