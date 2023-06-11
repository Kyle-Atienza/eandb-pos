<template>
  <q-dialog persistent ref="dialogRef" v-model="isOpen" @hide="close">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">{{ label }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1">{{ content }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-for="({ label, action }, index) in action"
          :key="index"
          class="col"
          unelevated
          :label="label"
          color="primary"
          @click="action"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      label: '',
      content: '',
      action: [],
    };
  },
  methods: {
    close() {
      this.isOpen = false;
      this.label = '';
      this.content = '';
      this.action = [];
    },
    open(label, content, action) {
      this.isOpen = true;
      this.label = label;
      this.content = content;
      this.action = action;
    },
  },
};
</script>

<style></style>
