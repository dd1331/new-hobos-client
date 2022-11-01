<template>
  <GoodCategory></GoodCategory>
  {{ state.category }}
  <PostTable></PostTable>
</template>

<script lang="ts" setup>
import { onBeforeUpdate, reactive } from "vue";
import { useRoute } from "vue-router";
import GoodCategory from "../components/GoodCategory.vue";
import PostTable from "../components/PostTable.vue";
const route = useRoute();

const state = reactive({ category: route.query.category });
onBeforeUpdate(() => {
  state.category = route.query.category as string;
});
</script>
