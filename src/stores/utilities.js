import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUtilitiesStore = defineStore('utilities', () => {
  const isLoading = ref(false);

  return { isLoading };
});
