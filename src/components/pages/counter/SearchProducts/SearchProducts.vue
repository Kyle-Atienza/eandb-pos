<template>
  <q-input
    class="search col q-mr-md"
    outlined
    v-model="ph"
    placeholder="Search Products"
    dense
    color="white"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
