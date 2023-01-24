<template>
  <div class="text-center boder-solid">
    <v-dialog
      v-model="dialog"
      @click:outside="$emit('hideLogin')"
      transition="false"
      style="width: 360px"
    >
      <v-card class="py-3">
        <v-card-title class=""> 로그인 </v-card-title>
        <v-form v-model="valid">
          <v-container class="py-0">
            <v-text-field
              variant="outlined"
              v-model="email"
              type="email"
              color="primary"
              :rules="nameRules"
              density="compact"
              :counter="10"
              placeholder="이메일"
              required
            ></v-text-field>

            <v-text-field
              variant="outlined"
              v-model="password"
              type="password"
              color="primary"
              :rules="nameRules"
              density="compact"
              placeholder="비밀번호"
              required
            ></v-text-field>
          </v-container>
        </v-form>
        <v-btn
          color="primary"
          block
          @click="loginLocal"
          variant="text"
          rounded="lg"
        >
          로그인
        </v-btn>
        <v-btn color="primary" @click="signupLocal" variant="text" rounded="lg">
          회원가입
        </v-btn>

        <v-btn @click="naverLogin($refs.naver as HTMLButtonElement)"
          >네이버</v-btn
        >
      </v-card>
    </v-dialog>

    <div id="naver_id_login" ref="naver" class="d-none"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { useUserStore, type LoginLocalPayload } from "@/stores/user";
import { AxiosError } from "axios";

const NAVER_SERVICE_URL = import.meta.env.VITE_NAVER_SERVICE_URL;
const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_CALLBACK_URL;
// const NAVER_SERVICE_URL =
//   "http://ec2-13-125-230-220.ap-northeast-2.compute.amazonaws.com:3000/";
// const NAVER_CALLBACK_URL =
//   "http://ec2-13-125-230-220.ap-northeast-2.compute.amazonaws.com:3000/";
const NAVER_CLIENT_ID = "ZmGFcvBGsjbKVJm4tkay";
const props = defineProps({ hidden: Boolean });
const emit = defineEmits(["hideLogin", "popSnackbar"]);
const dialog = computed(() => props.hidden);
const router = useRouter();
const userStore = useUserStore();
const IS_DEV = process.env.NODE_ENV === "development";

const email = ref(IS_DEV ? "test@test.com" : "");
const password = ref(IS_DEV ? "11111111" : "");
const valid = true;
const nameRules = [
  (v: string) => !!v || "Name is required",
  (v: string) => v.length <= 10 || "Name must be less than 10 characters",
];
function signupLocal() {
  emit("hideLogin");
  router.push("/signup");
}
async function loginLocal() {
  const payload: LoginLocalPayload = {
    email: email.value,
    password: password.value,
  };
  try {
    await userStore.loginLocal(payload);
    emit("hideLogin");
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.code === AxiosError.ERR_BAD_REQUEST
    ) {
      emit("popSnackbar", "아이디/비밀번호가 일치하지 않습니다");
      return;
    }
  }
}
function naverLogin(a: any) {
  a.firstChild.click();
}
onMounted(() => {
  const { naver_id_login, naver } = window as any;

  var naver_id_login2 = new naver_id_login(NAVER_CLIENT_ID, NAVER_CALLBACK_URL);
  var state = naver_id_login2.getUniqState();
  naver_id_login2.setButton("white", 2, 40);
  naver_id_login2.setDomain(NAVER_SERVICE_URL);
  naver_id_login2.setState(state);
  naver_id_login2.init_naver_id_login();
});
</script>
