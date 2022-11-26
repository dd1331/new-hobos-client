<template>
  <div class="d-flex">
    <v-avatar size="36px" class="ma-2">
      <v-img
        alt="Avatar"
        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
      ></v-img>
    </v-avatar>
    <div class="mr-auto">
      <div class="d-flex align-center">
        <div class="mr-2">
          {{ comment.commenter.nickname }}
        </div>
        <v-chip
          class="mr-1"
          size="x-small"
          color="pink"
          density="comfortable"
          text-color="white"
        >
          Tags
        </v-chip>

        <v-chip
          class="mr-1"
          size="x-small"
          density="comfortable"
          color="primary"
        >
          Leider
        </v-chip>

        <v-chip class="mr-1" size="x-small" density="comfortable" color="cyan">
          Tweets
        </v-chip>
      </div>
      <div class="ma-0">
        {{ dayjs(comment.createdAt).fromNow() }}
      </div>
    </div>
    <Menu
      :items="items"
      @onEdit="onEdit"
      @onDelete="onDelete(comment.id)"
    ></Menu>
  </div>
  <v-container class="py-2">
    {{ comment.content }}
  </v-container>
  <div class="d-flex py-2 justify-center">
    <v-btn class="mx-3" color="primary" rounded="lg" size="small">
      좋아요
    </v-btn>
    <v-btn class="mx-3" color="primary" rounded="lg" size="small">
      싫어요
    </v-btn>
    <v-btn
      v-if="'childComments' in comment"
      class="mx-3"
      color="primary"
      rounded="lg"
      size="small"
      @click="$emit('toggleCommentInput', comment.id)"
    >
      댓글
    </v-btn>
  </div>
  <v-divider class="my-2"></v-divider>
</template>

<script setup lang="ts">
import {
  useCommentStore,
  type IChildComment,
  type IComment,
} from "@/stores/comment";
import { inject } from "vue";
import Menu from "./Menu.vue";

const store = useCommentStore();
const dayjs = inject("dayjs");
defineEmits(["toggleCommentInput"]);

function onEdit() {
  console.log("dd");
}
const props = defineProps<{
  comment: IComment | IChildComment;
  index: number;
  postId: number;
}>();

async function onDelete(id: number) {
  await store.deleteComment(id);
  store.fetchComments(props.postId);
}
const items = [
  { title: "수정", onclick: "onEdit" },
  { title: "삭제", onclick: "onDelete" },
];
</script>
