import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

type PostPayload = {
  title: string;
  content: string;
  categoryIds: [number];
};
export interface IPost4List {
  id: number;
  title: string;
  content?: string;
}
export const usePostStore = defineStore("Post", () => {
  const state: { posts: IPost4List[] } = reactive({ posts: [] });
  const getPosts = computed(() => state.posts);
  async function post(payload: PostPayload) {
    return goodAxios.post("post", payload);
  }
  async function fetchPosts() {
    const { data } = await goodAxios.get("post");
    state.posts = data;
  }
  return { post, fetchPosts, getPosts };
});
