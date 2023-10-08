<template>
  <header-layout label="Dashboard" root />
  <q-page>
    <page-wrapper>
      <q-btn
        @click="$router.push('checkout/items')"
        class="q-mx-md"
        unelevated
        color="primary"
        size="lg"
      >
        <span class="flex items-center justify-between full-width">
          New Order
          <q-icon name="add" size="sm" />
        </span>
      </q-btn>
      <h2 class="q-mx-md text-h6">Today</h2>
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';

export default {
  components: { PageWrapper, HeaderLayout },
  setup() {
    // console.log('you should only see this in dev');
  },
};
</script>

<style lang="scss" scoped></style>
