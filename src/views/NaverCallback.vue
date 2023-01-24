<template>
  <div id="naver_id_login" ref="naver">dd</div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const accessToken = route.query.accessToken as string;
  const refreshToken = route.query.refreshToken as string;

  await useUserStore().setTokens({ accessToken, refreshToken });
  await useUserStore().fetchUser();
  router.push("/");
});
</script>
