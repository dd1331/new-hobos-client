<template>
  <v-card>
    <v-list>
      <v-list-item v-for="(post, index) in posts" :key="post.id" class="pa-1">
        <v-container :class="mobile ? 'py-2' : ''">
          <v-row>
            <v-col cols="2" sm="1">
              <v-avatar
                class="border-solid"
                image="../../src/assets/ship3.jpg"
                size="40"
              ></v-avatar>
            </v-col>

            <v-col cols="10" sm="7">
              <div class="pa-0">
                <div class="d-flex align-center">
                  <div class="mr-2">{{ post.poster.nickname }}</div>

                  <div v-if="post.poster.career">
                    <v-chip
                      class="mr-1"
                      size="x-small"
                      color="pink"
                      density="comfortable"
                      text-color="white"
                    >
                      {{ post.poster.career.job.title }}
                    </v-chip>

                    <v-chip
                      class="mr-1"
                      size="x-small"
                      density="comfortable"
                      color="primary"
                    >
                      {{ post.poster.career.year }}년차
                    </v-chip>
                  </div>
                </div>
                <div class="text-caption">
                  {{ dayjs(post.createdAt).fromNow() }}
                </div>
                <div
                  @click="
                    $router.push({
                      path: '/post/' + post.id,
                      query: { category: category.id },
                    })
                  "
                >
                  <div class="text-h6">
                    {{ post.title }}
                  </div>
                  <div class="text-body-1">
                    {{ post.content }}
                  </div>
                </div>
              </div>
              <v-chip-group v-if="!xs">
                <v-chip variant="outlined" size="small" class="rounded-xl mr-2">
                  #구직
                </v-chip>
                <v-chip variant="outlined" size="small" class="rounded-xl mr-2">
                  #재태크
                </v-chip>
                <v-chip variant="outlined" size="small" class="rounded-xl mr-2">
                  #주식
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="10" sm="4" offset="2" :offset-sm="0">
              <v-img
                v-if="index % 2 === 0"
                class="rounded-lg mr-0 ml-auto"
                max-height="300"
                max-width="300"
                src="../../src/assets/ship.jpg"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
        <v-row v-if="xs">
          <v-col cols="10" offset="2" :offset-sm="1">
            <v-chip-group class="px-2 py-0">
              <v-chip variant="outlined" size="small" class="rounded-xl mr-2">
                구직
              </v-chip>
              <v-chip variant="outlined" size="small" class="rounded-xl mr-2">
                재태크
              </v-chip>
              <v-chip variant="outlined" size="small" class="rounded-xl mr-2">
                주식
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="10" offset="2" :offset-sm="1">
            <div class="d-flex align-center">
              <v-btn
                size="small"
                rounded="lg"
                variant="text"
                icon="mdi-heart"
              ></v-btn>
              <span class="text-overline">{{ post.totalLikes }}</span>
              <v-btn
                size="small"
                rounded="lg"
                variant="text"
                icon="mdi-comment-outline"
              ></v-btn>
              <span class="text-overline">{{ post.totalComments }}</span>
            </div>
          </v-col>
        </v-row>
        <v-divider v-if="posts.length !== index + 1" class="my-3"></v-divider>
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
const { xs, mobile } = useDisplay();
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
