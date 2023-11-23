<template>
  <div class="choice-filter q-pa-md flex">
    <p class="q-mb-none text-subtitle1">{{ label }}</p>
    <div class="choices q-mt-sm full-width">
      <q-chip
        v-for="({ name, selected }, index) in choices"
        :key="index"
        :label="name"
        clickable
        :color="selected ? 'primary' : 'secondary'"
        :text-color="selected ? 'secondary' : 'dark'"
        @click="onSelect(index)"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  props: {
    modelValue: Array,
    multiple: Boolean,
    label: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const choices = ref([]);

    const onSelect = (selectedIndex) => {
      if (props.multiple) {
        choices.value[selectedIndex].selected = !choices.value[selectedIndex].selected;
      } else {
        choices.value = choices.value.map((choice, index) => {
          if (index === selectedIndex) {
            return {
              ...choice,
              selected: true,
            };
          }
          return {
            ...choice,
            selected: false,
          };
        });
      }

      emit('update:modelValue', choices.value);
    };

    onMounted(() => {
      choices.value = props.modelValue;
    });

    return {
      choices,

      onSelect,
    };
  },
};
</script>

<style lang="scss" scoped>
.choice-filter {
  background: darken($dark, 5);
  border-radius: 15px;
}

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
