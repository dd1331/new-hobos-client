<template>
  <div class="d-flex align-center">
    <v-textarea
      hide-details
      variant="outlined"
      auto-grow
      rows="1"
      color="primary"
      density="compact"
      v-model="content"
    ></v-textarea>
    <v-btn
      class="ml-3"
      @click="registerComment(content)"
      icon="mdi-comment-outline"
      variant="text"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["registerComment"]);
function registerComment(content: string) {
  emit("registerComment", content);
  clear();
}
function clear() {
  content.value = "";
}

const content = ref("");
</script>
