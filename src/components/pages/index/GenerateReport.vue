<template>
  <q-btn unelevated size="lg" color="secondary" text-color="dark" @click="dialog = true">
    <span class="flex items-center justify-between full-width">
      Generate Report
      <q-icon name="summarize" size="sm" />
    </span>
  </q-btn>

  <q-dialog persistent v-model="dialog">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">Generate Report</div>
        <q-btn icon="close" round color="negative" size="sm" unelevated @click="dialog = false" />
      </q-card-section>

      <q-card-section class="border-bottom main-section">
        <range-filter group="history-filter" label="Date" v-model="rangeDate" date />
        <outlined-text-input
          label="Recipient"
          v-model="recipient"
          :rules="[(val) => !!val || '']"
        />
      </q-card-section>

      <q-card-actions class="row">
        <q-btn
          class="col"
          unelevated
          color="negative"
          size="md"
          label="Cancel"
          @click="dialog = false"
        />
        <q-btn
          class="col"
          unelevated
          color="primary"
          size="md"
          label="Generate"
          @click="onSendReport"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <alert-popup ref="alertPopup" />
</template>

<script>
import RangeFilter from 'src/components/common/SearchOptions/RangeFilter/RangeFilter.vue';
import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import AlertPopup from 'src/components/common/AlertPopup/AlertPopup.vue';

import { computed, ref } from 'vue';
import { isObjectUnfilled } from 'src/helpers/utils';
import { api } from 'src/boot/axios';

import { useQuasar } from 'quasar';

export default {
  components: {
    RangeFilter,
    OutlinedTextInput,
    AlertPopup,
  },
  setup() {
    const $q = useQuasar();

    const dialog = ref(false);
    const alertPopup = ref(false);

    const recipient = ref('');

    const rangeDate = ref({
      from: '',
      to: '',
    });

    const requestParams = computed(() => {
      const params = new URLSearchParams({
        date_min: rangeDate.value.from,
        date_max: rangeDate.value.to,
        recipient: recipient.value,
      });
      return params;
    });

    const generateReport = () => {};

    const onSendReport = () => {
      if (!recipient.value || isObjectUnfilled(rangeDate.value)) {
        alertPopup.value.open('Incomplete Details', 'Please provide all details', [
          {
            label: 'OK',
            action: () => {
              alertPopup.value.close();
            },
          },
        ]);
      } else {
        $q.loading.show();

        api({
          url: '/reports/invoice',
          params: requestParams.value,
        })
          .then((res) => {
            console.log(res);
            alertPopup.value.open('Report Generated', res.data.message, [
              {
                label: 'OK',
                action: () => {
                  alertPopup.value.close();
                },
              },
            ]);
          })
          .catch((e) => console.log(e))
          .finally(() => {
            $q.loading.hide();
          });
      }
    };

    return {
      dialog,
      alertPopup,
      rangeDate,
      recipient,

      generateReport,
      onSendReport,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
