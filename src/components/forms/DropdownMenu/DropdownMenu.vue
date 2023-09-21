<template>
  <q-btn-dropdown
    color="primary"
    label="Dropdown Button"
    outline
    text-color="secondary"
    v-bind="$attrs"
  >
    <q-list class="dropdown-list">
      <q-item
        v-for="(item, index) in items"
        :key="index"
        clickable
        v-close-popup
        @click="$emit('pick', item)"
      >
        <q-item-section>
          <q-item-label>{{ item }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style lang="scss" scoped>
.q-btn-dropdown {
  font-size: 16px !important;
  height: 56px;
}

.q-btn {
  ::v-deep &__content {
    justify-content: space-between;
  }

  &--outline:before {
    border: 2px solid currentColor;
  }
}

.q-list {
  border-radius: 15px;
  overflow: hidden;
  background: $secondary;
  color: $dark;
}
</style>
