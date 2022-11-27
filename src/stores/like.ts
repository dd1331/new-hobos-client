import { defineStore } from "pinia";
import goodAxios from "../common/good-axios";
import { API_URL } from "../constants";
export type LikePostPayload = {
  postId: number;
  likerId: number;
};

export const useLikeStore = defineStore("Like", () => {
  async function likePost(postId: number) {
    const { data } = await goodAxios.post(API_URL + "like/post/" + postId);
  }
  async function likeComment(commentId: number) {
    const { data } = await goodAxios.post(
      API_URL + "like/comment/" + commentId
    );
  }
  return { likePost, likeComment };
});
