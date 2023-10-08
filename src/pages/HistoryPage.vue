<template>
  <header-layout label="History">
    <div class="history-header"></div>
  </header-layout>
  <q-page>
    <page-wrapper>
      <router-view></router-view>
    </page-wrapper>
  </q-page>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';

export default {
  components: {
    HeaderLayout,
    PageWrapper,
  },
};
</script>

<style lang="scss" scoped></style>
