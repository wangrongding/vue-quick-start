<template>
	<div class="login">
		<div class="loginBox">
			<div class="loginImg">
				<img src="../assets/loginBoxBg.png" alt="" />
			</div>
			<div class="login_center">
				<div class="changeRole" @click="changeRole">
					<el-tooltip
						class="item"
						effect="dark"
						:content="'切换为' + Role + '端登录'"
						placement="top"
					>
						<!-- <el-button>上边</el-button> -->
						<i class="el-icon-sort"></i>
					</el-tooltip>
				</div>
				<p class="title">用户登录</p>
				<el-form
					ref="loginForm"
					:model="loginForm"
					:rules="rules"
					class="login-form"
					autocomplete="on"
					label-position="left"
				>
					<transition name="fade">
						<el-form-item prop="number" v-show="this.Role == '收银员'">
							<el-input
								ref="number"
								:trigger-on-focus="true"
								v-model="loginForm.number"
								placeholder="请输入工号"
								clearable
								name="number"
								type="text"
								autocomplete="on"
								prefix-icon="el-icon-user"
							/>
						</el-form-item>
					</transition>
					<transition name="fade">
						<el-form-item prop="password" v-show="this.Role == '收银员'">
							<el-input
								clearable
								ref="password"
								prefix-icon="el-icon-lock"
								v-model="loginForm.password"
								type="password"
								placeholder="请输入密码"
								name="password"
								autocomplete="on"
								show-password
								@keyup.enter.native="getSignIn"
							/>
						</el-form-item>
					</transition>
					<el-form-item prop="type">
						<el-select
							style="width:100%"
							v-model="loginForm.type"
							clearable
							placeholder="请选择收费类型"
						>
							<i
								slot="prefix"
								style="padding-left:6px;"
								class="el-icon-connection"
							></i>
							<el-option label="门诊" value="1"></el-option>
							<el-option label="住院" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="machineCode">
						<el-select
							style="width:100%"
							v-model="loginForm.machineCode"
							clearable
							placeholder="请选择房间号"
						>
							<i slot="prefix" style="padding-left:6px;" class="el-icon-house"></i>
							<el-option
								v-for="item in roomIdList"
								:key="item.code"
								:label="item.name"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button
							:loading="loading"
							type="primary"
							style="width:100%;height:40px;"
							@click.native.prevent="getSignIn"
						>
							登录
						</el-button>
					</el-form-item>
				</el-form>
				<img src="../assets/logo1.png" alt />
			</div>
		</div>
	</div>
</template>

<script>
import { login, getMachineList } from "api/index.js";
import md5 from "md5";
export default {
	props: {},
	data() {
		return {
			Role: "收银员",
			loading: false,
			roomIdList: ["qwe1", "qwe2", "qwe3"],
			loginForm: { number: "", password: "", type: "", machineCode: "" },
			checked: false,
			rules: {
				number: [
					{
						required: true,
						message: "请输入工号",
						trigger: "blur",
					},
					/* {
						min: 5,
						max: 13,
						message: "长度在 5 到 13 个字符",
						trigger: "blur",
					}, */
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					},
				],
				type: [
					{
						required: true,
						message: "请选择收费类型",
						trigger: "blur",
					},
				],
			},
		};
	},
	computed: {},
	created() {
		// this.handlePage();
		this.getMachineList();
	},
	mounted() {
		// console.log(this);
		// console.log(process.env.VUE_APP_MAC, "process.env.VUE_APP_MAC_ADDRESS");
	},
	watch: {},
	methods: {
		changeRole() {
			console.log(this.Role);
			if (this.Role == "收银员") {
				this.Role = "患者";
			} else {
				this.Role = "收银员";
			}
		},
		getMachineList() {
			getMachineList().then((res) => {
				console.log(res);
				this.roomIdList = res.list;
			});
		},
		getRoomId() {
			let machineCode = window.localStorage.getItem("machineCode");
			console.log(!!machineCode);
			return machineCode ? true : false;
		},
		handlePage() {
			if (this.getRoomId()) {
				this.$router.push({
					path: "/inHospital",
				});
			} else {
				return;
				/* this.$router.push({
					path: "/login",
				}); */
			}
		},
		getSignIn() {
			this.loading = true;
			this.$refs["loginForm"].validate((valid) => {
				if (valid) {
					console.log(this.loginForm.type == "1");
					/* if (this.loginForm.type == "1") {
						this.$router.push({
							path: "/",
						});
					} else {
						this.$router.push({
							path: "/inHospital",
						});
					} */
					this.loading = false;
					this.$store.commit("saveUserInfo", this.loginForm);
					login(this.loginForm)
						.then((res) => {
							console.log(res);
							this.$store.commit("saveToken", res.token);
							this.loading = false;
						})
						.catch((err) => {
							console.log(err, "登录失败");
							this.loading = false;
						});
				} else {
					this.loading = false;
					this.$message({
						type: "warning",
						message: "请将账号和密码填写完全!",
					});
					return;
				}
			});
		},
	},
	components: {},
};
</script>

<style scoped lang="scss">
.login {
	width: 100%;
	height: 100vh;
	background: url(../assets/bg.png);
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
	.loginBox {
		width: 1000px;
		overflow: hidden;
		height: 529px;
		background: rgb(255, 255, 255);
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		box-shadow: #acacac 0px 1px 25px;
	}
	.loginImg {
		// width: 870px;
		// background: url("../assets/loginBoxBg.png");
		img {
			width: 600px;
		}
	}
	.login_center {
		text-align: center;
		width: 725px;
		// background: rgba(0, 0, 0, 0.397);
		color: #409eff;
		border-radius: 5px;
		padding: 40px 60px 25px;
		.title {
			font-size: 28px;
			font-weight: 400;
		}
		img {
			width: 150px;
		}
		/* 	/deep/ .el-input__inner {
			width: 100%;
			border: none;
			border-bottom: 1px solid #dcdfe6;
			margin-bottom: 10px;
			border-radius: 0;
		} */
		.login_btn {
			width: 100%;
			background: #0a8e63;
			color: #fff;
			text-align: center;
			// padding: 10px 0;
			border-radius: 3px;
			float: left;
			border: none;
			// margin-top: 30px;
		}
		.changeRole {
			float: right;
			width: 24px;
			height: 24px;
			font-size: 20px;
			margin: 0 auto;
			cursor: pointer;
		}
	}
}
</style>
