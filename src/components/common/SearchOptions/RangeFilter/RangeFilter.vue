<template>
  <q-expansion-item
    v-bind="$attrs"
    class="range-filter q-pa-none"
    header-class="range-filter__header"
  >
    <template v-slot:header>
      <q-item-section>{{ label }}</q-item-section>
      <q-item-section side>
        <div class="flex q-gutter-sm">
          <div v-if="date">
            <div v-if="!isDefault" class="row items-center">
              <q-chip color="primary" text-color="secondary">{{ from || 'From' }}</q-chip>
              <q-icon class="q-mx-sm" size="xs" name="horizontal_rule" color="secondary" />
              <q-chip color="primary" text-color="secondary">{{ to || 'To' }}</q-chip>
            </div>
            <div v-else class="row items-center">
              <q-chip color="primary" text-color="secondary">{{
                isToday ? 'Today' : 'All'
              }}</q-chip>
            </div>
          </div>
          <div v-else class="row items-center">
            <q-chip color="primary" text-color="secondary">{{ min || 'Min' }}</q-chip>
            <q-icon class="q-mx-sm" size="xs" name="horizontal_rule" color="secondary" />
            <q-chip color="primary" text-color="secondary">{{ max || 'Max' }}</q-chip>
          </div>
          <!-- <div>
            <q-chip @click.self="reset()" color="primary" text-color="secondary">Reset</q-chip>
          </div> -->
        </div>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section class="q-pt-none">
        <div v-if="date" class="row q-gutter-x-md items-center">
          <outlined-text-input
            class="col no-pointer-events"
            label="From"
            placeholder="1"
            v-model="from"
          />
          <outlined-text-input
            class="col no-pointer-events"
            label="To"
            placeholder="20"
            v-model="to"
          />
          <q-btn class="self-stretch bg-primary" icon="calendar_month" unelevated flat>
            <q-menu class="bg-dark flex column">
              <div>
                <q-date
                  v-model="dateRange"
                  class="bg-dark no-shadow"
                  range
                  today-btn
                  @update:model-value="onUpdateCal"
                />
              </div>
              <q-btn
                class="self-stretch bg-negative q-mx-md q-mb-md"
                label="Reset"
                color=""
                unelevated
                flat
                @click="dateRange = { from: '', to: '' }"
              />
            </q-menu>
          </q-btn>
        </div>
        <div v-else class="row q-gutter-md items-center">
          <outlined-text-input
            class="col"
            label="Min"
            placeholder="1"
            type="number"
            v-model="min"
          />
          <q-icon v-if="!date" size="md" name="horizontal_rule" />
          <outlined-text-input
            class="col"
            label="Max"
            placeholder="20"
            type="number"
            v-model="max"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';

import OutlinedTextInput from 'src/components/forms/input/OutlinedTextInput/OutlinedTextInput.vue';
import { formatDate } from 'src/helpers/date';
// import { formatDate } from 'src/helpers/date';

export default {
  components: {
    OutlinedTextInput,
  },
  emits: ['update', 'update:modelValue'],
  props: {
    label: String,
    date: Boolean,
    modelValue: Object,
  },
  setup(props, { emit }) {
    const min = ref();
    const max = ref();
    const dateRange = ref({ from: null, to: null });
    const isToday = ref(false);

    const transformDate = (inputDate) => {
      const parts = inputDate.split('/');
      const year = parts[0].substring(2); // Get the last 2 digits of the year
      const month = parts[1];
      const day = parts[2];

      return `${month}/${day}/${year}`;
    };

    const from = computed(() => (dateRange.value.from ? transformDate(dateRange.value.from) : ''));
    const to = computed(() => (dateRange.value.to ? transformDate(dateRange.value.to) : ''));
    const isDefault = computed(() => !from.value && !to.value);

    watch([min, max, from, to], () => {
      let updatedValue = {};
      if (props.date) {
        updatedValue = {
          from: dateRange.value.from,
          to: dateRange.value.to,
        };
      } else {
        updatedValue = {
          min: min.value,
          max: max.value,
        };
      }
      emit('update:modelValue', updatedValue);
    });

    onMounted(() => {
      // TODO: implement modelvalue to each range
      if (props.date) {
        dateRange.value.from = props.modelValue.from;
        dateRange.value.to = props.modelValue.to;
      } else {
        min.value = props.modelValue.min;
        max.value = props.modelValue.max;
      }
    });

    const reset = () => {
      min.value = 0;
      max.value = 0;
      dateRange.value = { from: null, to: null };
    };

    const onUpdateCal = (e) => {
      isToday.value = e === formatDate(new Date());
    };

    return {
      min,
      max,
      from,
      to,
      isDefault,
      dateRange,
      isToday,
      onUpdateCal,
      reset,
    };
  },
};
</script>

<style lang="scss" scoped>
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

/* ::v-deep .q-item-type {
  padding: 0;
  min-height: 0;
} */
</style>
