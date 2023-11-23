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
      <checkout-items history />
    </q-tab-panel>

    <q-tab-panel class="q-py-md q-px-none" name="information">
      <checkout-details />
    </q-tab-panel>
  </q-tab-panels>

  <teleport-wrapper to=".footer-slot">
    <div class="total">
      <div class="divider" />
      <h2 class="q-my-md q-mt-md text-h4 text-right">{{ total }}</h2>
    </div>
  </teleport-wrapper>
</template>

<script>
import { computed, onMounted, provide, ref } from 'vue';
import { parseAmount } from 'src/helpers/utils';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';
import TeleportWrapper from 'src/components/common/TeleportWrapper/TeleportWrapper.vue';
import { useQuasar } from 'quasar';
import CheckoutItems from './CheckoutItemsPage.vue';
import CheckoutDetails from './CheckoutDetailsPage.vue';
import { getTotal } from '../helpers/invoice';

export default {
  components: {
    CheckoutItems,
    CheckoutDetails,
    TeleportWrapper,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();

    const tab = ref('items');
    const invoice = ref();

    const total = computed(() => {
      if (!invoice.value) {
        return 0;
      }

      const { items } = invoice.value;

      const totalAmount = getTotal(items);

      return parseAmount(totalAmount);
    });

    onMounted(() => {
      $q.loading.show();

      api
        .get(`/invoices/${route.params.id}`)
        .then((res) => {
          const { data } = res;

          invoice.value = data;
          $q.loading.hide();
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
  flex: 1;
  display: flex;
  background: linear-gradient(180deg, #3a6145 18.23%, rgba(58, 97, 69, 0) 100%);
}

::v-deep .q-panel {
  height: inherit;
}

::v-deep .q-tab-panel {
  display: flex;
  flex-direction: column;
}

.total {
  flex: 1;
}
</style>
