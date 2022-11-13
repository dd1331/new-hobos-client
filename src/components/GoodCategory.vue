<template>
  <div class="mb-3">
    <v-btn
      v-for="category in useCategoryStore().categories"
      :key="category.id"
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px; opacity: 90%"
      @click="$router.push({ path: '/post', query: { category: category.id } })"
      color="primary"
      >{{ category.title }}</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { useCategoryStore } from "@/stores/category";
</script>
