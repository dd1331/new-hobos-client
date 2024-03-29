<template>
  <v-card :elevation="elevation" :class="mobile ? 'rounded-0' : 'rounded-xl '">
    <v-list>
      <v-list-item v-for="(post, index) in posts" :key="post.id" class="pa-0">
        <v-container :class="mobile ? 'py-0' : 'py-0'">
          <v-row class="my-1">
            <v-col cols="2" sm="1" class="py-0">
              <v-avatar
                class="border-solid"
                :image="post.poster.image ?? '../../ship2.jpg'"
                size="40"
              ></v-avatar>
            </v-col>

            <v-col class="py-0" cols="10" sm="8" style="cursor: pointer">
              <div @click="push(post.id, category.id)">
                <div class="d-flex align-center">
                  <div class="mr-2 text-subtitle-1">
                    {{ post.poster.nickname }}
                  </div>

                  <div v-if="post.poster.career">
                    <GoodChip
                      class="mr-1"
                      color="pink"
                      :content="post.poster.career.job.title"
                    >
                      {{ post.poster.career.job.title }}
                    </GoodChip>

                    <GoodChip
                      class="mr-1"
                      color="primary"
                      :content="post.poster.career.year + '년차'"
                    >
                    </GoodChip>
                  </div>
                </div>
                <div class="text-body-2">
                  {{ dayjs(post.createdAt).fromNow() }}
                </div>
                <div @click="push(post.id, category.id)">
                  <div class="text-truncate">
                    {{ post.title }}
                  </div>
                  <div class="text-body-2 two-lines">
                    {{ post.content }}
                  </div>
                </div>
              </div>
              <div v-if="!xs">
                <v-chip-group>
                  <v-chip
                    variant="outlined"
                    size="small"
                    class="rounded-xl mr-2"
                  >
                    #구직
                  </v-chip>
                  <v-chip
                    variant="outlined"
                    size="small"
                    class="rounded-xl mr-2"
                  >
                    #재태크
                  </v-chip>
                  <v-chip
                    variant="outlined"
                    size="small"
                    class="rounded-xl mr-2"
                  >
                    #주식
                  </v-chip>
                </v-chip-group>
                <div class="d-flex align-center">
                  <div
                    style="cursor: pointer"
                    @click="push(post.id, category.id)"
                  >
                    <v-btn
                      size="small"
                      rounded="lg"
                      variant="text"
                      icon="mdi-heart"
                    ></v-btn>
                    <span class="text-overline">{{ post.totalLikes }}</span>
                  </div>
                  <div
                    style="cursor: pointer"
                    @click="push(post.id, category.id)"
                  >
                    <v-btn
                      size="small"
                      rounded="lg"
                      variant="text"
                      icon="mdi-comment-outline"
                    ></v-btn>
                    <span class="text-overline">{{ post.totalComments }}</span>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col
              cols="10"
              sm="3"
              offset="2"
              :offset-sm="0"
              class="py-0"
              v-if="post.thumbnail"
            >
              <v-img
                @click="push(post.id, category.id)"
                class="rounded-lg"
                :src="post.thumbnail"
                style="cursor: pointer"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
        <div v-if="xs">
          <v-row no-gutters>
            <v-col cols="10" offset="2" :offset-sm="1">
              <v-chip-group class="px-2 py-0">
                <v-chip
                  variant="outlined"
                  size="x-small"
                  class="rounded-xl mr-2"
                >
                  #구직
                </v-chip>
                <v-chip
                  variant="outlined"
                  size="x-small"
                  class="rounded-xl mr-2"
                >
                  #재태크
                </v-chip>
                <v-chip
                  variant="outlined"
                  size="x-small"
                  class="rounded-xl mr-2"
                >
                  #주식
                </v-chip>
              </v-chip-group>
            </v-col>

            <v-col cols="10" offset="2" :offset-sm="1">
              <div class="d-flex align-center">
                <div
                  style="cursor: pointer"
                  @click="push(post.id, category.id)"
                >
                  <v-btn
                    size="small"
                    rounded="lg"
                    variant="text"
                    icon="mdi-heart"
                  ></v-btn>
                  <span class="text-overline">{{ post.totalLikes }}</span>
                </div>
                <div
                  style="cursor: pointer"
                  @click="push(post.id, category.id)"
                >
                  <v-btn
                    size="small"
                    rounded="lg"
                    variant="text"
                    icon="mdi-comment-outline"
                  ></v-btn>
                  <span class="text-overline">{{ post.totalComments }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-divider v-if="posts.length !== index + 1" class="my-3"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
  <div class="text-center mt-5">
    <v-pagination
      density="compact"
      @click="clicked"
      v-model="page"
      :length="5"
      size="small"
    ></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import type { ICategory } from "@/stores/category";
import type { IPost4List } from "@/stores/post";
import { ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { useDisplay } from "vuetify/lib/framework.mjs";
import GoodChip from "./GoodChip.vue";
import { ELEVATION } from "@/constants";

const { xs, mobile } = useDisplay();
defineProps<{
  posts: IPost4List[];
  category: ICategory;
}>();
const elevation = ELEVATION;
const page = ref(1);
const emit = defineEmits(["onPageClicked"]);
function clicked() {
  emit("onPageClicked", page.value);
  window.scrollTo(0, 0);
}
const router = useRouter();
function push(postId: number, categoryId: number) {
  router.push({
    path: "/post/" + postId,
    query: { category: categoryId },
  });
}
</script>
<style>
.two-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
}
</style>
