import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import store from './store'; // Importing Vuex store if needed

const app = createApp(App);
app.use(router);
// app.use(store); // Adding Vuex store
app.mount("#app");
