<template>
  <v-app class="bg-grey-lighten-4">
    <GoodHeader @hide-login="toggleLogin"></GoodHeader>
    <v-layout v-if="mobile" style="z-index: 0" class="mt-6">
      <!-- Sizes your content based upon application components -->
      <v-main class="mt-10">
        <!-- <v-main class="mt-10 bg-grey-lighten-4"> -->
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
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
        <v-container fluid style="width: 1200px">
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
        <GoodFooter></GoodFooter>
      </v-main>
    </v-layout>
    <v-footer v-if="mobile" app class="bg-grey-lighten-4">
      <div class="d-flex w-100 justify-center">
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-0 px-0"
            variant="text"
          >
            {{ icon }}
          </v-btn>
        </div>
      </div>
    </v-footer>
    <GoodLogin :hidden="isLoginPopped" @hide-login="toggleLogin"></GoodLogin>
  </v-app>
</template>
<script lang="ts" setup>
import GoodFooter from "./components/GoodFooter.vue";
import GoodHeader from "./components/GoodHeader.vue";
import GoodLogin from "./components/GoodLogin.vue";
import * as dayjs from "dayjs";
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
import { useRoute } from "vue-router";
const isLoginPopped = ref(false);

function toggleLogin() {
  isLoginPopped.value = !isLoginPopped.value;
}
const { mobile } = useDisplay();
const icons = ["청문홍답", "홍문청답", "인기", "자유", "정치"];
onBeforeMount(() => {
  useUserStore().fetchUser();
  const categoryId = Number(useRoute().query.categoryId);

  useCategoryStore().fetchCategories(categoryId);
});
dayjs.extend(relativeTime);
provide("dayjs", dayjs);
onErrorCaptured(
  (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    if (err.response?.status === 401 || err.message === UNAUTHORIZED)
      toggleLogin();
  }
);
</script>

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
