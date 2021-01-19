import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import router from "@/router";
const BASE_API = process.env.NODE_ENV === "development" ? "/api" : process.env.VUE_APP_BASE_URL;
// console.log(BASE_API, "BASE_API");
axios.defaults.withCredentials = true;
// 一般接口请求
const request = axios.create({
	baseURL: BASE_API,
});

// 超时前，所有请求都会等待 15 秒
request.defaults.timeout = 15000;
// 请求前拦截

request.interceptors.request.use((config) => {
	let { data = {}, method } = config;
	// 发送图片特殊处理，添加hid参数
	if (method === "post" && Object.prototype.toString.call(data) === "[object FormData]") {
		// data.append("hid", process.env.VUE_APP_HID);
		data.append("hid", store.state.userInfo.self_hid || "2");
		data.append("token", store.state.userInfo.token || "");
	} else {
		data = Object.assign({}, data);

		Object.keys(data).forEach((item) => {
			if (data[item] === undefined || data[item] === null || data[item] === "") {
				delete data[item];
			}
		});
		// 为所有请求添加token,hid参数
		data.token = store.state.token || "";
		data.hid = store.state.hid || "2";

		// get请求转参数key为params
		if (method === "get") {
			config.params = data;
		}
	}
	config.data = data;
	return config;
});

// 请求成功回调
function successCallback(response) {
	if (Object.prototype.toString.apply(response.data) === "[object Blob]") {
		return response.data;
	}
	let res = response.data;
	let { data, code, msg } = res;
	if (res.status === true) {
		return data;
	} else if (code === 1005) {
		//未登入
		router.push({ path: "/login" });
	} else {
		Message.error(`${msg}(${code})`);
		return Promise.reject(res);
	}
}
// 请求错误回调
function errorCallback(error) {
	Message.error(
		error.response
			? `网络请求错误，错误码:${error.response.code}`
			: `网络请求超时!请稍后重试,或联系技术人员!`
	);
	return Promise.reject(error);
}
// axios拦截器
request.interceptors.response.use(successCallback, errorCallback);

export default request;
