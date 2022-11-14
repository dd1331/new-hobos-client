<template>
  <v-card class="rounded-lg">
    <div class="d-flex justify-space-between align-center">
      <div class="text-h6 mx-4 my-1 pa-1">{{ category.name }}</div>
      <v-btn
        style="opacity: 90%"
        class="mx-4"
        size="small"
        rounded="lg"
        @click="
          $router.push({ path: '/post', query: { category: category.id } })
        "
        color="primary"
        >more</v-btn
      >
    </div>
    <v-divider></v-divider>

    <v-list lines="one">
      <v-list-item v-for="({ title, id, createdAt }, index) in posts" :key="id">
        <div style="cursor: pointer">
          <div class="" :class="thumbnail ? 'd-flex align-center' : ''">
            <v-img
              v-if="thumbnail"
              class="mr-2 rounded-lg"
              max-height="50"
              max-width="50"
              src="../../src/assets/ship.jpg"
            ></v-img>
            <div>
              <div
                class="mr-2"
                @click="$router.push({ name: 'Post', params: { id } })"
              >
                {{ title }}
              </div>
              <div class="d-flex align-center">
                홍준표 {{ dayjs(createdAt).fromNow() }}
                <v-icon size="13" color="red">mdi-heart</v-icon>
                11
              </div>
            </div>
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
  category: { name: string; id: number };
  posts: IPost4List[];
  thumbnail?: boolean;
}>();
const page = 1;
</script>
