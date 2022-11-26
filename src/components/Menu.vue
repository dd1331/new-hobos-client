<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-dots-vertical"
        v-bind="props"
        variant="plain"
        style="cursor: pointer"
      ></v-btn>
    </template>

    <v-list
      density="compact"
      class="pa-0"
      elevation="2"
      style="cursor: pointer"
    >
      <v-list-item v-for="(item, i) in properties.items" :key="i" class="py-0">
        <v-list-item-title @click="$emit(item.onclick)">{{
          item.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
const properties = defineProps<{
  items: { title: string; onclick: string }[];
}>();
</script>
