<template>
  <div app class="bg-grey-lighten-4 mb-16">
    <v-row justify="center" no-gutters class="text-center d-flex flex-column">
      <v-container :class="mobile ? 'py-1' : ''">
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2 px-0"
          rounded="lg"
          :size="size"
        >
          {{ link }}
        </v-btn>
      </v-container>
      <v-container :class="mobile ? 'py-1' : ''">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
          :size="size"
        ></v-btn>
      </v-container>
      <v-container :class="mobile ? 'py-1' : ''">
        Copyright 2021 - 2022 호보스 All Rights Reserved. 광고문의
        ddd1331@gmail.com
      </v-container>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
const size = computed(() => (mobile.value ? "small" : ""));

const links = ["소개", "개인정보처리방침", "이용약관", "청소년보호정책"];
const icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
</script>
