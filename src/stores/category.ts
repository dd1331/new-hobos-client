import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

export enum View {
  SIMPLE = "SIMPLE",
  NORMAL = "NORMAL",
  FANCY = "FANCY",
}
export interface ICategory {
  id: number;
  title: string;
  view: View;
}
export const useCategoryStore = defineStore("Category", () => {
  const state: { categories: ICategory[] } = reactive({
    categories: [],
  });
  const categories = computed(() => state.categories);

  async function fetchCategories() {
    const { data } = await goodAxios.get("category");

    state.categories = data;
  }

  return { categories, fetchCategories };
});
