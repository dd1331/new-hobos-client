<template>
  <div>
    <v-card
      v-if="category"
      :elevation="elevation"
      :class="mobile ? 'rounded-0' : 'rounded-xl'"
    >
      <div v-if="title">
        <div class="d-flex justify-space-between align-center 1 mx-3">
          <div class="my-1 pa-1">{{ category.title }}</div>
          <GoodButton
            style="opacity: 90%"
            @click="
              $router.push({ path: '/post', query: { category: category.id } })
            "
            color="primary"
            text="more"
          ></GoodButton>
        </div>
        <v-divider></v-divider>
      </div>

      <v-list lines="one" class="px-1 py-0">
        <v-list-item
          class="px-3"
          v-for="(
            {
              title,
              id,
              createdAt,
              poster,
              totalComments,
              totalLikes,
              views,
              thumbnail,
            },
            index
          ) in posts"
          :key="id"
        >
          <div class="d-flex align-center" style="cursor: pointer">
            <v-img
              v-if="thumbnail"
              class="mr-2 rounded-lg"
              max-width="50px"
              :src="thumbnail"
            />
            <div class="text-truncate">
              <div
                class="mr-2 text-truncate"
                @click="
                  $router.push({
                    name: 'Post',
                    params: { id },
                    query: { category: category.id },
                  })
                "
              >
                <span
                  v-if="highlight"
                  class="font-weight-bold text-blue lighten-2"
                >
                  자유
                </span>
                {{ title }}
                <span v-if="totalComments"> ({{ totalComments }}) </span>
              </div>
              <div class="d-flex align-center text-body-2">
                {{ poster.nickname }} {{ dayjs(createdAt).fromNow() }}
                <v-icon size="13" class="mx-1" color="red">mdi-heart</v-icon>
                {{ totalLikes }}
                조회 {{ views }}
              </div>
            </div>
          </div>
          <v-divider v-if="posts.length - 1 > index"></v-divider>
        </v-list-item>
      </v-list>
    </v-card>
    <div class="text-center mt-5">
      <v-pagination
        v-if="pagination"
        density="compact"
        v-model="page"
        :length="5"
        @click="clicked"
        :size="mobile ? 'small' : 'small'"
      ></v-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IPost4List } from "@/stores/post";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import GoodButton from "./GoodButton.vue";
import dayjs from "dayjs";
import { ELEVATION } from "@/constants";

defineProps<{
  pagination?: Boolean;
  category: { title: string; id: number };
  posts: IPost4List[];
  thumbnail?: boolean;
  title?: boolean;
  highlight?: boolean;
}>();
const emit = defineEmits(["onPageClicked"]);
const { mobile } = useDisplay();

const elevation = ELEVATION;
const page = ref(1);

function clicked() {
  console.log("🚀 ~ file: SimplePostList.vue:92 ~ clicked ~ onPageClicked");
  emit("onPageClicked", page.value);
}
</script>
<style>
.two-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
}
</style>
