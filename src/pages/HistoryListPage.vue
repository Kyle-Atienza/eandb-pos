<template>
  <div class="q-mx-md history-items">
    <p v-if="!invoices.length && !$q.loading.isActive" class="text-h6 text-center">
      There are no transactions yet
    </p>
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
import { useQuasar } from 'quasar';

export default {
  components: {
    HistoryItem,
  },
  setup() {
    const $q = useQuasar();

    const invoices = ref([]);

    const fetchInvoices = () => {
      $q.loading.show();

      api
        .get('/invoices')
        .then((res) => {
          const { data } = res.data;

          invoices.value = data;
          $q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      fetchInvoices();
    });

    return {
      $q,
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
