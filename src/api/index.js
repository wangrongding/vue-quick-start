import request from "./request";

// 登录
export function login(data) {
	return request.post("/rcsrmyy/cashier/login", data);
}
// 登出
export function logout(data) {
	return request.post("/rcsrmyy/cashier/logout", data);
}
// 获取收银壁挂机列表
export function getMachineList(data) {
	return request.get("/rcsrmyy/cashier/machine/list", { data });
}
