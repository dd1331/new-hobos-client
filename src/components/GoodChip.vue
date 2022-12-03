<template>
  <v-chip class="mr-1" size="x-small" :color="color" density="comfortable">
    {{ content }}
  </v-chip>
</template>
<script lang="ts" setup>
defineProps<{ content: string; color: "pink" | "primary" }>();
</script>
