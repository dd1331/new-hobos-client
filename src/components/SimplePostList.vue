<template>
  <v-card class="my-8" style="border-radius: 20px">
    <div class="d-flex justify-space-between align-center">
      <div class="text-h6 mx-4 my-1">{{ category }}</div>
      <v-btn
        style="border-radius: 12px"
        class="mx-4"
        size="small"
        @click="$router.push({ path: '/post', query: { category } })"
        >more</v-btn
      >
    </div>
    <v-divider></v-divider>

    <v-list lines="one">
      <v-list-item
        v-for="({ title, info }, index) in items"
        :key="title"
        :title="title"
      >
        <div>{{ info.name }} {{ info.date }} ❤️ {{ info.like }}</div>
        <v-divider v-if="items.length - 1 > index"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
  <div class="text-center mt-10">
    <v-pagination
      v-if="pagination"
      density="compact"
      v-model="page"
      :length="5"
    ></v-pagination>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  pagination: Boolean,
  category: String,
});
const page = 1;
const items = [
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
  },
];
</script>
