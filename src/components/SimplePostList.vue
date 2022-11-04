<template>
  <v-card class="my-8" style="border-radius: 20px">
    <div class="d-flex justify-space-between align-center">
      <div class="text-h6 mx-4 my-1">{{ category }}</div>
      <v-btn
        style="border-radius: 12px; opacity: 90%"
        class="mx-4"
        size="small"
        @click="$router.push({ path: '/post', query: { category } })"
        color="primary"
        >more</v-btn
      >
    </div>
    <v-divider></v-divider>

    <v-list lines="one">
      <v-list-item v-for="({ title, info, id }, index) in items" :key="index">
        <div style="cursor: pointer">
          <div @click="$router.push({ path: '/post', params: { id } })">
            {{ title }}
          </div>
          <div class="d-flex align-center">
            {{ info.name }} {{ info.date }}
            <v-icon size="13" color="red">mdi-heart</v-icon>
            {{ info.like }}
          </div>
        </div>
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
    id: 1,
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
    id: 2,
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
    id: 3,
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
    id: 4,
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
    id: 5,
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
    id: 6,
  },
  {
    title: "기자회견을 보고 (12)",
    info: { name: "홍준표", date: "08.21", like: 10 },
    id: 1,
  },
];
</script>
