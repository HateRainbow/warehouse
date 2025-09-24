import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./view";

const app = createApp(App);

app.use(router);

app.mount("#app");
