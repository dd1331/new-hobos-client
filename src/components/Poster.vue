<template>
  <v-card min-height="800">
    <v-container class="text-sm-h4 text-h6">글쓰기</v-container>
    <v-divider />
    <v-container v-if="categories.length" class="d-flex mb-3">
      <select
        v-model="state.categoryId"
        class="pa-2 w-25"
        style="border-radius: 12px; border: 1px solid"
      >
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.title }}
        </option>
      </select>
      <div class="w-100 ml-1">
        <input
          v-model="state.title"
          placeholder="제목"
          class="w-100 pa-2 pl-4"
          style="border-radius: 12px; border: 1px solid"
        />
      </div>
    </v-container>

    <v-container>
      <v-textarea
        v-model="state.content"
        variant="outlined"
        hide-details
      ></v-textarea>
    </v-container>
    <v-container class="d-flex justify-center">
      <v-btn class="ma-2" rounded="lg" @click="registerPost">확인</v-btn>
      <v-btn class="ma-2" rounded="lg" @click="$router.back()">취소</v-btn>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { usePostStore } from "../stores/post";
import { useCategoryStore } from "@/stores/category";

const postStore = usePostStore();
const categoryStore = useCategoryStore();

const router = useRouter();
const categories = computed(() => categoryStore.categories);
const categoryId = computed({
  get: () => {
    return categoryStore.currentCategory.id;
  },
  set(v) {
    categoryStore.setCurrentCategory(v);
    return v;
  },
});
const state = reactive({ categoryId: categoryId, title: "", content: "" });
const registerPost = async () => {
  const post = await postStore.post({
    title: state.title,
    content: state.content,
    categoryIds: [state.categoryId],
  });
  router.push({
    name: "Post",
    params: { id: post.id },
    query: { category: state.categoryId },
  });
};
onBeforeMount(async () => {
  postStore.resetPosts();
  await postStore.fetchPost(Number(useRoute().params.id));
  const post = postStore.getPost;
  if (!post) return;
  state.title = post.title;
  state.content = post.title;
});
onBeforeRouteLeave(async () => {
  await postStore.fetchPostsByCategory(categoryId.value);
});
onMounted(() => {});
</script>
