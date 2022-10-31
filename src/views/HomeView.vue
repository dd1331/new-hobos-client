<template>
  <main>
    <!-- <TheWelcome /> -->
    <HomeCarousel></HomeCarousel>
    <SimplePostList class="mx-0 px-0"></SimplePostList>
    <div v-if="mobile">
      <SimplePostList></SimplePostList>
      <SimplePostList></SimplePostList>
      <SimplePostList></SimplePostList>
    </div>
    <div v-else class="">
      <v-row v-for="m in 3" :key="m">
        <v-col v-for="n in 3" :key="n" cols="12" sm="4">
          <SimplePostList class=""></SimplePostList>
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import HomeCarousel from "../components/HomeCarousel.vue";
import SimplePostList from "../components/SimplePostList.vue";
const { mobile } = useDisplay();
</script>
