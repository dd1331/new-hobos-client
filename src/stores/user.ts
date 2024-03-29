import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
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
type Tokens = {
  accessToken: string;
  refreshToken: string;
};
export type User = {
  id: number;
  nickname: string;
  email: string;
  career: { job: { title: string }; year: number };
  image: string;
};
export const useUserStore = defineStore("User", () => {
  const count = ref(0);

  const state: {
    tokens: Tokens | null;
    user: User | null;
  } = reactive({ tokens: {} as Tokens, user: null });
  const accessToken = computed(() => state.tokens?.accessToken);
  async function signupLocal(payload: SignupPayload) {
    const { data } = await goodAxios.post("user/signup/local", payload);
    return setUserData(data);
  }

  async function updateProfileImage(image: File) {
    const formData = new FormData();
    formData.append("file", image);
    const { data } = await goodAxios.post("user/profile/image", formData);
  }
  async function loginLocal(payload: LoginLocalPayload) {
    const { data } = await goodAxios.post("auth/login/local", payload);
    return setUserData(data);
  }

  function setUserData(data: { tokens: Tokens; user: User }) {
    state.user = data.user;
    return setTokens(data.tokens);
  }

  function setTokens(tokens: Tokens) {
    goodAxios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
      if (accessToken.value && config.headers) {
        config.headers["Authorization"] = "Bearer " + accessToken.value;
      }
      return config;
    });
    state.tokens = tokens as Tokens;
    localStorage.setItem("accessToken", state.tokens.accessToken);
    localStorage.setItem("refreshToken", state.tokens.refreshToken);
    return state.tokens;
  }

  async function fetchUser() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) return;
    goodAxios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
      if (accessToken && config.headers) {
        config.headers["Authorization"] = "Bearer " + accessToken;
      }
      return config;
    });
    state.tokens = { accessToken, refreshToken };

    const { data } = await goodAxios.get("user");
    state.user = data;
  }
  const getUser = computed(() => state.user);
  function logout() {
    state.tokens = null;
    state.user = null;
    localStorage.clear();
    goodAxios.interceptors.request.clear();
  }
  async function editProfile(payload: {
    nickname: string;
    jobId: number;
    year: number;
  }) {
    const { data } = await goodAxios.put("user/profile", payload);
    fetchUser();
  }
  return {
    count,
    accessToken,
    signupLocal,
    loginLocal,
    fetchUser,
    getUser,
    logout,
    editProfile,
    updateProfileImage,
    setTokens,
  };
});
