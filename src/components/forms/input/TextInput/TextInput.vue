<template>
  <q-input :class="!value ? 'q-field--empty' : ''" v-bind="$attrs">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    value: String,
    icon: String,
  },
};
</script>

<style lang="scss" scoped></style>
