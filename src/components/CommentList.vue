<template>
  <div class="d-flex">
    <v-avatar size="36px" class="ma-2">
      <v-img
        alt="Avatar"
        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
      ></v-img>
    </v-avatar>
    <div class="mr-auto">
      <v-container class="py-0 px-1">
        <div class="d-flex align-center">
          <div class="mr-2">
            {{ comment.commenter.nickname }}
          </div>
          <div v-if="comment.commenter.career">
            <v-chip
              class="mr-1"
              size="x-small"
              color="pink"
              density="comfortable"
              text-color="white"
            >
              {{ comment.commenter.career.job.title }}
            </v-chip>

            <v-chip
              class="mr-1"
              size="x-small"
              density="comfortable"
              color="primary"
            >
              {{ comment.commenter.career.year }}년차
            </v-chip>
          </div>
        </div>
        <div class="ma-0">
          {{ dayjs(comment.createdAt).fromNow() }}
        </div>
        <div>
          {{ comment.content }}
        </div>
      </v-container>
      <div class="d-flex justify-start ml-n2">
        <Like
          @on-like="like"
          :liked="liked"
          :totalLikes="totalLikes"
          :size="mobile ? 'small' : 'large'"
        ></Like>
        <v-btn
          v-if="'childComments' in comment"
          icon="mdi-comment-outline"
          variant="text"
          :size="mobile ? 'small' : 'large'"
          @click="$emit('toggleCommentInput', comment.id)"
        >
        </v-btn>
      </div>
    </div>
    <Menu
      v-if="comment.commenter.id === useUserStore().getUser?.id"
      :items="items"
      @onEdit="onEdit"
      @onDelete="onDelete(comment.id)"
    ></Menu>
  </div>
  <v-divider class="my-2"></v-divider>
</template>

<script setup lang="ts">
import {
  useCommentStore,
  type IChildComment,
  type IComment,
} from "@/stores/comment";
import Like from "@/components/Like.vue";
import { useLikeStore } from "@/stores/like";
import { useUserStore } from "@/stores/user";
import { inject, ref } from "vue";
import Menu from "./Menu.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const { mobile } = useDisplay();
const store = useCommentStore();
const dayjs = inject("dayjs");
defineEmits(["toggleCommentInput"]);
function like() {
  const id = props.comment.id;
  useLikeStore().likeComment(id);
  if (liked.value) totalLikes.value -= 1;
  if (!liked.value) totalLikes.value += 1;
  liked.value = !liked.value;
}

function onEdit() {
  console.log("dd");
}
const props = defineProps<{
  comment: IComment | IChildComment;
  index: number;
  postId: number;
}>();
const totalLikes = ref(props.comment.totalLikes);
const liked = ref(!!props.comment.liked);

async function onDelete(id: number) {
  await store.deleteComment(id);
  store.fetchComments(props.postId);
}
const items = [
  { title: "수정", onclick: "onEdit" },
  { title: "삭제", onclick: "onDelete" },
];
</script>
