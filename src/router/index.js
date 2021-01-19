import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
/* Layout */
import Layout from "@/views/container.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/OPSList",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login.vue"),
	},
	{
		path: "/",
		component: Layout,
		// redirect: "/OPSList",
		children: [
			{ path: "OPSList", name: "OPSList", component: () => import("@/views/OPSList.vue") },
		],
	},
	{
		path: "/inHospital",
		component: Layout,
		name: "inHospital",
		children: [{ path: "", name: "", component: () => import("@/views/inHospital.vue") }],
	},
	{
		path: "/payBox",
		component: Layout,
		name: "payBox",
		children: [{ path: "", name: "", component: () => import("@/views/payBox.vue") }],
	},
	{
		path: "/404",
		hidden: true,
		component: () => import("@/views/404.vue"),
	},
	{ path: "*", redirect: "/404/", hidden: true }, //404頁面
];

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
});

export default router;
