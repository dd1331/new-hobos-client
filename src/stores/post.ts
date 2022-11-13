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
  createdAt: Date;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
export const usePostStore = defineStore("Post", () => {
  const state: { posts: IPost4List[]; post: IPost | null } = reactive({
    posts: [],
    post: null,
  });
  const getPosts = computed(() => state.posts);
  const getPost = computed(() => state.post);
  async function post(payload: PostPayload) {
    return goodAxios.post("post", payload);
  }
  async function fetchPosts() {
    const { data } = await goodAxios.get("post");
    state.posts = data;
  }
  async function fetchPostsByCategory(categoryId: number) {
    const { data } = await goodAxios.get("post", { params: { categoryId } });
    state.posts = data;
  }

  async function fetchPost(id: number) {
    const { data } = await goodAxios.get(`post/${id}`);
    console.log("🚀 ~ file: post.ts ~ line 40 ~ fetchPost ~ data", data);
    state.post = data;
  }
  return {
    post,
    fetchPosts,
    getPosts,
    fetchPost,
    getPost,
    fetchPostsByCategory,
  };
});
