<template>
  <v-card class="my-8" style="border-radius: 20px">
    <div class="d-flex justify-space-between align-center">
      <div class="text-h6 mx-4 my-1">자유</div>
      <v-btn style="border-radius: 12px" class="mx-4" size="small">more</v-btn>
    </div>
    <v-divider></v-divider>

    <v-list lines="one">
      <v-list-item
        v-for="({ title, info }, index) in items"
        :key="title"
        :title="title"
      >
        <div>{{ info.name }} {{ info.date }} ❤️ {{ info.like }}</div>
        <v-divider v-if="items.length - 1 > index"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  setup() {
    // expose the state to the template
    const items = [
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
      {
        title: "기자회견을 보고",
        info: { name: "홍준표", date: "08.21", like: 10 },
      },
    ];
    return {
      items,
    };
  },
};
</script>
