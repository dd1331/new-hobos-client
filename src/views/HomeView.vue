<template>
  <main>
    <!-- <TheWelcome /> -->
    <HomeCarousel class="mb-8"></HomeCarousel>
    <SimplePostList
      v-if="popularCategory && popularPosts"
      :category="{
        title: popularCategory.title + '(임시)',
        id: popularCategory.id,
      }"
      :posts="popularPosts"
      class="mx-0 px-0"
      :thumbnail="true"
    ></SimplePostList>
    <div v-if="mobile">
      <SimplePostList
        v-for="post in homePosts.posts"
        :key="post.category.id"
        :category="{
          title: post.category.title,
          id: post.category.id,
        }"
        :posts="post.posts"
      ></SimplePostList>
    </div>
    <div v-else class="">
      <v-row v-for="(r, index) in homePosts.splited" :key="index + 'r'">
        <v-col v-for="post in r" :key="post.category.id" cols="12" sm="6">
          <SimplePostList
            :category="{
              title: post.category.title,
              id: post.category.id,
            }"
            :posts="post.posts"
          ></SimplePostList>
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useCategoryStore, type ICategory } from "@/stores/category";
import { usePostStore, type IPost } from "@/stores/post";
import { computed, onBeforeMount, reactive } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useDisplay } from "vuetify";
import HomeCarousel from "../components/HomeCarousel.vue";
import SimplePostList from "../components/SimplePostList.vue";
const { mobile } = useDisplay();

const categories = computed(() => useCategoryStore().categories);

const popularCategory = computed(
  () => categories.value.find(({ title }) => title === "주식") as ICategory
);

onBeforeMount(async () => {
  await usePostStore().fetchPopularPosts();
  await usePostStore().fetchHomePosts();
});

const popularPosts = computed(() => usePostStore().getPopularPosts);
const homePosts = computed(() => {
  const posts = usePostStore().getHomePosts.slice();

  const splited = [posts.slice(0, 2), posts.slice(2)];

  return { posts, splited };
});
onBeforeRouteLeave(() => {
  usePostStore().resetPosts();
});
</script>
