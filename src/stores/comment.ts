import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

export interface IComment {
  id: number;
  createdAt: Date;
  content: string;
  commenter: { nickname: string };
}

export type registerCommentPayload = {
  postId: number;
  content: string;
};
export const useCommentStore = defineStore("Comment", () => {
  const state: {
    comments: IComment[];
  } = reactive({ comments: [] });

  async function regsiterComment(payload: registerCommentPayload) {
    const { data } = await goodAxios.post("comment", payload);
  }

  async function fetchComments(postId: number) {
    const { data } = await goodAxios.get("comment", { params: { postId } });
    state.comments = data;
  }

  const getComments = computed(() => state.comments);

  return { regsiterComment, fetchComments, getComments };
});
