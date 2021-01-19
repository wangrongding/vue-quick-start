<template>
	<div class="container" id="container">
		<div class="header">
			<img src="../assets/logo.png" alt="" />
			<!-- <strong>{{ hospitalName }}</strong> -->
			<p>门诊收费系统</p>
			<div class="logout" @click="logout">
				<i class="el-icon-switch-button"></i>
				<span>退出</span>
			</div>
		</div>
		<div class="main">
			<transition name="fade-transform" mode="out-in">
				<keep-alive>
					<router-view />
				</keep-alive>
			</transition>
			<!-- <slot></slot> -->
		</div>
	</div>
</template>

<script>
import "@/router/index.js";
import { logout } from "@/api/index";
export default {
	props: {},
	data() {
		return {
			hospitalName: "",
		};
	},
	created() {
		this.$nextTick(() => {
			// 禁用右键
			document.querySelector("#container").oncontextmenu = new Function(
				"event.returnValue=false"
			);
			// 禁用选择
			document.querySelector("#container").onselectstart = new Function(
				"event.returnValue=false"
			);
		});
		this.openWebSocket();
	},
	computed: {},
	mounted() {},
	watch: {},
	methods: {
		logout() {
			logout().then((res) => {
				this.$router.push({
					path: "/login",
				});
			});
		},
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
	components: {},
};
</script>

<style scoped lang="scss">
.container {
	height: 100vh;
	background: linear-gradient(to right, #2173e5, #5aa0f6);
	.header {
		padding: 0 40px;
		height: 80px;
		// width: 100%;
		border-bottom: 1px solid #eaeaea31;
		color: white;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		img {
			width: 200px;
		}
		p {
			margin-left: 50px;
			font-size: 30px;
			font-family: "KaiTi";
			display: inline-block;
		}
		.logout {
			display: flex;
			align-items: center;
			margin-left: auto;
			cursor: pointer;
			i {
				font-size: 20px;
				margin-right: 5px;
			}
			span {
				display: inline-block;
				font-size: 16px;
				line-height: 30px;
			}
		}
	}
	.main {
		border-radius: 10px;
		overflow: hidden;
		width: 95%;
		margin: 20px 40px 40px 40px;
		height: calc(100vh - 120px);
	}
}
</style>
