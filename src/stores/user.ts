import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "../constants";
export type SignupPayload = {
  email: string;
  nickname: string;
  password: string;
};
export type LoginLocalPayload = {
  email: string;
  password: string;
};
export const useUserStore = defineStore("User", () => {
  const count = ref(0);
  const state = reactive({ tokens: { accessToken: "", refreshToken: "" } });
  const accessToken = computed(() => state.tokens.accessToken);
  async function signupLocal(payload: SignupPayload) {
    return axios.post(API_URL + "user/signup/local", payload);
  }
  async function loginLocal(payload: LoginLocalPayload) {
    const { data } = await axios.post(API_URL + "auth/login/local", payload);
    state.tokens = data.tokens;
  }
  return { count, accessToken, signupLocal, loginLocal };
});
