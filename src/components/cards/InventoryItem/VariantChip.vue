<template>
  <q-btn
    class="variant-chip"
    unelevated
    :color="selected ? 'primary' : 'secondary'"
    :text-color="selected ? '' : 'dark'"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    selected: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.variant-chip {
  border-radius: 1000px;
}
</style>
