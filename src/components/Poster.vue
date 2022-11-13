<template>
  <v-card style="border-radius: 20px" min-height="800">
    <v-container class="text-sm-h4 text-h6">글쓰기</v-container>
    <v-divider />
    <v-container class="d-flex mb-3">
      <select
        v-model="state.categoryId"
        class="pa-2 w-25"
        style="border-radius: 12px; border: 1px solid"
      >
        {{
          categories
        }}
        <option
          v-for="category in categoryStore.categories"
          :value="category.id"
          :key="category.id"
        >
          title:{{ category.title }} id:{{ category.id }}
        </option>
      </select>
      <div class="w-100 ml-1">
        <input
          v-model="title"
          placeholder="제목"
          class="w-100 pa-2 pl-4"
          style="border-radius: 12px; border: 1px solid"
        />
      </div>
    </v-container>

    <v-container style="border-radius: 20px">
      <v-textarea
        v-model="content"
        style="border-radius: 20px"
        label="내용"
        variant="outlined"
        hide-details
      ></v-textarea>
    </v-container>
    <v-container class="d-flex justify-center">
      <v-btn class="ma-2" style="border-radius: 12px" @click="post">확인</v-btn>
      <v-btn class="ma-2" style="border-radius: 12px" @click="post">취소</v-btn>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "../stores/post";
import { useCategoryStore, type ICategory } from "@/stores/category";

const postStore = usePostStore();
const categoryStore = useCategoryStore();
const categories = categoryStore.categories;

const router = useRouter();
const state = reactive({ categoryId: 1 });
const title = ref("dd");
const content = ref("dd");
const post = async () => {
  // TODO: use real categoryId
  await postStore.post({
    title: title.value,
    content: content.value,
    categoryIds: [state.categoryId],
  });
  router.push("/post");
};
</script>
