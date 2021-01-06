import router from "./router";
import store from "@/store";
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
	// console.log(to.path, "to");
	// console.log(from.path, "from");
	if (to.path === "/login") {
		next();
		return;
	}
	if (!store.state.jobNumber) {
		next("/login");
		return;
	} else {
		next();
	}
});
router.afterEach(() => {});
