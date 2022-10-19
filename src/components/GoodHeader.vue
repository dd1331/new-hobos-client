<template>
  <v-app-bar :elevation="2" class="px-4 py-0">
    <v-navigation-drawer v-if="false" app> </v-navigation-drawer>
    <div @click="$router.push('/')">
      <img
        :class="logo"
        src="https://theyouthdream.com/files/attach/images/main/dream_logo.png"
        alt=""
      />
    </div>
    <div>
      <div class="d-md-flex d-none justify-center">
        <v-btn variant="plain"> 청문홍답 </v-btn>
        <v-btn variant="plain"> 홍문청답 </v-btn>
        <v-btn variant="plain"> 인기게시판 </v-btn>
        <v-btn variant="plain"> 자유게시판 </v-btn>
        <v-btn variant="plain"> 정치게시판 </v-btn>
        <v-btn variant="plain"> 아레나 </v-btn>
        <v-btn variant="plain"> 문의 </v-btn>
      </div>
    </div>
    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useDisplay } from "vuetify";
export default {
  // `setup` is a special hook dedicated for composition API.
  setup() {
    const state = reactive({ draw: false });
    const { mobile } = useDisplay();

    const logo = mobile ? "w-50" : "";

    // expose the state to the template
    return {
      state,
      mobile,
      logo,
    };
  },
};
</script>
