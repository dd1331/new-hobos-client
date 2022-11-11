import { defineStore } from "pinia";
import goodAxios from "../common/good-axios";

type PostPayload = {
  title: string;
  content: string;
  categoryIds: [number];
};
export const usePostStore = defineStore("Post", () => {
  async function post(payload: PostPayload) {
    return goodAxios.post("post", payload);
  }
  return { post };
});
