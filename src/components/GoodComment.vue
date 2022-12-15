})
<template>
  <v-card
    class="my-1"
    :class="mobile ? 'rounded-0' : 'rounded-xl'"
    variant="flat"
  >
    <v-card-item>
      <div class="d-flex align-center text-title-1">
        <div>댓글</div>
        <div class="ml-3 text-body-2">총 {{ store.getComments.total }}개</div>
      </div>

      <CommentInput @register-comment="registerComment"></CommentInput>
    </v-card-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        class="px-2"
        v-for="(comment, index) in store.getComments.comments"
        :key="comment.id"
      >
        <CommentList
          :comment="comment"
          :index="index"
          :postId="postId"
          @toggle-comment-input="toggleCommentInput"
        ></CommentList>

        <div class="mx-1" v-if="comment.id === activeId">
          <CommentInput @register-comment="registerChildComment"></CommentInput>
        </div>
        <v-list class="pa-0" :class="mobile ? 'ml-5' : 'ml-5'">
          <v-list-item
            v-for="(childComment, index2) in comment.childComments"
            :key="childComment.id"
          >
            <CommentList
              :comment="childComment"
              :index="index2"
              :postId="postId"
              @toggle-comment-input="toggleCommentInput"
            ></CommentList>
          </v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import { useCommentStore, type registerCommentPayload } from "@/stores/comment";
import { onBeforeMount, onBeforeUpdate, ref } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import CommentInput from "./CommentInput.vue";
import CommentList from "./CommentList.vue";
const { mobile } = useDisplay();

const props = defineProps<{
  postId: number;
}>();

const store = useCommentStore();
async function registerChildComment(content: string) {
  const commentId = activeId.value;
  const payload: registerCommentPayload = {
    postId: props.postId,
    content: content,
  };

  await store.registerChildComment(commentId, payload);
  store.fetchComments(props.postId);
  toggleCommentInput(-1);
}
async function registerComment(content: string) {
  const payload: registerCommentPayload = {
    postId: props.postId,
    content: content,
  };

  await store.regsiterComment(payload);
  store.fetchComments(props.postId);
}
const activeId = ref(-1);
function toggleCommentInput(id: number) {
  activeId.value = id;
}
// function onEdit() {
//   console.log("dd");
// }

onBeforeMount(() => {
  store.fetchComments(props.postId);
});
onBeforeUpdate(() => {
  store.fetchComments(props.postId);
});
onBeforeRouteLeave(() => {
  store.resetComments();
});
onBeforeRouteUpdate((to) => {
  const postId = to.params.id;
  if (postId) store.fetchComments(Number(postId));
});
</script>
