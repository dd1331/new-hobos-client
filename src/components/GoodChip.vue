<template>
  <v-chip
    :size="mobile ? 'x-small' : 'small'"
    :color="color"
    density="comfortable"
    class="rounded-xl"
  >
    {{ content }}
  </v-chip>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();
defineProps<{ content: string; color: "pink" | "primary" }>();
</script>
