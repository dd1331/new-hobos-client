<template>
  <div>
    <v-card v-if="category" variant="flat" class="rounded-xl">
      <div class="d-flex justify-space-between align-center text-subtitle-1">
        <div class="mx-4 my-1 pa-1">{{ category.title }}</div>
        <GoodButton
          style="opacity: 90%"
          class="mx-4"
          @click="
            $router.push({ path: '/post', query: { category: category.id } })
          "
          color="primary"
          text="more"
        ></GoodButton>
      </div>
      <v-divider></v-divider>

      <v-list lines="one">
        <v-list-item
          v-for="(
            { title, id, createdAt, poster, totalComments, totalLikes, views },
            index
          ) in posts"
          :key="id"
        >
          <div style="cursor: pointer">
            <div :class="thumbnail ? 'd-flex align-center' : ''">
              <v-img
                v-if="thumbnail"
                class="mr-2 rounded-lg"
                max-height="50"
                max-width="50"
                src="../../src/assets/ship.jpg"
              ></v-img>
              <div>
                <div
                  class="mr-2 text-truncate text-subtitle-1"
                  @click="
                    $router.push({
                      name: 'Post',
                      params: { id },
                      query: { category: category.id },
                    })
                  "
                >
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
import { inject, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import GoodButton from "./GoodButton.vue";
const dayjs = inject("dayjs");

defineProps<{
  pagination?: Boolean;
  category: { title: string; id: number };
  posts: IPost4List[];
  thumbnail?: boolean;
}>();
const emit = defineEmits(["onPageClicked"]);
const { mobile } = useDisplay();

const page = ref(1);

function clicked() {
  console.log("🚀 ~ file: SimplePostList.vue:92 ~ clicked ~ onPageClicked");
  emit("onPageClicked", page.value);
}
</script>
