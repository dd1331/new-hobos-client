<template>
  <v-card v-if="posts" variant="flat">
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
            <div class="text-truncate" style="max-width: 30rem">
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
          <td class="d-flex align-center">
            <v-avatar size="25px" class="mr-2">
              <v-img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              ></v-img>
            </v-avatar>
            <div class="text-truncate" style="max-width: 5rem">
              {{ poster.nickname }}
            </div>
          </td>
          <td class="text-center" style="color: #ff4a57">
            {{ totalLikes }}
          </td>
          <td class="text-center text-truncate">
            {{ dayjs(createdAt).fromNow() }}
          </td>
          <td class="text-center">{{ views }}</td>
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
