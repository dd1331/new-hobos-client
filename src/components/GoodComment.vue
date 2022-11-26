<template>
  <v-card class="my-1">
    <v-card-item>
      <div class="d-flex align-center">
        <v-card-title> 댓글 </v-card-title>
        <div class="ml-3">총 {{ store.getComments.length }}개</div>
      </div>
      <div class="d-flex">
        <v-textarea
          label="댓글"
          variant="outlined"
          auto-grow
          rows="3"
          v-model="content"
        ></v-textarea>
        <v-btn class="ml-3" @click="registerComment" icon="mdi-comment"></v-btn>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-list class="border-solid">
      <v-list-item
        v-for="(
          { id, content, createdAt, commenter }, index
        ) in store.getComments"
        :key="index"
        :class="mobile ? 'px-1' : ''"
      >
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
                {{ commenter.nickname }}
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

              <v-chip
                class="mr-1"
                size="x-small"
                density="comfortable"
                color="cyan"
              >
                Tweets
              </v-chip>
            </div>
            <div class="ma-0">
              {{ dayjs(createdAt).fromNow() }}
            </div>
          </div>
          <Menu :items="items" @onEdit="onEdit" @onDelete="onDelete(id)"></Menu>
        </div>
        <v-container class="py-2">
          {{ content }}
        </v-container>
        <div class="d-flex py-2 justify-center">
          <v-btn class="mx-3" color="primary" rounded="lg"> 좋아요 </v-btn>
          <v-btn class="mx-3" color="primary" rounded="lg"> 싫어요 </v-btn>
          <v-btn class="mx-3" color="primary" rounded="lg"> 댓글 </v-btn>
        </div>
        <v-divider
          v-if="store.getComments.length - 1 > index"
          class="my-2"
        ></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import { useCommentStore, type registerCommentPayload } from "@/stores/comment";
import { inject, onBeforeMount, onBeforeUpdate, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import Menu from "./Menu.vue";
const { mobile } = useDisplay();
const items = [
  { title: "수정", onclick: "onEdit" },
  { title: "삭제", onclick: "onDelete" },
];
const dayjs = inject("dayjs");

const props = defineProps<{
  postId: number;
}>();

const content = ref("");

const store = useCommentStore();
async function registerComment() {
  const payload: registerCommentPayload = {
    postId: props.postId,
    content: content.value,
  };

  await store.regsiterComment(payload);
  store.fetchComments(props.postId);
  clear();
}
function onEdit() {
  console.log("dd");
}
async function onDelete(id: number) {
  await store.deleteComment(id);
  store.fetchComments(props.postId);
}
function clear() {
  content.value = "";
}
onBeforeMount(() => {
  store.fetchComments(props.postId);
});
onBeforeUpdate(() => {
  store.fetchComments(props.postId);
});
</script>
