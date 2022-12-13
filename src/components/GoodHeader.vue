<template>
  <v-app-bar class="px-4" elevation="1">
    <v-navigation-drawer v-if="false" app> </v-navigation-drawer>
    <div @click="$router.push('/')" class="w-25 pt-3 align-bottom">
      <img
        height="70"
        style="cursor: pointer"
        src="../../src/assets/hobo-logo.png"
        alt=""
      />
    </div>
    <div class="d-flex w-75 h-100">
      <div class="w-100 h-100">
        <div class="d-md-flex d-none justify-center h-100">
          <div
            style="cursor: pointer"
            :style="
              category.id === state.categoryId
                ? 'border-bottom :solid #3493FF'
                : ''
            "
            class="px-4 d-flex h-100 align-center"
            :ripple="false"
            v-for="category in useCategoryStore().categories"
            :key="category.id"
            @click="toCategoryPostList(category.id)"
          >
            {{ category.title }}
          </div>
        </div>
      </div>
    </div>
    <!-- <template v-slot:append> -->
    <div class="w-25 d-flex justify-end align-center">
      <!-- <v-btn icon="mdi-heart" @click="toggleLogin"></v-btn>

      <v-btn icon="mdi-magnify" @click="toggleLogin"></v-btn> -->
      <v-btn
        v-if="!userStore.getUser"
        icon="mdi-dots-vertical"
        @click="toggleLogin"
      ></v-btn>
      <v-menu v-else min-width="200px">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar
              color="brown"
              image="../../src/assets/ship2.jpg"
            ></v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
                image="../../src/assets/ship2.jpg"
              ></v-avatar>
              <h3>{{ userStore.getUser.nickname }}</h3>
              <p class="text-caption mt-1">
                {{ userStore.getUser.email }}
              </p>
              <v-divider></v-divider>
              <v-btn
                rounded
                variant="text"
                @click="$router.push({ name: 'Profile' })"
              >
                내정보
              </v-btn>
              <v-divider></v-divider>
              <v-btn rounded variant="text" @click="logout"> 로그아웃 </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
    <!-- </template> -->
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { useCategoryStore } from "@/stores/category";
import { usePostStore } from "@/stores/post";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import { computed } from "vue";

const userStore = useUserStore();
const postStore = usePostStore();
const router = useRouter();
const emit = defineEmits(["hideLogin"]);
function toggleLogin() {
  emit("hideLogin");
}
async function toCategoryPostList(categoryId: number) {
  // FIXME: 여러곳에서 호출되는중
  await postStore.fetchPostsByCategory(categoryId);
  router.push({ path: "/post", query: { category: categoryId } });
}
function logout() {
  userStore.logout();
  router.push("/");
}
const route = useRoute();
const state: { categoryId: number } = reactive({
  categoryId: computed(() => Number(route.query.category) as number),
});
</script>
<style>
.hover:hover {
  background-color: white;
  box-shadow: none;
}
</style>
