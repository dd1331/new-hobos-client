import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

loadFonts();
const app = createApp(App);

app.use(createPinia()).use(router).use(vuetify).mount("#app");
app.config.errorHandler = (err: any, instance: any, info: any) => {
  console.log("🚀 ~ file: main.ts ~ line 10 ~ err", err);
};
