<template>
  <div class="q-mx-md q-mt-lg">
    <div class="row items-center">
      <p class="text-h5 col q-mb-none">Sales</p>
      <q-btn icon="tune" flat unelevated @click="optionsDialog = true"></q-btn>
    </div>
    <div v-if="tableOptions.product" class="flex q-py-sm q-gutter-sm">
      <div>
        <q-chip
          v-if="tableOptions.product"
          :label="tableOptions.product"
          color="primary"
          text-color="secondary"
        />
      </div>
      <div>
        <q-chip
          v-if="tableOptions.variant"
          :label="tableOptions.variant"
          color="primary"
          text-color="secondary"
        />
      </div>
    </div>
    <q-table
      class="table q-mt-sm bg-secondary text-dark"
      flat
      bordered
      color="dark"
      :rows="tableData.rows"
      :columns="tableData.columns"
      row-key="name"
    />
  </div>

  <q-dialog ref="" v-model="optionsDialog" persistent>
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">Table Options</div>
        <q-btn
          icon="close"
          round
          color="negative"
          size="sm"
          unelevated
          @click="optionsDialog = false"
        />
      </q-card-section>
      <q-card-section class="row column q-gutter-md">
        <div class="col">
          <q-chip color="secondary" text-color="dark">Group By</q-chip>
        </div>
        <select-input
          class="col"
          v-model="productOptions.value"
          :items="productChoices"
          label="Products"
        />
        <select-input
          class="col"
          v-if="variantOptions.show"
          v-model="variantOptions.value"
          :items="variantOptions.choices"
          :key="variantOptions.choices.length"
          label="Variants"
        />
        <!-- <select-input
          class="col"
          v-if="modifierOptions.show"
          v-model="modifierOptions.value"
          :items="modifierOptions.choices"
          :key="modifierOptions.choices.length"
          label="Modifier"
        /> -->
      </q-card-section>
      <q-card-actions class="row">
        <q-btn class="col bg-negative" label="Reset" flat unelevated @click="resetOptions" />
        <!-- <q-btn
          class="col bg-warning"
          label="Cancel"
          color="dark"
          flat
          unelevated
          @click="setOptions"
        /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import SelectInput from 'src/components/forms/SelectInput/SelectInput.vue';

import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useInventoryStore } from 'src/stores/inventory';

import { salesTablesColumns } from 'src/constants/tables.js';

export default {
  components: {
    SelectInput,
  },
  setup() {
    const $q = useQuasar();
    const inventoryStore = useInventoryStore();

    const optionsDialog = ref(false);
    const data = ref([]);

    const filters = inject('reportFilters');

    const products = computed(() => inventoryStore.products);
    const productChoices = computed(() => [
      'Show All',
      ...new Set(data.value.map((row) => row.product)),
    ]);

    const tableData = reactive({
      columns: [],
      rows: [],
    });

    const productOptions = reactive({
      show: false,
      value: 'Show All',
      choices: [],
    });
    const variantOptions = reactive({
      show: false,
      value: '',
      choices: [],
    });
    const modifierOptions = reactive({
      show: false,
      value: '',
      choices: [],
    });
    const tableOptions = reactive({
      product: '',
      variant: '',
      modifier: '',
    });

    const setTableData = (columns, rows) => {
      tableData.columns = columns;
      tableData.rows = rows;
    };
    const groupRowsByProduct = (rows) => {
      const grouped = Object.groupBy(rows, ({ product }) => product);
      return grouped;
    };
    const getProductVariants = (rows, product) => {
      const targetProduct = groupRowsByProduct(rows)[product];
      return targetProduct;
    };

    const mapGroupedRows = (groupedRows) => {
      const mappedRows = Object.keys(groupedRows).map((row) => {
        const sold = groupedRows[row].reduce((total, item) => {
          total += item.sold;
          return total;
        }, 0);
        const sales = groupedRows[row].reduce((total, item) => {
          total += item.sales;
          return total;
        }, 0);

        return {
          product: row,
          sold,
          sales,
        };
      });

      return mappedRows;
    };

    const setOptions = () => {
      tableOptions.product = productOptions.value !== 'Show All' ? productOptions.value : '';
      tableOptions.variant = variantOptions.value !== 'Show All' ? variantOptions.value : '';
      tableOptions.modifier = modifierOptions.value !== 'Show All' ? modifierOptions.value : '';

      if (productOptions.value !== '' && productOptions.value !== 'Show All') {
        if (variantOptions.value !== '' && variantOptions.value !== 'Show All') {
          setTableData(
            salesTablesColumns.groupedVariants,
            getProductVariants(data.value, productOptions.value).filter(
              ({ variant }) => variant === variantOptions.value
            )
          );
        } else {
          setTableData(
            salesTablesColumns.productVariants,
            getProductVariants(data.value, productOptions.value)
          );
        }
      } else {
        setTableData(
          salesTablesColumns.groupedProduct,
          mapGroupedRows(groupRowsByProduct(data.value))
        );
      }
    };

    const resetOptions = () => {
      productOptions.value = 'Show All';
      variantOptions.value = '';

      tableOptions.product = '';
      tableOptions.variant = '';
    };

    watch(
      () => productOptions.value,
      (value) => {
        const hasSelectedProduct = value !== 'Show All';
        variantOptions.show = hasSelectedProduct;
        if (hasSelectedProduct && products.value.length) {
          const selectedProduct = products.value.find((product) => product.name === value);

          variantOptions.choices = selectedProduct.variants.map((variant) => variant.name);
          modifierOptions.choices = selectedProduct.modifier.values;

          modifierOptions.show = selectedProduct.modifier.values.length;
          if (variantOptions.choices.length === 1) {
            // eslint-disable-next-line prefer-destructuring
            variantOptions.value = variantOptions.choices[0];
          } else {
            variantOptions.value = 'Show All';
            variantOptions.choices = ['Show All', ...variantOptions.choices];
          }

          if (modifierOptions.choices.length === 1) {
            // eslint-disable-next-line prefer-destructuring
            modifierOptions.value = modifierOptions.choices[0];
          } else {
            modifierOptions.value = 'Show All';
            modifierOptions.choices = ['Show All', ...modifierOptions.choices];
          }
        }
        setOptions();
      }
    );
    watch(
      () => variantOptions.value,
      () => {
        setOptions();
      }
    );
    watch(data, () => {
      setTableData(
        salesTablesColumns.groupedProduct,
        mapGroupedRows(groupRowsByProduct(data.value))
      );
    });
    watch(filters, async ({ rangeDate }) => {
      $q.loading.show();

      await api({
        url: '/reports/invoice',
        params: new URLSearchParams({
          date_min: rangeDate.from,
          date_max: rangeDate.to,
        }),
      })
        .then((res) => {
          data.value = res.data.rows;
          productOptions.choices = ['Show All', ...new Set(data.value.map((row) => row.product))];
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          $q.loading.hide();
        });
    });

    onMounted(async () => {
      $q.loading.show();

      if (!products.value.length) {
        await inventoryStore.fetchItems();
      }

      await api({
        url: '/reports/invoice',
      })
        .then((res) => {
          data.value = res.data.rows;
          productOptions.choices = ['Show All', ...new Set(data.value.map((row) => row.product))];
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          $q.loading.hide();
        });
    });

    return {
      data,
      productChoices,
      filters,
      productOptions,
      variantOptions,
      modifierOptions,
      optionsDialog,
      tableOptions,
      tableData,
      salesTablesColumns,

      setOptions,
      resetOptions,
      getProductVariants,
      groupRowsByProduct,
      mapGroupedRows,
      setTableData,
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  border-radius: 15px;
}
</style>
