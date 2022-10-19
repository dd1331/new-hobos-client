<template>
  <v-card style="border-radius: 20px" class="my-1">
    <v-card-item>
      <v-card-title>실망스럽습니다</v-card-title>

      <v-card-subtitle>
        <div>보리쌀</div>
        <div>2022.09.23 ・ 조회 수 4664 ・ 추천 수 15 ・ 댓글 2</div>
      </v-card-subtitle>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text> {{ text }} </v-card-text>
    <div class="d-flex justify-center mb-5">
      <v-btn style="border-radius: 12px" class="mx-3"> 좋아요 </v-btn>
      <v-btn style="border-radius: 12px" class="mx-3"> 싫어요 </v-btn>
    </div>
  </v-card>

  <GoodComment></GoodComment>
  <PostList></PostList>
</template>

<script lang="ts">
import GoodComment from "../components/GoodComment.vue";
import PostList from "../components/PostList.vue";
export default {
  components: { GoodComment, PostList },
  setup() {
    const text = `시장님

	현대통령이 잘못한부분이 대해서는 귀신같이 한마디도 안하시고 비판글에 대해서는 골라서 절대 대답안하시네요

	설마 이번 외교 참사 또한 윤씨는 어떠한 잘못도 없다는 입장이십니까?? 그렇게나 무서워서 빌빌대는게 시장님 입장이십니까??

	당을위해서 나라를 위해서라면 이러한 잘못도 간신처럼 덮어야하는건가요??

	청년이 젊은세대가 시장님을 지지했던 이유가 이미 퇴색하고 결국 시장님도 간신시정잡배와 다를게 없네요

	계속 그렇게 사십시오

	`;

    return { text };
  },
};
</script>
