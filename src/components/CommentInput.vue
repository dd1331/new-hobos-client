<template>
  <div class="d-flex">
    <v-textarea
      variant="outlined"
      auto-grow
      rows="3"
      v-model="content"
    ></v-textarea>
    <v-btn
      class="ml-3"
      @click="registerComment(content)"
      icon="mdi-comment"
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
