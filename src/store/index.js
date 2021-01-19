import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hid: "2",
		JobType: "",
		machineCode: "",
		token: "",
	},
	mutations: {
		// 保存token
		saveToken(state, data) {
			state.token = data;
			localStorage.setItem("token", data);
		},
		// 保存基础信息
		saveUserInfo(state, data) {
			localStorage.setItem("JobType", data.type);
			localStorage.setItem("machineCode", data.machineCode);
			state.JobType = data.type;
		},
	},
	actions: {},
	modules: {},
});
