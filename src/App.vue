<template>
  <v-app class="bg-grey-lighten-4 App">
    <GoodHeader @hide-login="toggleLogin"></GoodHeader>
    <v-layout v-if="mobile" style="z-index: 0" class="mt-6">
      <!-- Sizes your content based upon application components -->
      <v-main class="mt-10">
        <!-- <v-main class="mt-10 bg-grey-lighten-4"> -->
        <!-- Provides the application the proper gutter -->
        <v-container fluid class="pb-0">
          <!-- If using vue-router -->
          <router-view @pop-snackbar="popSnackbar"></router-view>
        </v-container>
        <GoodFooter></GoodFooter>
      </v-main>
    </v-layout>
    <v-layout v-else style="z-index: 0" class="mt-6">
      <v-navigation-drawer class="bg-grey-lighten-4 border-none" permanent>
      </v-navigation-drawer>
      <v-navigation-drawer
        class="bg-grey-lighten-4 border-none"
        permanent
        location="right"
      ></v-navigation-drawer>
      <!-- Sizes your content based upon application components -->
      <v-main class="mt-10">
        <!-- <v-main class="mt-10 bg-grey-lighten-4"> -->
        <!-- Provides the application the proper gutter -->
        <v-container fluid style="width: 800px" class="pb-0">
          <!-- If using vue-router -->

          <router-view @pop-snackbar="popSnackbar"></router-view>
        </v-container>
        <GoodFooter></GoodFooter>
      </v-main>
    </v-layout>
    <v-footer v-if="mobile" app class="bg-grey-lighten-4">
      <div class="d-flex w-100 justify-space-around">
        <v-btn
          v-for="category in useCategoryStore().categories"
          :key="category.id"
          class="mx-0 px-0"
          variant="text"
          size="small"
          @click="toCategoryPostList(category.id)"
        >
          {{ category.title }}
        </v-btn>
      </div>
    </v-footer>
    <GoodLogin
      :hidden="isLoginPopped"
      @hide-login="toggleLogin"
      @pop-snackbar="popSnackbar"
    ></GoodLogin>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script lang="ts" setup>
import GoodFooter from "./components/GoodFooter.vue";
import GoodHeader from "./components/GoodHeader.vue";
import GoodLogin from "./components/GoodLogin.vue";
import * as dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { useCategoryStore } from "@/stores/category";
import { useDisplay } from "vuetify";
import {
  onBeforeMount,
  onErrorCaptured,
  provide,
  ref,
  type ComponentPublicInstance,
} from "vue";
import { UNAUTHORIZED } from "./constants";
import { useUserStore } from "./stores/user";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "./stores/post";
const isLoginPopped = ref(false);

function popSnackbar(text: string) {
  snackbar.value = !snackbar.value;
  snackbarText.value = text;
}

function toggleLogin() {
  isLoginPopped.value = !isLoginPopped.value;
}
const { mobile } = useDisplay();
onBeforeMount(() => {
  useUserStore().fetchUser();
  const categoryId = Number(useRoute().query.categoryId);

  useCategoryStore().fetchCategories(categoryId);
});
const router = useRouter();
dayjs.locale("ko");
dayjs.extend(relativeTime);
provide("dayjs", dayjs);
onErrorCaptured(
  (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    if (err.response?.status === 401 || err.message === UNAUTHORIZED)
      toggleLogin();
  }
);
const snackbar = ref(false);
const snackbarText = ref("");
async function toCategoryPostList(categoryId: number) {
  await usePostStore().fetchPostsByCategory(categoryId);
  router.push({ path: "/post", query: { category: categoryId } });
}
</script>
<style>
@font-face {
  font-family: "NanumSquare";
  src: url(../fonts/NaverNanumSquareNeo/TTF/NanumSquareNeo-cBd.ttf)
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.App {
  font-family: NanumSquare;
}
</style>

<!-- <style scoped>
headerBar {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  headerBar {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  headerBar .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} -->
