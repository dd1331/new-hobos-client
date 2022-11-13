<template>
  <v-card class="my-8" style="border-radius: 20px">
    <div class="d-flex justify-space-between align-center">
      <div class="text-h6 mx-4 my-1 pa-1">{{ category }}</div>
      <v-btn
        style="border-radius: 12px; opacity: 90%"
        class="mx-4"
        size="small"
        @click="$router.push({ path: '/post', query: { category: 1 } })"
        color="primary"
        >more</v-btn
      >
    </div>
    <v-divider></v-divider>

    <v-list lines="one">
      <v-list-item v-for="({ title, id }, index) in posts" :key="id">
        <div style="cursor: pointer">
          <div @click="$router.push({ path: '/post', params: { id } })">
            {{ title }}
          </div>
          <div class="d-flex align-center">
            홍준표 {{ dayjs(new Date()).fromNow() }}
            <v-icon size="13" color="red">mdi-heart</v-icon>
            11
          </div>
        </div>
        <v-divider v-if="posts.length - 1 > index"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
  <div class="text-center mt-10">
    {{ pagination }}
    <v-pagination
      v-if="pagination"
      density="compact"
      v-model="page"
      :length="5"
    ></v-pagination>
  </div>
</template>
<script lang="ts" setup>
import type { IPost4List } from "@/stores/post";
import { inject } from "vue";
const dayjs = inject("dayjs");

defineProps<{
  pagination?: Boolean;
  category: String;
  posts: IPost4List[];
}>();
const page = 1;
</script>
