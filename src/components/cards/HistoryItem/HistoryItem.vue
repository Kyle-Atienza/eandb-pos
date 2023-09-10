<template>
  <button-wrapper @click="$router.replace(data._id)">
    <div class="history-item item row">
      <div class="item__details col">
        <div class="buyer text-h6">{{ data.buyer }}</div>
        <div class="chips">
          <q-chip
            :label="DateTime.fromISO(data.createdAt).toFormat('DD')"
            color="secondary"
            text-color="dark"
          />
          <q-chip :label="itemsCount" color="secondary" text-color="dark" />
        </div>
      </div>
      <div class="item__amount">
        <q-chip :label="parseAmount(data.total)" color="primary" text-color="secondary" />
      </div>
    </div>
  </button-wrapper>
</template>

<script>
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { parseAmount } from 'src/helpers/utils';
import { getTotal } from 'src/helpers/invoice';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper.vue';

export default {
  components: {
    ButtonWrapper,
  },
  props: {
    data: Object,
  },
  setup({ data }) {
    const itemsCount = computed(() => {
      const itemsLength = data.items.length;

      if (itemsLength === 1) {
        return `${data.items.length} item`;
      }
      return `${data.items.length} items`;
    });
    const itemsAmount = computed(() => {
      const totalAmount = getTotal(data.items);

      return parseAmount(totalAmount);
    });

    return {
      DateTime,

      itemsCount,
      itemsAmount,

      parseAmount,
    };
  },
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  width: 100%;
}

.item {
  background-color: $accent;
  padding: 15px;
  border-radius: 20px;

  color: $dark;
  width: 100%;
}

.buyer {
  line-height: 1em;
  text-align: start;
}

.chips {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}
</style>
