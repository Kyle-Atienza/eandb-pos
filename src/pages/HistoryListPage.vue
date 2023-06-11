<template>
  <div class="q-mx-md history-items">
    <history-item
      v-for="(invoice, index) in invoices"
      :key="index"
      class="history-item"
      :data="invoice"
    />
  </div>
</template>

<script>
import HistoryItem from 'src/components/cards/HistoryItem/HistoryItem.vue';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';

export default {
  components: {
    HistoryItem,
  },
  setup() {
    const invoices = ref([]);

    const fetchInvoices = () => {
      api
        .get('/invoices')
        .then((res) => {
          const { data } = res.data;

          invoices.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      fetchInvoices();
    });

    return {
      invoices,
    };
  },
};
</script>

<style lang="scss" scoped>
.history-item {
  &:not(:first-of-type) {
    margin-top: 15px;
  }
}
</style>
