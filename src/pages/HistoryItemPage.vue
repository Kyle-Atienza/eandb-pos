<template>
  <q-tabs
    v-model="tab"
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="items" label="Items" />
    <q-tab name="information" label="Information" />
  </q-tabs>

  <q-tab-panels v-if="invoice" v-model="tab" animated>
    <q-tab-panel class="q-py-md q-px-none" name="items">
      <checkout-items />
      <div class="divider q-mt-xl q-mx-md" />
      <h2 class="q-mx-md q-mt-md text-h4 text-right">{{ total }}</h2>
    </q-tab-panel>

    <q-tab-panel class="q-py-md q-px-none" name="information">
      <checkout-details />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { computed, onMounted, provide, ref } from 'vue';
import { parseAmount } from 'src/helpers/utils';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';
import CheckoutItems from './CheckoutItemsPage.vue';
import CheckoutDetails from './CheckoutDetailsPage.vue';

export default {
  components: {
    CheckoutItems,
    CheckoutDetails,
  },
  setup() {
    const route = useRoute();

    const tab = ref('items');
    const invoice = ref();

    const total = computed(() => {
      if (!invoice.value) {
        return 0;
      }

      const { items } = invoice.value;

      const totalAmount = items?.reduce((amount, item) => {
        const itemAmount = amount + item.quantity * item.amount;
        amount = itemAmount;
        return amount;
      }, 0);

      return parseAmount(totalAmount);
    });

    onMounted(() => {
      api
        .get(`/invoices/${route.params.id}`)
        .then((res) => {
          const { data } = res;

          invoice.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    provide('fetchedInvoice', invoice);

    return {
      parseAmount,

      tab,
      total,

      invoice,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-tab {
  background: #3a6145;
  border-radius: 15px 15px 0 0;
  flex: 1;

  &--inactive {
    opacity: 1;
    background: #487856;
  }

  ::v-deep &__indicator {
    display: none !important;
  }
}

.divider {
  height: 2px;
  flex: 1;
  background: $secondary;
}

.q-tab-panels {
  background: linear-gradient(180deg, #3a6145 18.23%, rgba(58, 97, 69, 0) 100%);
}
</style>
