<template>
  <v-card variant="flat" class="rounded-xl">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col :cols="mobile ? 12 : 8" :order="mobile ? 2 : ''">
            이메일
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="email"
              :rules="nameRules"
              readonly
            ></v-text-field>
            닉네임
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="nickname"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
            분야
            <v-select
              v-model="job"
              :items="['선택해주세요', ...jobStore.getJobs.map((j) => j.title)]"
              variant="outlined"
              density="compact"
            ></v-select>
            경력
            <v-select
              v-model="year"
              :items="years"
              variant="outlined"
              density="compact"
            ></v-select>
            <GoodButton size="small" @click="edit" text="수정"></GoodButton>
          </v-col>

          <v-col :cols="mobile ? 12 : 4" order="1" class="text-center">
            <div @click="$refs.image.click">
              <v-avatar :size="mobile ? '150' : '250'" class="border-solid">
                <v-img
                  cover
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </v-avatar>
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
import { onBeforeMount, ref, type Ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";
import GoodButton from "./GoodButton.vue";

function onchange() {
  const [imageFile] = image.value.files;
  console.log(imageFile);
}

const image = ref();
const jobStore = useJobStore();
const userStore = useUserStore();
const job = ref("");

const year: Ref<"선택해주세요" | number> = ref(0);
const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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
const emit = defineEmits(["popSnackbar"]);

async function edit() {
  const payload = {
    nickname: nickname.value,
    jobId: jobStore.getJobs.find((j) => j.title === job.value)!.id,
    year: year.value,
  };
  await userStore.editProfile(payload);
  emit("popSnackbar", "수정완료");
}

onBeforeMount(async () => {
  await jobStore.fetchJobs();
  job.value =
    (userStore.getUser?.career?.job.title as string) || "선택해주세요";
  year.value = (userStore.getUser?.career?.year as number) || "선택해주세요";
  email.value = userStore.getUser?.email as string;
  nickname.value = userStore.getUser?.nickname as string;
});
</script>
