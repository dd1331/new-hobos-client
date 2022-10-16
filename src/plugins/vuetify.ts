// Styles
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify(
  { components, directives, ssr: true }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);
