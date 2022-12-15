<template>
  <v-card :class="mobile ? 'rounded-0' : 'rounded-xl'">
    <v-container class="text-sm-h4 text-h6">회원가입</v-container>
    <v-divider></v-divider>
    <v-container>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis natus
      at officiis vitae voluptatem omnis optio minima tempora doloribus, sed
      fugit enim, laboriosam quam fuga, repellendus voluptates ipsa consequuntur
      eius.
      <v-checkbox label="동의" density="compact" hide-details></v-checkbox>
    </v-container>
    <v-container>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. A quibusdam
      magni facilis quaerat laboriosam facere deleniti molestias neque? Sint
      deserunt expedita, consequuntur culpa libero illum animi ipsam neque optio
      et?
      <v-checkbox label="동의" density="compact" hide-details></v-checkbox>
    </v-container>
    <v-container>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. A quibusdam
      magni facilis quaerat laboriosam facere deleniti molestias neque? Sint
      deserunt expedita, consequuntur culpa libero illum animi ipsam neque optio
      et?
      <v-checkbox label="동의" density="compact" hide-details></v-checkbox>
    </v-container>
    <v-container>
      <div class="d-flex align-center w-100 ml-1">
        <input
          v-model="signupState.email"
          type="email"
          placeholder="메일"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
        <GoodButton
          size="small"
          rounded="lg"
          color="primary"
          text="인증"
        ></GoodButton>
      </div>
    </v-container>
    <v-container>
      <div class="w-100 ml-1">
        <input
          v-model="signupState.nickname"
          placeholder="닉네임"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
      </div>
    </v-container>
    <v-container>
      <div class="w-100 ml-1">
        <input
          v-model="signupState.password"
          type="password"
          placeholder="비밀번호"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
      </div>
    </v-container>
    <v-container>
      <div class="w-100 ml-1">
        <input
          v-model="signupState.password2"
          type="password"
          placeholder="비밀번호 확인"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
      </div>
    </v-container>
    <v-container class="d-flex justify-center">
      <GoodButton
        size="small"
        rounded="lg"
        color="primary"
        class="ma-2"
        text="확인"
        @click="signupLocal"
      ></GoodButton>
      <GoodButton
        size="small"
        rounded="lg"
        color="primary"
        class="ma-2"
        @click="$router.push('/')"
        text="취소"
      ></GoodButton>
    </v-container>
  </v-card>
</template>
<script lang="ts" setup>
import { useUserStore, type SignupPayload } from "@/stores/user";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import GoodButton from "./GoodButton.vue";
const { mobile } = useDisplay();
const router = useRouter();
const IS_DEV = process.env.NODE_ENV === "development";

const userStore = useUserStore();
const signupState: SignupPayload & { password2: string } = reactive({
  email: IS_DEV ? "test@test.com" : "",
  nickname: IS_DEV ? "123" : "",
  password: IS_DEV ? "11111111" : "",
  password2: IS_DEV ? "11111111" : "",
});

const emit = defineEmits(["popSnackbar"]);
async function signupLocal() {
  if (signupState.password !== signupState.password2)
    throw new Error("비밀번호 일치하지 않음");

  await userStore.signupLocal(signupState);

  emit("popSnackbar", "가입완료");
  router.push("/");
}
</script>
