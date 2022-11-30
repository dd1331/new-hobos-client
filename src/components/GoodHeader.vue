<template>
  <v-app-bar :elevation="2" class="px-4 py-0">
    <v-navigation-drawer v-if="false" app> </v-navigation-drawer>
    <div @click="$router.push('/')" class="w-25">
      <img
        :class="logo"
        style="cursor: pointer"
        src="../../src/assets/ship2.jpg"
        alt=""
      />
    </div>
    <div class="d-flex w-75">
      <div class="w-100">
        <div class="d-md-flex d-none justify-center">
          <v-btn
            v-for="category in useCategoryStore().categories"
            :key="category.id"
            variant="plain"
            @click="toCategoryPostList(category.id)"
          >
            {{ category.title }}
          </v-btn>
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
      <v-menu v-else min-width="200px" rounded>
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
import { useDisplay } from "vuetify";
import { useUserStore } from "@/stores/user";
import { useCategoryStore } from "@/stores/category";
import { usePostStore } from "@/stores/post";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { mobile } = useDisplay();

const logo = mobile ? "w-50" : "";

// expose the state to the template
const postStore = usePostStore();
const router = useRouter();
const emit = defineEmits(["hideLogin"]);
function toggleLogin() {
  emit("hideLogin");
}
async function toCategoryPostList(categoryId: number) {
  await postStore.fetchPostsByCategory(categoryId);
  router.push({ path: "/post", query: { category: categoryId } });
}
function logout() {
  userStore.logout();
}
</script>
