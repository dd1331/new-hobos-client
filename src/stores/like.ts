import { defineStore } from "pinia";
import goodAxios from "../common/good-axios";
export type LikePostPayload = {
  postId: number;
  likerId: number;
};

export const useLikeStore = defineStore("Like", () => {
  async function likePost(postId: number) {
    const { data } = await goodAxios.post("like/post/" + postId);
  }
  async function likeComment(commentId: number) {
    const { data } = await goodAxios.post("like/comment/" + commentId);
  }
  return { likePost, likeComment };
});
