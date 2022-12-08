<template>
  <v-btn :size="size" rounded="xl">{{ text }}</v-btn>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const props = defineProps<{ text: string; size?: string }>();
const { mobile } = useDisplay();
// const size = mobile.value ? (props.size ? props.size : "x-small") : "small";
const size = "small";
</script>
