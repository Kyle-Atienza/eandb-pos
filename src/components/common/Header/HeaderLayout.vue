<template>
  <Teleport v-if="mounted" to=".header-title">
    <div class="header">
      <q-btn
        v-if="!root"
        class="header__back"
        flat
        round
        icon="chevron_left"
        @click="$router.back()"
      />
      {{ label ?? '' }}
    </div>
    <slot></slot>
  </Teleport>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  props: {
    label: String,
    root: Boolean,
  },
  setup() {
    const mounted = ref(false);

    onMounted(() => {
      mounted.value = true;
    });

    return {
      mounted,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  &__back {
    font-size: 0.5rem;

    :deep(.q-icon) {
      font-size: 3em;
    }
  }
}
</style>
