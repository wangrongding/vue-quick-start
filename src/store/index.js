import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		jobNumber: "",
	},
	mutations: {
		// 保存基础信息
		saveJobNumber(state, data) {
			state.jobNumber = data.account;
		},
	},
	actions: {},
	modules: {},
});
