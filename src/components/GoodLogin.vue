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
                size="small"
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
        <div class="text-center">회원가입하기</div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({ hidden: Boolean });
defineEmits(["hideLogin"]);
const dialog = computed(() => props.hidden);
const valid = true;
const lastname = "";
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 10 || "Name must be less than 10 characters",
];
const email = "";
</script>
