<template>
  <v-card>
    <v-list>
      <v-list-item v-for="(post, index) in posts" :key="post.id" class="pa-1">
        <v-container class="d-flex">
          <v-avatar
            class="border-solid"
            image="../../src/assets/ship3.jpg"
            size="40"
          ></v-avatar>
          <v-container class="pa-0">
            <v-container class="py-0 d-flex justify-space-between pr-0">
              <div>
                <div class="d-flex align-center">
                  <div class="mr-2">{{ post.poster.nickname }}</div>

                  <v-chip
                    class="mr-1"
                    size="x-small"
                    color="pink"
                    density="comfortable"
                    text-color="white"
                  >
                    Tags
                  </v-chip>

                  <v-chip
                    class="mr-1"
                    size="x-small"
                    density="comfortable"
                    color="primary"
                  >
                    John Leider
                  </v-chip>

                  <v-chip
                    class="mr-1"
                    size="x-small"
                    density="comfortable"
                    color="cyan"
                  >
                    New Tweets
                  </v-chip>
                </div>
                <div class="text-caption">
                  {{ dayjs(post.createdAt).fromNow() }}
                </div>
                <div
                  @click="
                    $router.push({
                      path: '/post/' + post.id,
                      query: { categoryId: category.id },
                    })
                  "
                >
                  <div class="text-h6">
                    {{ post.title }}
                  </div>
                  <div class="text-body-1">
                    {{ post.content }}
                  </div>
                  <v-img
                    v-if="index % 2 === 0 && xs"
                    class="mr-2 rounded-lg"
                    max-height="300"
                    max-width="300"
                    src="../../src/assets/ship.jpg"
                  ></v-img>
                  <v-container class="pa-0">
                    <v-chip-group>
                      <v-chip
                        variant="outlined"
                        size="small"
                        class="rounded-xl mr-2"
                      >
                        구직
                      </v-chip>
                      <v-chip
                        variant="outlined"
                        size="small"
                        class="rounded-xl mr-2"
                      >
                        재태크
                      </v-chip>
                      <v-chip
                        variant="outlined"
                        size="small"
                        class="rounded-xl mr-2"
                      >
                        주식
                      </v-chip>
                    </v-chip-group>
                  </v-container>
                </div>
                <div v-if="xs">
                  <v-btn size="small" rounded="lg" variant="text">좋아요</v-btn>
                  <span class="text-overline">54</span>
                  <v-btn size="small" rounded="lg" variant="text">댓글</v-btn>
                  <span class="text-overline">232</span>
                </div>
              </div>

              <v-img
                v-if="index % 2 === 0 && !xs"
                class="mr-2 rounded-lg w-50 h-100"
                max-height="300"
                max-width="300"
                src="../../src/assets/ship.jpg"
              ></v-img>
            </v-container>
            <div v-if="!xs">
              <v-btn size="small" rounded="lg" variant="text">좋아요</v-btn>
              <span class="text-overline">54</span>
              <v-btn size="small" rounded="lg" variant="text">댓글</v-btn>
              <span class="text-overline">232</span>
            </div>
          </v-container>
        </v-container>
        <v-divider v-if="posts.length !== index + 1" class="my-5"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
  <div class="text-center mt-10">
    <v-pagination
      density="compact"
      @click="clicked"
      v-model="page"
      :length="5"
    ></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import type { ICategory } from "@/stores/category";
import type { IPost4List } from "@/stores/post";
import { inject, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const dayjs = inject("dayjs");
const { xs } = useDisplay();
defineProps<{
  posts: IPost4List[];
  category: ICategory;
}>();
const page = ref(1);
const emit = defineEmits(["onPageClicked"]);
function clicked() {
  emit("onPageClicked", page.value);
  window.scrollTo(0, 0);
}
</script>
