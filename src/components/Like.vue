<template>
  <div class="d-flex justify-center align-center">
    <v-btn
      :icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
      size="small"
      variant="text"
      @click="$emit('onLike')"
    >
    </v-btn>
    <div class="text-caption">
      {{ totalLikes }}
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ liked: boolean; totalLikes: number }>();
defineEmits(["onLike"]);
</script>
