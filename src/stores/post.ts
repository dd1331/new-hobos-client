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
export interface IPost4HomeList {
  categoryId: number;
  categoryName: string;
  posts: IPost4List[];
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
export const usePostStore = defineStore("Post", () => {
  const state: {
    posts: IPost4List[];
    post: IPost | null;
    popularPosts: IPost4List[];
    homePosts: IPost4HomeList[];
  } = reactive({
    posts: [],
    post: null,
    popularPosts: [],
    homePosts: [],
  });
  const getPosts = computed(() => state.posts);
  const getPopularPosts = computed(() => state.popularPosts);
  const getPost = computed(() => state.post);
  const getHomePosts = computed(() => state.homePosts);
  async function post(payload: PostPayload) {
    return goodAxios.post("post", payload);
  }
  async function fetchPosts() {
    const { data } = await goodAxios.get("post");
    state.posts = data;
  }
  async function fetchPostsByCategory(categoryId: number) {
    const { data } = await goodAxios.get("post/category", {
      params: { categoryId },
    });
    state.posts = data;
    return data as IPost[];
  }
  // TODO: merge into fetchHomePosts?
  async function fetchPopularPosts() {
    const { data } = await goodAxios.get("post", {
      params: { page: 1, size: 5 },
    });
    state.popularPosts = data;
  }
  async function fetchHomePosts() {
    const { data } = await goodAxios.get("post/home");
    state.homePosts = data;
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
    fetchPopularPosts,
    fetchPost,
    getPost,
    fetchPostsByCategory,
    getPopularPosts,
    fetchHomePosts,
    getHomePosts,
  };
});
