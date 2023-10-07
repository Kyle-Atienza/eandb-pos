<template>
  <Teleport v-if="mounted" to=".history-header">
    <div class="q-pt-md history-search">
      <!--       <p v-if="!invoices.length && !$q.loading.isActive" class="text-h6 text-center">
        There are no transactions yet
      </p> -->
      <div class="row full-width">
        <outlined-text-input
          dense
          class="col"
          label="Buyer Name"
          placeholder="Juan Dela Cruz"
          v-model="buyer"
        />
        <q-btn
          icon="search"
          flat
          unelevated
          class="bg-dark q-ml-md"
          color="secondary"
          @click="onSearch"
        />
      </div>
      <q-expansion-item
        class="filters q-mt-sm full-width"
        header-class="filters__header"
        icon="settings"
        expand-icon-toggle
      >
        <template v-slot:header>
          <q-item-section>
            <div class="flex full-width">
              <p class="text-h6 q-mb-none">Filters</p>
              <div class="row q-gutter-sm q-ml-auto">
                <q-btn
                  v-if="Object.keys(paramsObject).length > 1"
                  class="col bg-negative"
                  flat
                  color="secondary"
                  @click="onResetParams"
                  >Reset</q-btn
                >
                <q-btn class="col bg-dark" flat color="secondary" @click="fetchInvoices"
                  >Apply</q-btn
                >
              </div>
            </div>
          </q-item-section>
        </template>
        <q-card class="q-pa-md">
          <q-card-section class="filter-list q-pa-none">
            <range-filter
              ref="rangeItems"
              group="history-filter"
              label="No. of Items"
              @update="onUpdateParams"
            />
            <range-filter
              ref="rangeAmount"
              group="history-filter"
              label="Amount"
              @update="onUpdateParams"
            />
            <range-filter
              ref="rangeDate"
              group="history-filter"
              label="Date"
              date
              @update="onUpdateParams"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
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

import { api } from 'src/boot/axios';
import { computed, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  components: {
    HistoryItem,
    RangeFilter,
    OutlinedTextInput,
  },
  setup() {
    const $q = useQuasar();

    const rangeItems = ref(null);
    const rangeAmount = ref(null);
    const rangeDate = ref(null);

    const mounted = ref(false);
    const buyer = ref('');

    const invoices = ref([]);
    const paramsObject = ref({});
    const requestParams = computed(() => {
      const params = new URLSearchParams(paramsObject.value);
      return params;
    });

    const fetchInvoices = () => {
      $q.loading.show();

      api({
        url: '/invoices',
        params: requestParams.value,
      })
        .then((res) => {
          const { data } = res.data;

          invoices.value = data;
          $q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const onUpdateParams = () => {
      paramsObject.value = {
        limit: -1,
        buyer: buyer.value,
        total_min: rangeAmount.value.min || 0,
        total_max: rangeAmount.value.max || 0,
        items_min: rangeItems.value.min || 0,
        items_max: rangeItems.value.max || 0,
        date_min: rangeDate.value.dateRange.from
          ? new Date(rangeDate.value.dateRange.from).toISOString()
          : '',
        date_max: rangeDate.value.dateRange.to
          ? new Date(rangeDate.value.dateRange.to).toISOString()
          : '',
      };
    };

    const onSearch = () => {
      onUpdateParams();
      fetchInvoices();
    };

    const onResetParams = () => {
      paramsObject.value = {
        limit: -1,
        total_min: 0,
        total_max: 0,
        items_min: 0,
        items_max: 0,
        date_min: '',
        date_max: '',
      };

      rangeItems.value.reset();
      rangeAmount.value.reset();
      rangeDate.value.reset();

      fetchInvoices();
    };

    onMounted(() => {
      mounted.value = true;
      fetchInvoices();
    });

    return {
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
    };
  },
};
</script>

<style lang="scss" scoped>
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

/* .filters {
  .q-item-type {
    min-height: 0;
    padding: 8px 0;
  }
} */
</style>
