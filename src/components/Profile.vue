<template>
  <v-card>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col :cols="mobile ? 12 : 8" :order="mobile ? 2 : ''">
            이메일{{ email }}
            <v-text-field
              v-model="email"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
            닉네임
            <v-text-field
              v-model="nickname"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
            <v-select
              label="Select"
              v-model="job"
              :items="store.getJobs.map((j) => j.title)"
              variant="solo"
            ></v-select>
          </v-col>

          <v-col :cols="mobile ? 12 : 4" order="1" class="text-center">
            <div @click="$refs.image.click">
              <v-avatar size="250" class="border-solid">
                <v-img
                  cover
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </v-avatar>
              <v-btn>dd</v-btn>
            </div>
            <v-file-input
              class="d-none"
              label="File input"
              ref="image"
              @change="onchange"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";

function onchange() {
  const [imageFile] = image.value.files;
  console.log(imageFile);
}

const image = ref();
const store = useJobStore();
const job = ref("");
const userStore = useUserStore();

const valid = false;
const firstname = "";
const nickname = ref();
const email = ref();
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 10 || "Name must be less than 10 characters",
];
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+/.test(v) || "E-mail must be valid",
];
const { mobile } = useDisplay();

onBeforeMount(async () => {
  await store.fetchJobs();
  job.value = userStore.getUser?.career.job.title as string;
  email.value = userStore.getUser?.email as string;
  nickname.value = userStore.getUser?.nickname as string;
});
</script>
