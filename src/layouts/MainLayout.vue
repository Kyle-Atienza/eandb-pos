<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header flex q-px-sm q-py-md">
      <q-toolbar>
        <q-toolbar-title class="header-title"> </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <layout-fab />
      </q-page-sticky>
    </q-page-container>

    <q-footer class="text-white transparent">
      <div class="footer-slot transparent"></div>
      <q-tabs
        v-if="!hideTabs.includes($route.path)"
        v-model="navbarTabs"
        class="bg-primary text-white"
      >
        <q-route-tab to="/" name="dashboard" icon="dashboard" label="Dashboard" />
        <q-route-tab to="/history/list" name="history" icon="list_alt" label="Records" />
        <q-route-tab to="/inventory" name="inventory" icon="inventory_2" label="Inventory" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import LayoutFab from 'src/components/common/LayoutFab/LayoutFab.vue';

import { useInvoiceStore } from 'src/stores/invoice';
import { ref } from 'vue';

export default {
  name: 'MainLayout',
  components: {
    LayoutFab,
  },
  setup() {
    const invoice = useInvoiceStore();

    const navbarTabs = ref('dashboard');
    const hideTabs = ref(['checkout', '/report']);

    return {
      invoice,

      navbarTabs,
      hideTabs,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-layout {
  background-color: $dark;
}

.header {
  border-radius: 0px 0px 20px 20px;
  /* min-height: 70px; */
}

.header-title {
  font-weight: 700;
}
</style>
