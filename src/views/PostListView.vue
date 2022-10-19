<template>
  <div class="mb-3">
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 전체</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 정치 (2131)</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 뉴스 (2131)</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 토론 (2131)</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 자유 (2131)</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 인기 (2131)</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 세금 (2131)</v-btn
    >
    <v-btn
      class="mr-2 bg-grey-lighten-2 mb-2"
      variant="flat"
      height="35"
      style="border-radius: 12px"
      >🌍 일상 (2131)</v-btn
    >
  </div>
  <PostList></PostList>
</template>

<script lang="ts">
import PostList from "../components/PostList.vue";
export default {
  components: { PostList },
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
