<template>
  <div class="text-center boder-solid">
    <v-dialog
      v-model="dialog"
      @click:outside="$emit('hideLogin')"
      transition="false"
      style="width: 360px"
    >
      <!-- <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template> -->

      <v-card class="py-3">
        <v-card-title> 로그인 </v-card-title>
        <v-card-content>
          <v-form v-model="valid">
            <v-container>
              <v-text-field
                variant="outlined"
                v-model="email"
                type="email"
                :rules="nameRules"
                density="compact"
                :counter="10"
                placeholder="이메일"
                required
              ></v-text-field>

              <v-text-field
                variant="outlined"
                v-model="password"
                type="password"
                :rules="nameRules"
                density="compact"
                placeholder="비밀번호"
                required
              ></v-text-field>
            </v-container>
          </v-form>
        </v-card-content>
        <v-card-actions class="pt-0">
          <v-btn
            color="primary"
            block
            @click="loginLocal"
            variant="text"
            rounded="lg"
          >
            로그인
          </v-btn>
        </v-card-actions>
        <v-btn color="primary" @click="signupLocal" variant="text" rounded="lg">
          회원가입
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { useUserStore, type LoginLocalPayload } from "@/stores/user";

const props = defineProps({ hidden: Boolean });
const emit = defineEmits(["hideLogin"]);
const dialog = computed(() => props.hidden);
const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const accessToken = computed(() => userStore.accessToken);
const valid = true;
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 10 || "Name must be less than 10 characters",
];
function signupLocal() {
  emit("hideLogin");
  router.push("/signup");
}
async function loginLocal() {
  const payload: LoginLocalPayload = {
    email: email.value,
    password: password.value,
  };
  await userStore.loginLocal(payload);
  emit("hideLogin");
}
</script>
