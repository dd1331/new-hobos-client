<template>
  <v-card style="border-radius: 20px">
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
          v-model="text"
          type="email"
          placeholder="메일"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
        <v-btn color="primary" style="border-radius: 12px">인증</v-btn>
      </div>
    </v-container>
    <v-container>
      <div class="w-100 ml-1">
        <input
          v-model="text"
          type=""
          placeholder="닉네임"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
      </div>
    </v-container>
    <v-container>
      <div class="w-100 ml-1">
        <input
          v-model="text"
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
          v-model="text"
          type="password"
          placeholder="비밀번호 확인"
          style="border-radius: 12px; border: 1px solid"
          class="w-100 pa-2 pl-4"
        />
      </div>
    </v-container>
    <v-container class="d-flex justify-center">
      <v-btn
        color="primary"
        class="ma-2"
        style="border-radius: 12px"
        @click="signup"
        >확인</v-btn
      >
      <v-btn
        color="primary"
        class="ma-2"
        style="border-radius: 12px"
        @click="$router.push('/')"
        >취소</v-btn
      >
    </v-container>
  </v-card>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

const text = "";
function signup() {
  router.push("/");
}
</script>
