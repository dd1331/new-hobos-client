<template>
  <v-table style="border-radius: 20px">
    <thead>
      <tr>
        <th class="text-left">번호</th>
        <th class="text-left w-50">제목</th>
        <th class="text-left">글쓴이</th>
        <th class="text-left">추천</th>
        <th class="text-left">비추천</th>
        <th class="text-left">날짜</th>
        <th class="text-left">조회</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ 1 }}</td>
        <td>
          {{ item.name }}
          <span style="color: #3493ff" class="font-weight-bold"> (2) </span>
        </td>
        <td>
          <v-avatar size="25px">
            <v-img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            ></v-img>
          </v-avatar>
          홍준표
        </td>
        <td style="color: #ff4a57">98</td>
        <td>30</td>
        <td>22.09.21</td>
        <td>2295</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
export default {
  setup() {
    const desserts = [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
      {
        name: "Cupcake",
        calories: 305,
      },
      {
        name: "Gingerbread",
        calories: 356,
      },
      {
        name: "Jelly bean",
        calories: 375,
      },
      {
        name: "Lollipop",
        calories: 392,
      },
      {
        name: "Honeycomb",
        calories: 408,
      },
      {
        name: "Donut",
        calories: 452,
      },
      {
        name: "KitKat",
        calories: 518,
      },
    ];

    return { desserts };
  },
};
</script>
