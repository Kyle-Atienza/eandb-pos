<template>
  <div class="wrapper">
    <div class="icon">
      <img src="/src/assets/images/icons/success-primary.svg" alt="" />
    </div>
    <h1 class="text-h5">Order Success</h1>
    <div class="actions">
      <q-btn
        class="action"
        size="md"
        unelevated
        color="primary"
        @click="$router.push('/')"
        label="Home"
      />
      <q-btn
        class="action"
        size="md"
        unelevated
        color="secondary"
        text-color="dark"
        @click="$router.push('/')"
        label="View Order"
      />
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 20vh;

  text-align: center;
}
.icon {
  width: 100px;
  aspect-ratio: 1/1;
  background-color: $secondary;
  border-radius: 20px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
  }
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.action {
  border-radius: 10px;
}
</style>
