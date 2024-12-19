import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import components from "@/components/UI";
import "@/assets/styles/reset.css";
import "@/assets/styles/globals.scss";
import router from "@/router";
import { clickOutside } from '@/directives/clickOutside';

const app = createApp(App);
components.forEach(component => app.component(component.name, component));

app.directive('click-outside', clickOutside);
app.use(store).use(router).mount("#app");
