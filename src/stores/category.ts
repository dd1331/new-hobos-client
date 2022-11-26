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
  const state: { categories: ICategory[]; currentCategory: ICategory } =
    reactive({
      categories: [],
      currentCategory: {} as ICategory,
    });
  const categories = computed(() => state.categories);
  const currentCategory = computed(() => state.currentCategory);

  async function fetchCategories(currentCategoryId?: number) {
    const { data } = await goodAxios.get("category");

    state.categories = data;
    state.currentCategory = getCurrentCategory(
      currentCategoryId || state.categories[0].id
    );
  }
  function getCurrentCategory(currentCategoryId: number) {
    return categories.value.find(
      (category) => category.id === currentCategoryId
    ) as ICategory;
  }
  function setCurrentCategory(id: number) {
    state.currentCategory = getCurrentCategory(id);
  }
  return { categories, fetchCategories, currentCategory, setCurrentCategory };
});
