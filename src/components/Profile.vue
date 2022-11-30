<template>
  <v-card>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col :cols="mobile ? 12 : 8" :order="mobile ? 2 : ''">
            이메일
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
            닉네임
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
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
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

function onchange() {
  const [imageFile] = image.value.files;
  console.log(imageFile);
}

const image = ref();

const valid = false;
const firstname = "";
const lastname = "";
const email = "";
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 10 || "Name must be less than 10 characters",
];
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+/.test(v) || "E-mail must be valid",
];
const { mobile } = useDisplay();
</script>
