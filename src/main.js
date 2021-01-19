import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/permission.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// console.log("mac", process.env.VUE_APP_MAC);

Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
