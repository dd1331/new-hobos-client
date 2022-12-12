<template>
  <div class="mb-3">
    <GoodButton
      v-for="category in useCategoryStore().categories"
      :key="category.id"
      class="mr-2 mb-2"
      :color="category.id === state.categoryId ? 'primary' : 'grey'"
      @click="toCategoryPostList(category.id)"
      :text="category.title"
    >
      >
    </GoodButton>
  </div>
</template>

<script lang="ts" setup>
import { useCategoryStore } from "@/stores/category";
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import GoodButton from "./GoodButton.vue";
const router = useRouter();
const route = useRoute();
const state: { categoryId: number } = reactive({
  categoryId: computed(() => Number(route.query.category) as number),
});
async function toCategoryPostList(categoryId: number) {
  router.push({ path: "/post", query: { category: categoryId } });
}
</script>
