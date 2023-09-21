<template>
  <q-btn
    class="attribute-chip"
    unelevated
    :color="selected ? 'primary' : 'secondary'"
    :text-color="selected ? '' : 'dark'"
    v-bind="$attrs"
    @click.stop
  >
    <span class="flex" style="gap: 0.5em">
      <slot></slot>
      <q-icon
        v-if="update"
        class="self-center"
        name="edit"
        size="xs"
        color="negative"
        @click="dialog = true"
      />
      <q-icon v-if="create" class="self-center" name="add" color="primary" @click="dialog = true" />
    </span>
  </q-btn>
  <q-dialog persistent v-model="dialog">
    <variant-form v-if="type === 'variant'" @close="dialog = false" v-bind="$props" />
    <modifier-form v-if="type === 'modifier'" @close="dialog = false" v-bind="$props" />
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import VariantForm from 'src/components/pages/inventory/VariantForm/VariantForm.vue';
import ModifierForm from 'src/components/pages/inventory/ModifierForm/ModifierForm.vue';

export default {
  props: {
    selected: Boolean,
    update: Boolean,
    create: Boolean,
    type: String,
    data: Object,
  },
  components: {
    VariantForm,
    ModifierForm,
  },
  setup() {
    const dialog = ref('false');

    const removeItem = () => {
      console.log('remove');
    };

    const addItem = () => {
      console.log('remove');
    };

    return {
      dialog,

      removeItem,
      addItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.attribute-chip {
  border-radius: 1000px;
  font-size: 1.1em;
}

/* ::v-deep .q-icon {
  font-size: 0.9em;
  margin-left: 0.4em;
} */
</style>
