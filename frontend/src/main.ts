import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./views";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
