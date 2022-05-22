import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from "axios";

import App from "./App.vue";
import router from "./router";
import { markRaw } from "vue";
import GAuth from "vue3-google-oauth2";
const app = createApp(App);

const gAuthOptions = { clientId: "462921415052-cfjj61fracn9iic6eupsnr028oodrhmc.apps.googleusercontent.com", scope: "email", prompt: "consent", fetch_basic_profile: false };
app.use(GAuth, gAuthOptions);
// adapt this based on where your router is
const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
});
axios.defaults.baseURL = "http://localhost:3030";
app.use(pinia);
app.use(router);

app.mount("#app");
