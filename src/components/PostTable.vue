<template>
  <v-card v-if="posts" :elevation="elevation" class="rounded-xl">
    <v-table>
      <thead>
        <tr>
          <th
            class="text-left px-0 text-center"
            style="width: 10%; min-width: 3rem"
          >
            번호
          </th>
          <th class="text-left text-center" style="width: 50%">제목</th>
          <th class="text-left text-center" style="width: 15%">글쓴이</th>
          <th class="text-left px-0 text-center" style="width: 10%">추천</th>
          <th class="text-left px-0 text-center">날짜</th>
          <th class="text-left px-0 text-center" style="min-width: 3rem">
            조회
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{
            id,
            title,
            createdAt,
            poster,
            totalComments,
            totalLikes,
            views,
          } in posts"
          :key="id"
        >
          <td class="px-0 text-center">{{ id }}</td>

          <td
            @click="
              $router.push({
                name: 'Post',
                params: { id },
                query: { category: category.id },
              })
            "
            style="cursor: pointer"
          >
            <div class="text-truncate" style="max-width: 25rem">
              {{ title }}
              <span
                v-if="totalComments"
                style="color: #3493ff"
                class="font-weight-bold"
              >
                ({{ totalComments }})
              </span>
            </div>
          </td>
          <td class="d-flex align-center text-body-2">
            <v-avatar size="25px" class="mr-2">
              <v-img
                alt="Avatar"
                :src="poster.image ?? '../../src/assets/ship2.jpg'"
                class="border-solid"
              ></v-img>
            </v-avatar>
            <div class="text-truncate" style="max-width: 5rem">
              {{ poster.nickname }}
            </div>
          </td>
          <td class="text-center text-body-2" style="color: #ff4a57">
            {{ totalLikes }}
          </td>
          <td class="text-center text-truncate text-body-2">
            {{ dayjs(createdAt).fromNow() }}
          </td>
          <td class="text-center text-body-2">{{ views }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <div class="text-center mt-5">
    <v-pagination
      density="compact"
      @click="clicked"
      v-model="page"
      :length="5"
      :size="mobile ? 'small' : 'small'"
    ></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import type { ICategory } from "@/stores/category";
import type { IPost4List } from "@/stores/post";
import { ref } from "vue";
import dayjs from "dayjs";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ELEVATION } from "@/constants";

defineProps<{
  posts: IPost4List[];
  category: ICategory;
}>();
const { mobile } = useDisplay();

const elevation = ELEVATION;

const page = ref(1);
const emit = defineEmits(["onPageClicked"]);
function clicked() {
  emit("onPageClicked", page.value);
}
</script>
