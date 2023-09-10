<template>
  <header-layout label="Checkout" />
  <q-page>
    <page-wrapper>
      <router-view></router-view>
    </page-wrapper>
  </q-page>
  <Teleport v-if="mounted" to=".footer-slot">
    <div v-if="!$route.path.includes('success')" class="footer">
      <div class="footer__amount">
        <p class="footer__amount--label text-subtitle2">Grand Total:</p>
        <h2 class="text-h4">{{ parseAmount(getTotal(invoice.items)) }}</h2>
      </div>
      <div class="footer__actions">
        <q-btn
          @click="action().click"
          class="footer__action"
          unelevated
          color="dark"
          size="lg"
          :label="action().label"
        />
      </div>
    </div>
  </Teleport>

  <alert-popup ref="popupRef" />
</template>

<script>
import { onMounted, ref } from 'vue';

import { useInvoiceStore } from 'src/stores/invoice';

import { parseAmount } from 'src/helpers/utils';
import { getTotal } from 'src/helpers/invoice';

import HeaderLayout from 'src/components/common/Header/HeaderLayout.vue';
import PageWrapper from 'src/components/common/PageWrapper/PageWrapper.vue';
import AlertPopup from 'src/components/common/AlertPopup/AlertPopup.vue';

import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  components: {
    PageWrapper,
    HeaderLayout,
    AlertPopup,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const invoice = useInvoiceStore();
    const $q = useQuasar();

    const mounted = ref(false);

    const popupRef = ref(null);

    const createInvoice = () => {
      $q.loading.show();
      invoice
        .create()
        .then(() => {
          invoice.reset();
          router.replace('success');
        })
        .catch((err) => {
          if (err.message && err.response) {
            popupRef.value.open(err.response.data.error._message, err.response.data.error.message, [
              {
                label: 'OK',
                action: () => popupRef.value.close(),
              },
            ]);
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          $q.loading.hide();
        });
    };

    const action = () => {
      switch (route.path) {
        case '/checkout/items':
          return {
            click: () => router.replace('details'),
            label: 'Fill-up details',
          };
        case '/checkout/details':
          return {
            click: () => {
              createInvoice();
            },
            label: 'Finish Order',
          };

        default:
          return {};
      }
    };

    onMounted(() => {
      mounted.value = true;

      if (invoice.isEmpty) {
        router.push('/counter');
      }
    });

    return {
      invoice,

      mounted,

      popupRef,
      createInvoice,
      action,

      parseAmount,
      getTotal,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 20px;
  border-radius: 20px 20px 0px 0px;
  overflow: hidden;
  background: $primary;

  display: flex;
  gap: 20px;

  &__amount {
    flex: 1;

    & > * {
      margin: 0;
    }
  }

  &__actions {
    flex: 1;
  }

  &__action {
    border-radius: 15px;
    width: 100%;
    height: 100%;
  }
}
</style>
