<template>
  <div class="dashboard-card">
    <div class="dashboard-card__label label flex items-center">
      <q-icon v-if="icon" class="label__icon bg-dark q-pa-sm" :name="icon" size="xs" />
      <p :class="['text-h6 q-mb-none name', icon ? 'q-ml-sm' : '']">{{ label }}</p>
    </div>
    <div v-if="!loading" class="dashboard-card__section q-mt-sm">
      <slot></slot>
    </div>
    <div v-else style="min-height: 30px">
      <div class="spinner">
        <q-spinner color="secondary" size="2em" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,
    loading: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-card {
  padding: 15px;
  background: $primary;
  border-radius: 15px;
  /* height: fit-content; */
  position: relative;
  overflow: hidden;
}

.label {
  &__icon {
    border-radius: 10px;
  }
}

.name {
  line-height: 1em;
}

.spinner {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
