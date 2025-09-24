import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./views";

const app = createApp(App);

app.use(router);

app.mount("#app");
