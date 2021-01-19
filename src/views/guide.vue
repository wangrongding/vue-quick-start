<template>
	<div class="login">
		<div class="loginBox">
			<div class="loginImg">
				<img src="../assets/loginBoxBg.png" alt="" />
			</div>
			<div class="login_center">
				<p class="title">用户登录</p>
				<el-form
					ref="loginForm"
					:model="loginForm"
					:rules="rules"
					class="login-form"
					autocomplete="on"
					label-position="left"
				>
					<el-form-item prop="account">
						<el-input
							ref="account"
							:trigger-on-focus="true"
							v-model="loginForm.account"
							placeholder="请输入工号"
							clearable
							name="account"
							type="text"
							autocomplete="on"
							prefix-icon="el-icon-user"
						/>
					</el-form-item>
					<el-form-item prop="password">
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
					<el-form-item prop="type">
						<el-select
							prefix-icon="el-icon-connection"
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
				<img src="../assets/logo.png" alt />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			loading: false,
			loginForm: { account: "", password: "", type: "" },
			checked: false,
			rules: {
				account: [
					{
						required: true,
						message: "请输入账号",
						trigger: "blur",
					},
					{
						min: 5,
						max: 13,
						message: "长度在 5 到 13 个字符",
						trigger: "blur",
					},
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
	created() {},
	mounted() {
		console.log(this);
		console.log(process.env.VUE_APP_MAC, "process.env.VUE_APP_MAC_ADDRESS");
	},
	watch: {},
	methods: {
		getSignIn() {
			this.loading = true;
			this.$refs["loginForm"].validate((valid) => {
				if (valid) {
					this.$store.commit("saveJobNumber", this.loginForm);
					console.log(this.$store.state.jobNumber);
					this.$router.push({
						path: "/",
					});
					this.loading = false;
					/* getSignIn(this.loginForm)
						.then((res) => {
							this.$store.commit("loginSidebarList", res.menu);
							this.$store.commit("saveBaseInfo", res);
							this.loading = false;
						})
						.catch((err) => {
							console.log(err, "登录失败");
							this.loading = false;
						}); */
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
	}
}
</style>
