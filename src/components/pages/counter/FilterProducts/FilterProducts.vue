<template>
  <q-btn class="filter" @click="modal = !modal" round outline icon="filter_list" />
  <q-dialog v-model="modal">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6 col">Filter Items</div>
        <q-btn @click="reset" class="reset" unelevated color="secondary" text-color="black">
          <div style="font-size: 1em">Reset</div>
        </q-btn>
      </q-card-section>

      <q-card-section class="categories">
        <div class="category">
          <div class="category__name">Brand</div>
          <div class="category__pills pills">
            <q-btn
              v-for="(pill, index) in samplePills"
              :key="index"
              :outline="!isSelected(pill)"
              class="category__pill"
              unelevated
              color="secondary"
              :text-color="!isSelected(pill) ? 'secondary' : 'black'"
              @click="onClickFilter(pill)"
            >
              <div style="font-size: 1.5em">{{ pill }}</div>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="col" unelevated label="Done" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup(_, { emit }) {
    const modal = ref(false);
    const brand = ref([]);
    const filter = reactive({
      brand: [],
    });

    const samplePills = ref(['E and B Farm', 'Three K', 'NutriPage']);

    const isSelected = (name) => filter.brand.includes(name);
    const onClickFilter = (name) => {
      if (isSelected(name)) {
        filter.brand = filter.brand.filter((item) => item !== name);
      } else {
        filter.brand.push(name);
      }
      emit('onFilter', filter);
    };

    const reset = () => {
      filter.brand = [];
    };

    return {
      filter,
      modal,
      brand,
      samplePills,

      onClickFilter,
      isSelected,
      reset,
    };
  },
};
</script>

<style lang="scss" scoped>
.category {
  &__name {
    font-weight: 500;
    font-size: 1.1rem;
  }

  &__pills {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__pill {
    font-size: 0.6rem;
    height: 32px;
  }
}
</style>
