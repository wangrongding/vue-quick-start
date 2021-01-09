<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
		<div class="title">
			<img src="../assets/logo.jpg" alt="" width="50px" />
			<h2>瑞昌市人民医院缴费助手</h2>
		</div>
		<!-- <h3>瑞昌市人民医院缴费助手</h3> -->
		<el-form :inline="true" :model="queryForm" class="demo-form-inline">
			<el-form-item label="患者就诊卡号">
				<el-input v-model="queryForm.user" placeholder="请输入患者就诊卡号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="序号"></el-table-column>
			<el-table-column prop="date" label="医生姓名"></el-table-column>
			<el-table-column prop="date" label="科室"></el-table-column>
			<el-table-column prop="name" label="总金额"></el-table-column>
			<el-table-column prop="date" label="时间"></el-table-column>
		</el-table>
		<div class="payBtn">
			<el-button type="primary" @click="postMsg">支付宝支付</el-button>
			<el-button type="success" @click="postMsg">微信支付</el-button>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
const ip = require("ip");

export default {
	name: "Home",
	components: {},
	data() {
		return {
			ws: null,
			tableData: [],
			queryForm: {},
		};
	},
	created() {
		this.openWebSocket();
		// console.log(ip, "ip");
		// console.log(ip.address(), "ip");
		// console.log(ip.mask, "ip");
	},
	mounted() {},
	methods: {
		postMsg() {
			this.ws.send('{"type":"say","msg":"123"}');
		},
		search() {},
		openWebSocket() {
			this.ws = new WebSocket("ws://192.168.31.226:7272");
			let ws = this.ws;
			// 当socket连接打开时，输入用户名
			ws.onopen = () => {
				// 登录
				var login_data = JSON.stringify({
					type: "login",
					hid: 2,
					room_id: 111,
				});
				ws.send(login_data);
			};
			// 当有消息时根据消息类型显示不同信息
			ws.onmessage = (res) => {
				var data = JSON.parse(res.data);
				switch (data["type"]) {
					// 服务端ping客户端
					case "ping": {
						ws.send('{"type":"pong"}');
						console.log("ping");
						break;
					}
					case "login": {
						// 登录 更新用户列表
						//保存client_id
						this.client_id = data["client_id"];
						console.log(this.client_id, " this.client_id");
						break;
					}
					case "say": {
						let { message_type } = data;
						let tempDate = data;
						tempDate.type = data.message_type;
						break;
					}
				}
			};
			ws.onclose = function() {
				console.log("连接关闭!");
			};
			ws.onerror = function() {
				console.log("出现错误");
			};
		},
	},
};
</script>
<style lang="scss" scoped>
.home {
	padding: 20px;
	height: 100vh;
	background: rgb(255, 247, 224);
	.title {
		display: flex;
		align-items: center;
		text-align: left;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
		h2 {
			margin: 0;
			line-height: 60px;
			display: inline-block;
		}
	}
	h3 {
		text-align: center;
	}
	.payBtn {
		text-align: right;
		margin-top: 40px;
	}
}
</style>
