import * as qs from "qs";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import goodAxios from "../common/good-axios";

type PostPayload = {
  title: string;
  content: string;
  categoryIds: [number];
};
interface IPoster {
  nickname: string;
  id: number;
}

export interface IPost4List {
  id: number;
  title: string;
  content?: string;
  createdAt: Date;
  poster: IPoster;
  totalLikes: number;
  totalComments: number;
  views: number;
}
export interface IPost4HomeList {
  posts: IPost4List[];
  category: { title: string; id: number };
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  poster: IPoster;
  totalLikes: number;
  liked: boolean;
  views: number;
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
    const { data } = await goodAxios.post("post", payload);
    return data;
  }
  async function fetchPosts() {
    const { data } = await goodAxios.get("post");
    state.posts = data;
  }
  async function fetchPostsByCategory(
    categoryId: number,
    page: number = 1,
    size: number = 5
  ) {
    const { data } = await goodAxios.get("post", {
      params: { categoryId, page, size },
    });
    state.posts = data;
    return data as IPost[];
  }
  // TODO: merge into fetchHomePosts?
  async function fetchPopularPosts() {
    const { data } = await goodAxios.get("post", {
      params: { page: 1, size: 5, categoryId: 1 },
    });
    state.popularPosts = data;
  }
  async function fetchHomePosts() {
    const { data } = await goodAxios.get("post/home", {
      params: { categoryIds: [3, 4, 5] },
      paramsSerializer: { serialize: (params) => qs.stringify(params) },
    });
    state.homePosts = data;
  }

  async function fetchPost(id: number) {
    const { data } = await goodAxios.get(`post/${id}`);
    state.post = data;
  }
  function resetPosts() {
    state.posts = [];
  }
  function resetPost() {
    state.post = null;
  }
  async function deletePost(commentId: number) {
    const { data } = await goodAxios.delete("post/" + commentId);
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
    resetPosts,
    deletePost,
    resetPost,
  };
});
