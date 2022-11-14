<template>
  <v-sheet>
    <v-list>
      <v-list-item
        v-for="(post, index) in posts"
        :key="post.title"
        class="pa-1"
      >
        <div class="d-flex">
          <v-avatar
            class="border-solid"
            image="../../src/assets/ship3.jpg"
            size="40"
          ></v-avatar>
          <v-container class="py-0">
            <div>
              <div class="d-flex align-center">
                <div class="mr-2">홍준표</div>

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
            </div>
            <div>
              <div class="text-h6">
                {{ post.title }}
              </div>
              <div class="text-body-1">
                {{ post.content }}
              </div>
              <v-img
                v-if="index % 2 === 0"
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
            <div>
              <v-btn size="small" rounded="lg" variant="text">좋아요</v-btn>
              <span class="text-overline">54</span>
              <v-btn size="small" rounded="lg" variant="text">댓글</v-btn>
              <span class="text-overline">232</span>
            </div>
          </v-container>
        </div>
        <v-divider v-if="posts.length !== index + 1" class="my-5"></v-divider>
      </v-list-item>
    </v-list>
  </v-sheet>
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
import type { IPost4List } from "@/stores/post";
import { inject, ref } from "vue";
const dayjs = inject("dayjs");

defineProps<{
  posts: IPost4List[];
}>();
const page = ref(1);
const emit = defineEmits(["onPageClicked"]);
function clicked() {
  emit("onPageClicked", page.value);
  window.scrollTo(0, 0);
}
</script>
