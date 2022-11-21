<template>
  <v-card class="my-1">
    <v-card-item>
      <div class="d-flex justify-space-between">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-menu>
          <template v-slot:activator="{ isActive, props }">
            <div
              dark
              icon
              v-bind="props"
              v-on="isActive"
              style="cursor: pointer"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </div>
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
          {{ dayjs(post.createdAt).fromNow() }} ・ 조회 수 4664 ・ 추천 수 15 ・
          댓글 2
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

  <GoodComment :postId="post.id"></GoodComment>
  <GoodCategory class="mt-5"></GoodCategory>
  <SimplePostList
    v-if="mobile"
    :pagination="true"
    :category="'test'"
  ></SimplePostList>
  <PostTable v-else :posts="[]"></PostTable>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import GoodCategory from "../components/GoodCategory.vue";
import GoodComment from "../components/GoodComment.vue";
import PostTable from "../components/PostTable.vue";
import SimplePostList from "../components/SimplePostList.vue";
import { usePostStore, type IPost } from "@/stores/post";
import { computed, inject, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import type { Dayjs } from "dayjs";

const { mobile } = useDisplay();
const dayjs = inject("dayjs") as Dayjs;
const items = [{ title: "수정" }, { title: "삭제" }];
const post = computed(() => usePostStore().getPost as IPost);
const route = useRoute();

onBeforeMount(() => {
  const postId = route.params.id as string;
  usePostStore().fetchPost(Number(postId));
});
</script>
