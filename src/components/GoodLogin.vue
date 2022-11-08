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

      <v-card style="border-radius: 20px" class="py-3">
        <v-card-title> 로그인 </v-card-title>
        <v-card-content>
          <v-form v-model="valid">
            <v-container>
              <v-text-field
                variant="outlined"
                v-model="lastname"
                :rules="nameRules"
                density="compact"
                :counter="10"
                placeholder="아이디"
                required
              ></v-text-field>

              <v-text-field
                variant="outlined"
                v-model="email"
                :rules="nameRules"
                density="compact"
                placeholder="비밀번호"
                required
              ></v-text-field>
            </v-container>
          </v-form>
        </v-card-content>
        <v-card-actions class="pt-0">
          <v-btn color="primary" block @click="$emit('hideLogin')">
            로그인
          </v-btn>
        </v-card-actions>
        <v-btn color="primary" @click="signup" variant="text"> 회원가입 </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ hidden: Boolean });
const emit = defineEmits(["hideLogin"]);
const dialog = computed(() => props.hidden);
const router = useRouter();
const valid = true;
const lastname = "";
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 10 || "Name must be less than 10 characters",
];
const email = "";
function signup() {
  emit("hideLogin");
  router.push("/signup");
}
</script>
