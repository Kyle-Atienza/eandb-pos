<template>
  <q-btn
    :class="['option', selected ? 'option--selected' : '']"
    flat
    color="secondary"
    :style="`background-color: ${color}`"
    v-bind="$attrs"
  >
    <div class="option__content">
      <img class="option__icon" :src="icon" alt="" />
      <div class="option__label text-h6">{{ label }}</div>
    </div>
  </q-btn>
</template>

<script>
export default {
  props: {
    icon: String,
    label: String,
    color: String,
    selected: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.option {
  border-radius: 15px;
  padding: 15px;
  position: relative;
  overflow: hidden;

  ::v-deep .q-btn__content {
    justify-content: start;
  }

  &--selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid $secondary;
    border-radius: inherit;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* margin: 5px; */
  }

  &__icon {
    aspect-ratio: 1/1;
    width: 25px;
  }

  &__label {
    width: 100%;
    line-height: 1em;
    text-align: start;
  }
}
</style>
