<template>
  <q-btn
    class="attribute-chip"
    unelevated
    :color="selected ? 'primary' : 'secondary'"
    :text-color="selected ? '' : 'dark'"
    v-bind="$attrs"
  >
    <span class="flex" style="gap: 0.5em">
      <slot></slot>
      <q-btn
        v-if="this.$.vnode.key?.toString"
        class="self-center"
        icon="remove"
        round
        style="font-size: 0.5em"
        unelevated
        color="negative"
        @click="removeItem"
      ></q-btn>
      <q-btn
        v-else
        class="self-center"
        icon="add"
        round
        style="font-size: 0.5em"
        unelevated
        color="primary"
        @click="addItem"
      ></q-btn>
    </span>
  </q-btn>
</template>

<script>
export default {
  props: {
    selected: Boolean,
    edit: Boolean,
  },
  setup() {
    const removeItem = () => {
      console.log('remove');
    };

    const addItem = () => {
      console.log('remove');
    };

    return {
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
