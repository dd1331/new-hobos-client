<template>
  <v-card class="my-1">
    <v-card-item>
      <div class="d-flex align-center">
        <v-card-title> 댓글 </v-card-title>
        <div class="ml-3">총 2개</div>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="({ subtitle }, index) in items" :key="index">
        <div class="d-flex">
          <v-avatar size="36px" class="ma-3">
            <v-img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            ></v-img>
          </v-avatar>
          <div v-html="subtitle" class="pb-2"></div>
        </div>
        <div class="d-flex py-2 justify-center">
          <v-btn class="mx-3" color="primary"> 좋아요 </v-btn>
          <v-btn class="mx-3" color="primary"> 싫어요 </v-btn>
          <v-btn class="mx-3" color="primary"> 댓글 </v-btn>
        </div>
        <v-divider v-if="items.length - 1 > index" class="my-2"></v-divider>
      </v-list-item>
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
        subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Summer BBQ",
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'mWish I could come, but I'mWish I could come, but I'mWish I could come, but I'mWish I could come, but I'm out of town this weekend.`,
      },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations? Have you ever been?',
      },
      {
        prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
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
