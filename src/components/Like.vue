<template>
  <div class="d-flex justify-center align-center">
    <v-btn
      :icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
      :size="mobile ? 'small' : 'small'"
      variant="text"
      color="red"
      @click="$emit('onLike')"
    >
    </v-btn>
    <div class="text-caption">
      {{ totalLikes }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();

defineProps<{ liked: boolean; totalLikes: number }>();
defineEmits(["onLike"]);
</script>
