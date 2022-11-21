<template>
  <v-card v-if="posts">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">번호</th>
          <th class="text-left w-50">제목</th>
          <th class="text-left">글쓴이</th>
          <th class="text-left">추천</th>
          <th class="text-left">비추천</th>
          <th class="text-left">날짜</th>
          <th class="text-left">조회</th>
        </tr>
      </thead>
      <tbody>
        <!-- {{
        posts
      }} -->
        <tr v-for="{ id, title, createdAt, poster } in posts" :key="id">
          <td>{{ id }}</td>

          <td
            @click="
              $router.push({
                name: 'Post',
                params: { id },
                query: { categoryId: category.id },
              })
            "
            style="cursor: pointer"
          >
            {{ title }}
            <span style="color: #3493ff" class="font-weight-bold"> (2) </span>
          </td>
          <td>
            <v-avatar size="25px">
              <v-img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              ></v-img>
            </v-avatar>
            {{ poster.nickname }}
          </td>
          <td style="color: #ff4a57">98</td>
          <td>30</td>
          <td>{{ dayjs(createdAt).fromNow() }}</td>
          <td>2295</td>
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
