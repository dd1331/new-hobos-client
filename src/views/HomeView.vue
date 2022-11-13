<template>
  <main>
    <!-- <TheWelcome /> -->
    <HomeCarousel></HomeCarousel>

    <SimplePostList
      :category="{ name: popularCategory.title, id: 1 }"
      :posts="popularPosts"
      class="mx-0 px-0 border-solid"
      :thumbnail="true"
    ></SimplePostList>
    <div v-if="mobile">
      <SimplePostList
        v-for="post in homePosts.posts"
        :key="post.categoryId"
        :category="{
          name: post.categoryName,
          id: post.categoryId,
        }"
        :posts="post.posts"
      ></SimplePostList>
    </div>
    <div v-else class="">
      <v-row v-for="(r, index) in homePosts.splited" :key="index + 'r'">
        <v-col v-for="post in r" :key="post.categoryId" cols="12" sm="4">
          <SimplePostList
            :category="{
              name: post.categoryName,
              id: post.categoryId,
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

  const splited = [posts.slice(0, 3), posts.slice(3)];

  return { posts, splited };
});
</script>
