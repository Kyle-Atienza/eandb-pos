<template>
  <div class="page-wrapper q-my-lg">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;

  min-height: inherit;
}
</style>
