<template>
  <v-card class="rounded-20">
    <v-list lines="one">
      <v-list-item v-for="{ title, info } in items" :key="title" :title="title">
        <div>{{ info.name }} {{ info.date }} ❤️ {{ info.like }}</div>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
    <v-list lines="one">
      <v-list-item v-for="{ title, info } in items" :key="title" :title="title">
        <div>{{ info.name }} {{ info.date }} ❤️ {{ info.like }}</div>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
    <v-list lines="one">
      <v-list-item v-for="{ title, info } in items" :key="title" :title="title">
        <div>{{ info.name }} {{ info.date }} ❤️ {{ info.like }}</div>
        <v-divider></v-divider>
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
    ];
    return {
      items,
    };
  },
};
</script>
