<template>
  <div>
    <v-card
      v-if="post"
      class="my-1"
      :class="mobile ? 'rounded-0' : 'rounded-xl'"
      variant="flat"
    >
      <v-card-item>
        <!-- <div class="d-flex justify-space-between border-solid"> -->
        <v-row>
          <v-col cols="11" sm="11">
            <v-card-title class="text-h6">{{ post.title }}</v-card-title>
            <div class="text-subtitle-2">
              <div class="d-flex align-center">
                {{ post.poster.nickname }}
                <div v-if="post.poster.career">
                  <GoodChip
                    :content="post.poster.career.job.title"
                    color="pink"
                  ></GoodChip>
                  <GoodChip
                    :content="post.poster.career.year + '년차'"
                    color="primary"
                  ></GoodChip>
                </div>
              </div>

              <div class="text-caption">
                {{ dayjs(post.createdAt).fromNow() }} ・ 조회 수
                {{ post.views }} ・ 추천 수
                {{ post.totalLikes }}
              </div>
            </div>
          </v-col>
          <v-col cols="1" sm="1">
            <Menu
              v-if="post.poster.id === useUserStore().getUser?.id"
              :items="items"
              @onEdit="onEdit"
              @onDelete="onDelete(post.id)"
            ></Menu>
          </v-col>
        </v-row>
        <!-- </div> -->
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text class="text-body-1"> {{ post.content }} </v-card-text>

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
      :posts="posts"
      @on-page-clicked="onPageClicked"
    ></SimplePostList>
    <PostTable
      v-else
      :posts="posts"
      :category="currentCategory"
      @on-page-clicked="onPageClicked"
    ></PostTable>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import GoodCategory from "../components/GoodCategory.vue";
import GoodComment from "../components/GoodComment.vue";
import PostTable from "../components/PostTable.vue";
import GoodChip from "@/components/GoodChip.vue";
import SimplePostList from "../components/SimplePostList.vue";
import { usePostStore, type IPost } from "@/stores/post";
import { computed, inject, onBeforeMount, ref } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import type { Dayjs } from "dayjs";
import { useCategoryStore, type ICategory } from "@/stores/category";
import Menu from "@/components/Menu.vue";
import router from "@/router";
import Like from "@/components/Like.vue";
import { useUserStore } from "@/stores/user";
import { useLikeStore } from "@/stores/like";
const store = usePostStore();
function onPageClicked(page: number) {
  store.fetchPostsByCategory(currentCategory.value.id, page);
}

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
const posts = computed(() => store.getPosts);
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
  if (!posts.value.length) {
    await store.fetchPostsByCategory(Number(categoryId.value));
  }
  const postId = route.params.id as string;
  store.fetchPost(Number(postId));
});
onBeforeRouteUpdate(async (to) => {
  const postId = to.params.id;
  if (postId) store.fetchPost(Number(postId));
});
onBeforeRouteLeave(() => {
  store.resetPost();
});
</script>
