<template>
  <header-layout label="Dashboard" root />
  <q-page>
    <page-wrapper>
      <h2 class="q-mx-md text-h6">Today</h2>
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';

export default {
  components: { PageWrapper, HeaderLayout },
};
</script>

<style lang="scss" scoped></style>
