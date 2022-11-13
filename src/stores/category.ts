import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

export interface ICategory {
  id: number;
  title: number;
}
export const useCategoryStore = defineStore("Category", () => {
  const state: { categories: ICategory[] } = reactive({
    categories: [],
  });
  const categories = computed(() => state.categories);

  async function fetchCategory() {
    const { data } = await goodAxios.get("category");

    state.categories = data;
  }

  return { categories, fetchCategory };
});
