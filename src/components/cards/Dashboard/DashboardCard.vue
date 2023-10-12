<template>
  <div class="dashboard-card">
    <div class="dashboard-card__label label flex items-center">
      <q-icon v-if="icon" class="label__icon bg-dark q-pa-sm" :name="icon" size="xs" />
      <p :class="['text-h6 q-mb-none name', icon ? 'q-ml-sm' : '']">{{ label }}</p>
    </div>
    <div class="dashboard-card__section q-mt-sm">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-card {
  padding: 15px;
  background: $primary;
  border-radius: 15px;
  /* height: fit-content; */
}

.label {
  &__icon {
    border-radius: 10px;
  }
}

.name {
  line-height: 1em;
}
</style>
