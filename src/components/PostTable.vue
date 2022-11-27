<template>
  <v-card v-if="posts">
    <v-table>
      <thead>
        <tr>
          <th class="text-left px-3" style="width: 10%">번호</th>
          <th class="text-left px-3" style="width: 50%">제목</th>
          <th class="text-left px-3" style="width: 20%">글쓴이</th>
          <th class="text-left px-3">추천</th>
          <th class="text-left px-3">날짜</th>
          <th class="text-left px-3">조회</th>
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
          <td class="px-3">{{ id }}</td>

          <td
            @click="
              $router.push({
                name: 'Post',
                params: { id },
                query: { category: category.id },
              })
            "
            class="px-3"
            style="cursor: pointer"
          >
            {{ title }}
            <span
              v-if="totalComments"
              style="color: #3493ff"
              class="font-weight-bold"
            >
              ({{ totalComments }})
            </span>
          </td>
          <td class="px-3">
            <v-avatar size="25px">
              <v-img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              ></v-img>
            </v-avatar>
            {{ poster.nickname }}
          </td>
          <td class="px-3" style="color: #ff4a57">{{ totalLikes }}</td>
          <td class="px-3">{{ dayjs(createdAt).fromNow() }}</td>
          <td class="px-3">{{ views }}</td>
        </tr>
      </tbody>
    </v-table>
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

defineProps<{
  posts: IPost4List[];
  category: ICategory;
}>();
const dayjs = inject("dayjs");
const page = ref(1);
const emit = defineEmits(["onPageClicked"]);
function clicked() {
  emit("onPageClicked", page.value);
}
</script>
