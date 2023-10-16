<template>
  <p class="q-mb-none text-h6">{{ dateLabel }}</p>
  <q-btn class="self-stretch bg-primary" icon="calendar_month" unelevated flat>
    <q-menu>
      <div class="bg-dark">
        <q-date v-model="date" class="bg-dark" range :options="dateOptions" />
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { formatDate } from 'src/helpers/date';
import { computed, ref, watch } from 'vue';

export default {
  emits: ['update'],
  setup(_, { emit }) {
    const today = computed(() => Date.now());
    const date = ref(formatDate(today.value));
    const dateLabel = computed(() => {
      if (date.value === formatDate(today.value)) {
        return 'Today';
      }
      if (date.value.from && date.value.to) {
        return `${date.value.from} - ${date.value.to}`;
      }
      return '';
    });
    const dateOptions = (calendarDate) => calendarDate <= formatDate(today.value);

    watch(date, () => {
      emit('update');
    });

    return {
      today,
      date,
      dateLabel,
      dateOptions,
    };
  },
};
</script>

<style lang="scss" scoped></style>
