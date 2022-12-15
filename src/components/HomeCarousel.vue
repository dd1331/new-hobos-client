<template>
  <v-carousel
    cycle
    :height="mobile ? 200 : 312"
    hide-delimiter-background
    show-arrows="hover"
    :class="mobile ? 'rounded-0' : 'rounded-xl'"
  >
    <v-carousel-item src="../../src/assets/ship3.jpg" cover></v-carousel-item>

    <v-carousel-item src="../../src/assets/ship2.jpg" cover></v-carousel-item>

    <v-carousel-item src="../../src/assets/ship.jpg" cover></v-carousel-item>
  </v-carousel>
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();
</script>
