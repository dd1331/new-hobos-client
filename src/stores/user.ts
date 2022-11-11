import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { API_URL } from "../constants";
import goodAxios from "../common/good-axios";
import type { AxiosRequestConfig } from "axios";
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
    return goodAxios.post(API_URL + "user/signup/local", payload);
  }
  async function loginLocal(payload: LoginLocalPayload) {
    const { data } = await goodAxios.post(
      API_URL + "auth/login/local",
      payload
    );
    goodAxios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
      if (accessToken.value && config.headers) {
        config.headers["Authorization"] = "Bearer " + accessToken.value;
      }
      return config;
    });
    state.tokens = data.tokens;
    return state.tokens;
  }
  return { count, accessToken, signupLocal, loginLocal };
});
