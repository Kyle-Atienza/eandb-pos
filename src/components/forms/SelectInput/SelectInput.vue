<template>
  <q-select v-model="selected" :options="items" outlined />
</template>

<script>
import { onUpdated, ref } from 'vue';

export default {
  props: {
    items: Array,
  },
  emits: ['pick'],
  setup(props, { emit }) {
    const selected = ref('');

    onUpdated(() => {
      emit('pick', selected.value);
    });

    return {
      selected,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .q-field__native {
  color: $secondary;
  font-size: 18px;
}
</style>
