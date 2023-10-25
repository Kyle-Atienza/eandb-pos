<template>
  <div class="q-mx-md q-mt-lg">
    <div class="row items-center">
      <p class="text-h5 col q-mb-none">Sales</p>
      <q-btn icon="tune" flat unelevated @click="optionsDialog = true"></q-btn>
    </div>
    <q-table
      class="table q-mt-sm bg-secondary text-dark"
      flat
      bordered
      color="dark"
      :rows="rows"
      :columns="columns"
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
          :items="productOptions.choices"
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
        <select-input
          class="col"
          v-if="modifierOptions.show"
          v-model="modifierOptions.value"
          :items="modifierOptions.choices"
          :key="modifierOptions.choices.length"
          label="Modifier"
        />
      </q-card-section>
      <q-card-actions class="row">
        <q-btn class="col bg-negative" label="Cancel" flat unelevated />
        <q-btn
          class="col bg-primary"
          label="OK"
          color="secondary"
          flat
          unelevated
          @click="onGroupRows"
        />
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

export default {
  components: {
    SelectInput,
  },
  setup() {
    const inventoryStore = useInventoryStore();
    const products = computed(() => inventoryStore.products);

    const $q = useQuasar();
    const columns = ref([
      {
        name: 'product',
        label: 'Product',
        field: 'product',
        align: 'left',
        required: true,
        sortable: true,
      },
      {
        name: 'variant',
        label: 'Variant',
        field: 'variant',
        align: 'left',
        required: true,
        sortable: true,
      },
      {
        name: 'modifier',
        label: 'Modifier',
        field: 'modifier',
        align: 'left',
        required: true,
        sortable: true,
      },
      {
        name: 'sold',
        label: 'Sold',
        field: 'sold',
        align: 'left',
        required: true,
        sortable: true,
      },
      {
        name: 'sales',
        label: 'Sales',
        field: 'sales',
        align: 'left',
        required: true,
        sortable: true,
      },
    ]);
    const rows = ref([
      {
        modifier: 'Sea Salt',
        product: 'Taro Chips',
        variant: '175g',
        sales: 100,
        sold: 1,
      },
      {
        _id: '64fc900ff0a869d1b094931f_64fc900ff0a869d1b0949320_Honey Butter',
        modifier: 'Honey Butter',
        product: 'Taro Chips',
        variant: '175g',
        sales: 100,
        sold: 1,
      },
      {
        _id: '64fc900ff0a869d1b094931f_64fc900ff0a869d1b0949320_Cheese',
        modifier: 'Cheese',
        product: 'Taro Chips',
        variant: '175g',
        sales: 200,
        sold: 2,
      },
      {
        _id: '64fc900ff0a869d1b094931f_64fc900ff0a869d1b0949320_Honey-Butter',
        modifier: 'Honey-Butter',
        product: 'Taro Chips',
        variant: '175g',
        sales: 100,
        sold: 1,
      },
      {
        _id: '64fc43a61118c9139e7665fa_64fc43a61118c9139e7665fb',
        modifier: '',
        product: 'Oyster Mushroom Spanish Style',
        variant: '220g',
        sales: 3300,
        sold: 15,
      },
      {
        _id: '64fc82447ae287cceb331213_64fc82447ae287cceb331214',
        modifier: '',
        product: 'Oyster Mushroom Sisig',
        variant: '220g',
        sales: 2200,
        sold: 10,
      },
      {
        _id: '64fc86a57ae287cceb33121a_64fc86a57ae287cceb33121b',
        modifier: '',
        product: 'Oyster Mushroom Chilli Garlic Paste',
        variant: '120g',
        sales: 220,
        sold: 1,
      },
    ]);
    const optionsDialog = ref(false);

    const productOptions = reactive({
      show: false,
      value: 'Show All',
      choices: ['Show All', ...new Set(rows.value.map((row) => row.product))],
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

    watch(rows, (invoices) => {
      productOptions.value = 'Show All';
      productOptions.choices = ['Show All', ...new Set(invoices.map((row) => row.product))];
      productOptions.show = productOptions.value !== 'Show All';
    });
    watch(
      () => productOptions.value,
      (value) => {
        const hasSelectedProduct = value !== 'Show All';

        if (hasSelectedProduct && products.value.length) {
          const selectedProduct = products.value.find((product) => product.name === value);

          variantOptions.choices = selectedProduct.variants.map((variant) => variant.name);
          modifierOptions.choices = selectedProduct.modifier.values;

          variantOptions.show = hasSelectedProduct;
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
      }
    );

    const onGroupRows = () => {
      const selectedProduct = productOptions.value !== 'Show All' ? productOptions.value : '';
      const selectedVariant = variantOptions.value !== 'Show All' ? variantOptions.value : '';
      const selectedModifier = modifierOptions.value !== 'Show All' ? modifierOptions.value : '';

      console.log(selectedProduct, selectedVariant, selectedModifier);
    };

    const filters = inject('reportFilters');

    onMounted(() => {
      if (!products.value.length) {
        $q.loading.show();

        inventoryStore.fetchItems().finally(() => {
          $q.loading.show();
        });
      }

      if (true) {
        // wtf
        $q.loading.show();

        api({
          url: '/reports/invoice',
        })
          .then((res) => {
            columns.value = [
              {
                name: 'product',
                label: 'Product',
                field: 'product',
                align: 'left',
                required: true,
                sortable: true,
              },
              {
                name: 'variant',
                label: 'Variant',
                field: 'variant',
                align: 'left',
                required: true,
                sortable: true,
              },
              {
                name: 'modifier',
                label: 'Modifier',
                field: 'modifier',
                align: 'left',
                required: true,
                sortable: true,
              },
              {
                name: 'sold',
                label: 'Sold',
                field: 'sold',
                align: 'left',
                required: true,
                sortable: true,
              },
              {
                name: 'sales',
                label: 'Sales',
                field: 'sales',
                align: 'left',
                required: true,
                sortable: true,
              },
            ];
            rows.value = res.data.rows;
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            $q.loading.hide();
          });
      }
    });

    return {
      filters,
      columns,
      rows,
      productOptions,
      variantOptions,
      modifierOptions,
      onGroupRows,
      optionsDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  border-radius: 15px;
}
</style>
