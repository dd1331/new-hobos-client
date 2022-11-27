<template>
  <div>
    <v-card v-if="post" class="my-1">
      <v-card-item>
        <div class="d-flex justify-space-between">
          <v-card-title>{{ post.title }}</v-card-title>

          <Menu
            v-if="post.poster.id === useUserStore().getUser?.id"
            :items="items"
            @onEdit="onEdit"
            @onDelete="onDelete(post.id)"
          ></Menu>
        </div>
        <v-card-subtitle>
          <div>{{ post.poster.nickname }}</div>

          <div>
            {{ dayjs(post.createdAt).fromNow() }} ・ 조회 수 4664 ・ 추천 수 15
          </div>
        </v-card-subtitle>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text> {{ post.content }} </v-card-text>

      <Like
        :liked="post.liked"
        @on-like="like"
        :totalLikes="post.totalLikes"
      ></Like>
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
import Menu from "@/components/Menu.vue";
import router from "@/router";
import Like from "@/components/Like.vue";
import { useUserStore } from "@/stores/user";
import { useLikeStore } from "@/stores/like";
const store = usePostStore();

const items = [
  { title: "수정", onclick: "onEdit" },
  { title: "삭제", onclick: "onDelete" },
];

const { mobile } = useDisplay();
const dayjs = inject("dayjs") as Dayjs;
const post = computed(() => store.getPost as IPost);
const route = useRoute();
const categoryId = ref(route.query.category);
const currentCategory = computed(
  () =>
    useCategoryStore().categories.find(
      (category) => category.id === Number(categoryId.value)
    ) as ICategory
);
const state: { posts: IPost4List[] } = reactive({ posts: store.getPosts });
function onEdit() {
  router.push({
    name: "Poster",
    params: { id: post.value.id },
    query: { category: categoryId.value },
  });
}
async function onDelete(id: number) {
  await store.deletePost(id);
  router.back();
}
function like() {
  const id = post.value.id;
  useLikeStore().likePost(id);
  const liked = post.value.liked;
  if (liked) post.value.totalLikes -= 1;
  if (!liked) post.value.totalLikes += 1;
  post.value.liked = !liked;
}

onBeforeMount(async () => {
  const categoryId = ref(route.query.category);
  if (!state.posts.length) {
    await store.fetchPostsByCategory(Number(categoryId.value));
  }
  state.posts = store.getPosts;
  const postId = route.params.id as string;
  store.fetchPost(Number(postId));
});
onBeforeRouteUpdate(async (to) => {
  const postId = to.params.id;
  if (postId) store.fetchPost(Number(postId));
});
</script>
