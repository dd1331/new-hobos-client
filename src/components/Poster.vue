<template>
  <v-card>
    <v-container class="d-flex mb-3">
      <select
        v-model="state.category"
        class="pa-2 w-25"
        style="border-radius: 12px; border: 1px solid"
      >
        <option value="자유">자유</option>
        <option value="경제">경제</option>
        <option value="취미">취미</option>
      </select>
      <div class="w-100 ml-1" style="border-radius: 12px; border: 1px solid">
        <input v-model="text" placeholder="제목" class="w-100 pa-2 pl-4" />
      </div>
    </v-container>
    <v-container>
      <v-textarea label="내용" variant="solo" hide-details></v-textarea>
    </v-container>
    <v-container class="d-flex justify-center">
      <v-btn class="ma-2" @click="post">확인</v-btn>
      <v-btn class="ma-2" @click="$router.push('/post')">취소</v-btn>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const category = "자유";
const state = reactive({ category });
const text = "dd";
const post = () => {
  router.push("/post");
};
</script>
