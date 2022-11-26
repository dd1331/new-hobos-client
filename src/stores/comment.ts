import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

interface ICommenter {
  nickname: string;
}

export interface IChildComment {
  id: number;
  createdAt: Date;
  content: string;
  commenter: ICommenter;
}

export interface IComment {
  id: number;
  createdAt: Date;
  content: string;
  commenter: ICommenter;
  childComments: IChildComment[];
}

export type registerCommentPayload = {
  postId: number;
  content: string;
};
export type registerChildCommentPayload = registerCommentPayload & {
  commentId: number;
};
export const useCommentStore = defineStore("Comment", () => {
  const state: {
    comments: IComment[];
  } = reactive({ comments: [] });

  async function regsiterComment(payload: registerCommentPayload) {
    const { data } = await goodAxios.post("comment", payload);
  }
  async function registerChildComment(
    commentId: number,
    payload: registerCommentPayload
  ) {
    const { data } = await goodAxios.post("comment/" + commentId, payload);
  }

  async function fetchComments(postId: number) {
    const { data } = await goodAxios.get("comment", { params: { postId } });
    state.comments = data;
  }
  async function deleteComment(commentId: number) {
    const { data } = await goodAxios.delete("comment/" + commentId);
  }
  function resetComments() {
    state.comments = [];
  }

  const getComments = computed(() => state.comments);

  return {
    regsiterComment,
    fetchComments,
    getComments,
    deleteComment,
    registerChildComment,
    resetComments,
  };
});
