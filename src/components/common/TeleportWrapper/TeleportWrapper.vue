<template>
  <Teleport v-if="mounted" v-bind="$attrs">
    <div class="footer">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
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
.footer {
  padding: 20px;
  border-radius: 20px 20px 0px 0px;
  overflow: hidden;
  background: $primary;

  display: flex;
  gap: 20px;

  &__amount {
    flex: 1;

    & > * {
      margin: 0;
    }
  }

  &__actions {
    flex: 1;
  }

  &__action {
    border-radius: 15px;
    width: 100%;
    height: 100%;
  }
}
</style>
