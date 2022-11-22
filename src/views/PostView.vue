<template>
  <div>
    <v-card v-if="post" class="my-1">
      <v-card-item>
        <div class="d-flex justify-space-between">
          <v-card-title>{{ post.title }}</v-card-title>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
                style="cursor: pointer"
              ></v-btn>
            </template>

            <v-list
              density="compact"
              class="pa-0"
              elevation="2"
              style="cursor: pointer"
            >
              <v-list-item v-for="(item, i) in items" :key="i" class="py-0">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-card-subtitle>
          <div>보리쌀</div>
          <div>
            {{ dayjs(post.createdAt).fromNow() }} ・ 조회 수 4664 ・ 추천 수 15
          </div>
        </v-card-subtitle>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text> {{ post.content }} </v-card-text>
      <div class="d-flex justify-center mb-5">
        <v-btn class="mx-3" rounded="lg" color="primary"> 좋아요 </v-btn>
        <v-btn class="mx-3" rounded="lg" color="primary"> 싫어요 </v-btn>
      </div>
    </v-card>
    <GoodComment v-if="post" :postId="post.id"></GoodComment>
    <GoodCategory class="mt-5"></GoodCategory>
    <SimplePostList
      v-if="mobile"
      :pagination="true"
      :category="currentCategory"
      :posts="state.posts"
    ></SimplePostList>
    <PostTable
      v-else
      :posts="state.posts"
      :category="currentCategory"
    ></PostTable>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import GoodCategory from "../components/GoodCategory.vue";
import GoodComment from "../components/GoodComment.vue";
import PostTable from "../components/PostTable.vue";
import SimplePostList from "../components/SimplePostList.vue";
import { usePostStore, type IPost, type IPost4List } from "@/stores/post";
import { computed, inject, onBeforeMount, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import type { Dayjs } from "dayjs";
import { useCategoryStore, type ICategory } from "@/stores/category";
import router from "@/router";

const { mobile } = useDisplay();
const dayjs = inject("dayjs") as Dayjs;
const items = [{ title: "수정" }, { title: "삭제" }];
const post = computed(() => usePostStore().getPost as IPost);
const route = useRoute();
const categoryId = ref(route.query.categoryId);
const currentCategory = computed(
  () =>
    useCategoryStore().categories.find(
      (category) => category.id === Number(categoryId)
    ) as ICategory
);
const state: { posts: IPost4List[] } = reactive({ posts: [] });

onBeforeMount(async () => {
  const categoryId = route.query.categoryId;
  if (!state.posts.length) {
    await usePostStore().fetchPostsByCategory(Number(categoryId));
  }
  state.posts = usePostStore().getPosts;
  const postId = route.params.id as string;
  usePostStore().fetchPost(Number(postId));
});
</script>
