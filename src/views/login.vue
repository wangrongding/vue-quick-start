<template>
	<div class="login">
		<div class="login_center">
			<img src="../assets/logo.png" alt />
			<h3>瑞昌市人民医院缴费助手</h3>
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
						v-model="loginForm.account"
						placeholder="请输入工号"
						name="account"
						type="text"
						autocomplete="on"
					/>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						ref="password"
						v-model="loginForm.password"
						type="password"
						placeholder="请输入密码"
						name="password"
						autocomplete="on"
						show-password
						@keyup.enter.native="getSignIn"
					/>
				</el-form-item>
				<el-form-item>
					<el-button
						class="login_btn"
						:loading="loading"
						type="primary"
						style="width:100%;height:40px;"
						@click.native.prevent="getSignIn"
					>
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			loading: false,
			loginForm: { account: "", password: "" },
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
						message: "长度在 10 到 13 个字符",
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
			},
		};
	},
	computed: {},
	created() {},
	mounted() {},
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
	background: url(../assets/bg.jpg);
	background-repeat: no-repeat;
	background-size: 1920px 1000px;
	display: flex;
	align-items: center;
	justify-content: center;
	.login_center {
		text-align: center;
		width: 300px;
		background: rgba(0, 0, 0, 0.397);
		color: white;
		border-radius: 5px;
		padding: 25px 40px;
		position: absolute;
		right: 150px;
		top: 200px;
		img {
			width: 50px;
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
