<template>
  <GoodCategory></GoodCategory>
  <div class="d-flex justify-space-between">
    <div>
      {{ state.category }}
    </div>
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      @click="$router.push('/poster')"
      color="primary"
    >
      ✏️ 쓰기
    </v-btn>
  </div>
  <PostTable :posts="postStore.getPosts"></PostTable>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import GoodCategory from "../components/GoodCategory.vue";
import PostTable from "../components/PostTable.vue";
import { usePostStore } from "@/stores/post";
const route = useRoute();

const state = reactive({ category: route.query.category });
const postStore = usePostStore();
onBeforeRouteUpdate(async () => {
  state.category = route.query.category as string;
  await postStore.fetchPosts();
});
</script>
