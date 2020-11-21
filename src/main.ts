import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Ripple from "primevue/ripple";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.config.globalProperties.$primevue = reactive({ ripple: true });

app
  .component("Button", Button)
  .component("InputText", InputText)
  .component("Calendar", Calendar)
  .component("Dropdown", Dropdown)
  .directive("ripple", Ripple)
  .use(store)
  .use(router)
  .mount("#app");
