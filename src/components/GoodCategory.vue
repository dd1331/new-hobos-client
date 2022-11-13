<template>
  <div class="mb-3">
    <v-btn
      v-for="category in useCategoryStore().categories"
      :key="category.id"
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px; opacity: 90%"
      @click="toCategoryPostList(category.id)"
      color="primary"
      >{{ category.title }}</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { useCategoryStore } from "@/stores/category";
import { usePostStore } from "@/stores/post";
import { useRouter } from "vue-router";
const postStore = usePostStore();
const router = useRouter();
async function toCategoryPostList(categoryId: number) {
  await postStore.fetchPostsByCategory(categoryId);
  router.push({ path: "/post", query: { category: categoryId } });
}
</script>
