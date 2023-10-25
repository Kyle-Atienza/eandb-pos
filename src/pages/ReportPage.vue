<template>
  <header-layout label="Reports"> </header-layout>
  <q-page>
    <page-wrapper>
      <div class="filters">
        <range-filter
          class="q-mx-md"
          group="history-filter"
          label="Dates"
          v-model="filters.rangeDate"
          date
        />
        <choice-filter class="q-mx-md" v-model="filters.brands" label="Brands" multiple />
      </div>

      <sales-table />
    </page-wrapper>
  </q-page>

  <teleport-wrapper to=".footer-slot">
    <generate-report />
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
</style>
