<template>
  <div class="mb-3">
    <v-btn
      v-for="category in useCategoryStore().categories"
      :key="category.id"
      class="mr-2 mb-2"
      rounded="lg"
      variant="flat"
      height="35"
      :color="category.id === state.categoryId ? 'primary' : 'grey'"
      @click="toCategoryPostList(category.id)"
      >{{ category.title }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useCategoryStore } from "@/stores/category";
import { onMounted, reactive } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const state = reactive({ categoryId: 0 });
async function toCategoryPostList(categoryId: number) {
  router.push({ path: "/post", query: { category: categoryId } });
}

onMounted(async () => {
  state.categoryId = Number(route.query.category);
});
onBeforeRouteUpdate(async (to) => {
  state.categoryId = Number(to.query.category);
});
</script>
