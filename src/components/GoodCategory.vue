<template>
  <div class="mb-3">
    <v-btn
      v-for="category in categories"
      :key="category"
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px; opacity: 90%"
      @click="$router.push({ path: '/post', query: { category } })"
      color="primary"
      >{{ category }}</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
const categories = [
  "🌍 전체 ",
  "🌍 정치 ",
  "🌍 뉴스 ",
  "🌍 토론 ",
  "🌍 자유 ",
  "🌍 인기 ",
  "🌍 세금 ",
  "🌍 일상 ",
];
</script>
