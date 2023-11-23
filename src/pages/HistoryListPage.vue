<template>
  <Teleport v-if="mounted" to=".history-header">
    <div class="q-pt-md history-search">
      <div class="row full-width">
        <div class="col row flex bg-secondary search-bar">
          <outlined-text-input
            class="col-grow bg-primary"
            label="Buyer Name"
            placeholder="Juan Dela Cruz"
            v-model="buyer"
          />
          <q-btn class="filter bg-secondary" @click="onSearch" round color="secondary" outline>
            <q-icon name="search" color="primary" />
          </q-btn>
        </div>
        <q-btn
          class="filter q-ml-md"
          @click="dialog = !dialog"
          round
          color="secondary"
          outline
          icon="filter_list"
        />
      </div>
      <q-dialog persistent v-model="dialog">
        <q-card>
          <q-card-section class="row">
            <div class="text-h6 col">Filter Records</div>
            <q-btn
              icon="close"
              round
              color="negative"
              size="sm"
              unelevated
              @click="dialog = false"
            />
          </q-card-section>
          <q-card-section class="row q-gutter-y-md">
            <range-filter
              :key="filterRefresh"
              class="col-12"
              group="history-filter"
              label="No. of Items"
              v-model="rangeItems"
              default-opened
            />
            <range-filter
              :key="filterRefresh"
              class="col-12"
              group="history-filter"
              label="Amount"
              v-model="rangeAmount"
            />
            <range-filter
              :key="filterRefresh"
              class="col-12"
              group="history-filter"
              label="Date"
              v-model="rangeDate"
              date
            />
          </q-card-section>
          <q-card-actions class="row">
            <q-btn
              class="col"
              unelevated
              color="negative"
              size="md"
              label="Reset"
              @click="onResetParams"
            />
            <q-btn
              class="col"
              unelevated
              color="primary"
              size="md"
              label="Apply"
              @click="onFilterSearch"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </Teleport>

  <div class="q-mx-md history-items flex flex-column">
    <div class="q-mt-md full-width">
      <history-item
        v-for="(invoice, index) in invoices"
        :key="index"
        class="history-item"
        :data="invoice"
      />
    </div>
  </div>
</template>

<script>
import HistoryItem from 'src/components/cards/HistoryItem/HistoryItem.vue';
import RangeFilter from 'src/components/common/SearchOptions/RangeFilter/RangeFilter.vue';
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';

// import { api } from 'src/boot/axios';
import { computed, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useInvoiceStore } from 'src/stores/invoice';

export default {
  components: {
    HistoryItem,
    RangeFilter,
    OutlinedTextInput,
  },
  setup() {
    const $q = useQuasar();

    const invoiceStore = useInvoiceStore();

    const dialog = ref(false);
    const dialogShow = ref(false);
    const mounted = ref(false);
    const filterRefresh = ref(1);

    // const invoices = ref([]);
    const invoices = computed(() => invoiceStore.invoices);

    // search config
    const buyer = ref('');
    const rangeItems = ref({
      min: '',
      max: '',
    });
    const rangeAmount = ref({
      min: '',
      max: '',
    });
    const rangeDate = ref({
      from: '',
      to: '',
    });

    const paramsObject = computed(() => ({
      buyer: buyer.value,
      total_min: rangeAmount.value.min,
      total_max: rangeAmount.value.max,
      items_min: rangeItems.value.min,
      items_max: rangeItems.value.max,
      date_min: rangeDate.value.from,
      date_max: rangeDate.value.to,
    }));
    const requestParams = computed(() => {
      const params = new URLSearchParams(paramsObject.value);
      return params;
    });

    const fetchInvoices = () => {
      $q.loading.show();

      invoiceStore.getAll(requestParams.value).finally(() => {
        $q.loading.hide();
      });
    };

    const onUpdateParams = () => {
      paramsObject.value = {
        items_min: rangeItems.value?.min || 0,
        items_max: rangeItems.value?.max || 0,
      };
    };

    const onFilterSearch = () => {
      fetchInvoices();
      dialog.value = false;
    };

    const onSearch = () => {
      onUpdateParams();
      fetchInvoices();
    };

    const onResetParams = () => {
      buyer.value = '';
      rangeItems.value.min = '';
      rangeItems.value.max = '';
      rangeAmount.value.min = '';
      rangeAmount.value.max = '';
      rangeDate.value.min = '';
      rangeDate.value.min = '';
      filterRefresh.value += 1;
    };

    onMounted(() => {
      mounted.value = true;
      if (!invoices.value.length) {
        fetchInvoices();
      }
    });

    return {
      filterRefresh,
      dialog,
      dialogShow,
      mounted,
      invoices,
      rangeItems,
      rangeAmount,
      rangeDate,
      paramsObject,
      buyer,

      requestParams,

      onUpdateParams,

      fetchInvoices,
      onResetParams,
      onSearch,

      onFilterSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  border-radius: 15px;
}

.history-search {
  font-size: 1rem;
  font-weight: normal;
}

.history-item {
  &:not(:first-of-type) {
    margin-top: 15px;
  }
}

.filters {
  .q-card__section:first-child::after {
    display: none;
  }

  ::v-deep &__header {
    .q-icon {
      color: $secondary;
    }
  }
}

.filter-list {
  & > * {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>
