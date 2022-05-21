import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from "axios";

import App from "./App.vue";
import router from "./router";
import { markRaw } from "vue";
// adapt this based on where your router is
const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
});
axios.defaults.baseURL = "http://localhost:3030";
const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount("#app");
