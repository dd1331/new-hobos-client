<template>
  <div app class="bg-grey-lighten-4 mb-16">
    <v-row justify="center" no-gutters class="text-center d-flex flex-column">
      <div>
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2 px-0"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
      </div>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
      <div>
        Copyright 2021 - 2022 호보스 All Rights Reserved. 광고문의
        ddd1331@gmail.com
      </div>
    </v-row>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    const links = ["소개", "개인정보처리방침", "이용약관", "청소년보호정책"];
    const icons = [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-linkedin",
      "mdi-instagram",
    ];
    return { links, icons };
  },
};
</script>
