<template>
	<div class="home">
		<img alt="Vue logo" src="@/assets/logo.png" />
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "Home",
	components: {},
	data() {
		return {
			ws: null,
		};
	},
	created() {
		this.openWebSocket();
	},
	methods: {
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
