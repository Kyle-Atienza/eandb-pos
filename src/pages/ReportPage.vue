<template>
  <header-layout label="Reports"> </header-layout>
  <q-page>
    <page-wrapper>
      <div class="filters">
        <q-expansion-item
          class="range-filter q-pa-none q-mx-md"
          header-class="range-filter__header"
        >
          <template v-slot:header>
            <q-item-section>Options</q-item-section>
            <q-item-section side>
              <div>
                <!-- <q-chip color="primary" text-color="secondary" label="Dates" size="sm" /> -->
              </div>
            </q-item-section>
          </template>
          <q-card>
            <range-filter group="history-filter" label="Dates" v-model="filters.rangeDate" date />
            <choice-filter v-model="filters.brands" label="Brands" multiple />
          </q-card>
        </q-expansion-item>
      </div>

      <sales-table />
    </page-wrapper>
  </q-page>

  <teleport-wrapper to=".footer-slot">
    <div class="col">
      <generate-report />
    </div>
  </teleport-wrapper>
</template>

<script>
import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';
import RangeFilter from 'src/components/common/SearchOptions/RangeFilter/RangeFilter.vue';
import ChoiceFilter from 'src/components/common/SearchOptions/ChoiceFilter/ChoiceFilter.vue';
import TeleportWrapper from 'src/components/common/TeleportWrapper/TeleportWrapper.vue';
import GenerateReport from 'src/components/pages/report/GenerateReport/GenerateReport.vue';

import SalesTable from 'src/components/pages/report/ReportVisuals/SalesTable/SalesTable.vue';

import { onMounted, provide, reactive } from 'vue';

export default {
  components: {
    HeaderLayout,
    PageWrapper,
    RangeFilter,
    ChoiceFilter,
    TeleportWrapper,
    GenerateReport,
    SalesTable,
  },
  setup() {
    const filters = reactive({
      rangeDate: {
        from: '',
        to: '',
      },
      brands: [
        {
          name: 'E and B Farm',
          selected: true,
        },
        {
          name: 'NutriPage',
          selected: true,
        },
        {
          name: 'ThreeK',
          selected: true,
        },
      ],
    });

    provide('reportFilters', filters);

    onMounted(() => {
      console.log(filters);
    });

    return {
      filters,
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  border-radius: 15px;
}
.filters {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.range-filter {
  background: darken($dark, 5);
  border-radius: 15px;
  overflow: hidden;

  ::v-deep &__header {
    .q-icon {
      color: $primary;
    }
  }
}
.q-card {
  background: darken($dark, 5);

  &__section:first-child::after {
    display: none;
  }
}
</style>
