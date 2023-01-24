<template>
  <!-- <GoodCategory v-if="!mobile"></GoodCategory> -->
  <div class="d-flex justify-space-between ma-3">
    <div class="d-flex align-center">
      {{ currentCategory?.title }}
    </div>
    <GoodButton
      @click="
        $router.push({
          name: 'Poster',
          query: { category: currentCategory.id },
        })
      "
      text="✏️"
      size="small"
    >
    </GoodButton>
  </div>
  <SimplePostList
    v-if="currentCategory?.view === View.SIMPLE"
    :category="currentCategory"
    :posts="postStore.getPosts"
    :title="false"
  ></SimplePostList>
  <FancyPostList
    v-else-if="mobile || currentCategory?.view === View.FANCY"
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
import PostTable from "../components/PostTable.vue";
import { usePostStore } from "@/stores/post";
import { useCategoryStore, type ICategory, View } from "@/stores/category";
import { useDisplay } from "vuetify/lib/framework.mjs";
import FancyPostList from "@/components/FancyPostList.vue";
import SimplePostList from "@/components/SimplePostList.vue";
import GoodButton from "@/components/GoodButton.vue";

const route = useRoute();
const { mobile } = useDisplay();
const emit = defineEmits(["popSnackbar"]);

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
