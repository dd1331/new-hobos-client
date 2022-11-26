<template>
  <GoodCategory></GoodCategory>
  <div class="d-flex justify-space-between">
    <div>
      {{ currentCategory?.title }}
    </div>
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      @click="
        $router.push({
          name: 'Poster',
          query: { category: currentCategory.id },
        })
      "
      color="primary"
      rounded="lg"
    >
      ✏️
    </v-btn>
  </div>
  <FancyPostList
    v-if="mobile || currentCategory?.view === View.FANCY"
    :posts="postStore.getPosts"
    :category="currentCategory"
    @on-page-clicked="onPageClicked"
  ></FancyPostList>
  <PostTable
    v-else
    :posts="postStore.getPosts"
    :category="currentCategory"
    @on-page-clicked="onPageClicked"
  ></PostTable>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import GoodCategory from "../components/GoodCategory.vue";
import PostTable from "../components/PostTable.vue";
import { usePostStore } from "@/stores/post";
import { useCategoryStore, type ICategory, View } from "@/stores/category";
import { useDisplay } from "vuetify/lib/framework.mjs";
import FancyPostList from "@/components/FancyPostList.vue";

const route = useRoute();
const { mobile } = useDisplay();

const state = reactive({ categoryId: 0 });
const postStore = usePostStore();
const currentCategory = computed(
  () =>
    useCategoryStore().categories.find(
      (category) => category.id === Number(state.categoryId)
    ) as ICategory
);

onBeforeRouteUpdate(async (to) => {
  state.categoryId = Number(to.query.category);
  await postStore.fetchPostsByCategory(state.categoryId);
});

onMounted(async () => {
  state.categoryId = Number(route.query.category);
  await postStore.fetchPostsByCategory(state.categoryId);
});
function onPageClicked(page: number) {
  postStore.fetchPostsByCategory(state.categoryId, page);
}
</script>
