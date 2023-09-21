<template>
  <div class="layout-fab" v-if="!hiddenPath.includes($route.path)">
    <inventory-fab v-if="$route.path === '/inventory'" />
    <counter-fab v-else />
  </div>
</template>

<script>
import CounterFab from './CounterFab/CounterFab.vue';
import InventoryFab from './InventoryFab/InventoryFab.vue';

export default {
  components: {
    CounterFab,
    InventoryFab,
  },
  setup() {
    const hiddenPath = ['/checkout/items', '/checkout/details'];

    return {
      hiddenPath,
    };
  },
};
</script>

<style lang="scss" scoped></style>
