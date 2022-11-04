<template>
  <div>
    <div class="d-flex mb-3">
      <select v-model="state.category">
        <option value="Florida">Florida</option>
        <option value="Georgia">Georgia</option>
        <option value="Nebraska">Nebraska</option>
      </select>
      <div class="w-100">
        <v-text-field density="compact" hideDetails variant="solo">
        </v-text-field>
      </div>
    </div>
    <div>
      <v-textarea label="Label" variant="solo"></v-textarea>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";

const category = "Georgia";
const state = reactive({ category });
</script>
