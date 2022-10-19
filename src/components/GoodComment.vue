<template>
  <v-card style="border-radius: 20px" class="my-1">
    <v-card-item>
      <div class="d-flex align-center">
        <v-card-title> 댓글 </v-card-title>
        <div class="ml-3">총 2개</div>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-list :items="items" item-props lines="three">
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle" class="pb-2"></div>
        <div class="d-flex pb-2">
          <v-btn style="border-radius: 12px" class="mx-3"> 좋아요 </v-btn>
          <v-btn style="border-radius: 12px" class="mx-3"> 싫어요 </v-btn>
          <v-btn style="border-radius: 12px" class="mx-3"> 더보기 </v-btn>
        </div>
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
export default {
  setup() {
    const items = [
      // { type: "subheader", title: "Today" },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Summer BBQ",
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { type: "divider", inset: true },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ];

    return { items };
  },
};
</script>
