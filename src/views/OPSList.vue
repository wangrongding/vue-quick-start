<template>
	<div class="home">
		<div class="title">
			<h2>收费明细</h2>
		</div>
		<div class="queryForm">
			<el-input
				style="width:400px;"
				clearable
				v-model="queryForm.user"
				placeholder="请输入患者就诊卡号"
			></el-input>
			<el-button style="margin-left:20px" type="primary" @click="search">查询</el-button>
			<el-button style="margin-left:20px" type="primary" @click="test">测试按钮</el-button>
		</div>
		<el-table
			:data="tableData"
			header-cell-class-name="tbHead"
			style="width: 100%;margin-top:20px"
		>
			<el-table-column prop="date" label="序号"></el-table-column>
			<el-table-column prop="date" label="医生姓名"></el-table-column>
			<el-table-column prop="date" label="科室"></el-table-column>
			<el-table-column prop="name" label="总金额"></el-table-column>
			<el-table-column prop="date" label="时间"></el-table-column>
		</el-table>
		<div class="payBtn">
			<!-- <el-button type="primary" @click="postMsg">支付宝支付</el-button>
			<el-button type="success" @click="postMsg">微信支付</el-button> -->
			<el-input
				clearable
				style="width:150px;margin-right:20px"
				v-model="queryForm.user"
				placeholder="请输入金额"
			></el-input>
			<el-button type="primary" @click="postMsg" round>患者支付</el-button>
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
	created() {},
	mounted() {},
	methods: {
		test() {
			window.open("https://www.baidu.com", "popup");
		},
		postMsg() {
			this.$router.push({
				path: "/payBox",
			});
		},
		search() {},
	},
};
</script>
<style lang="scss" scoped>
.home {
	padding: 0 20px;
	// height: 100vh;
	height: 100%;
	background: rgb(255, 255, 255);
	.title {
		display: flex;
		align-items: center;
		text-align: left;
		height: 80px;
		line-height: 80px;
		border-bottom: 1px solid #eaeaeab9;
		margin-bottom: 20px;
		h2 {
			font-size: 26px;
			margin: 0;
			border-bottom: 3px solid#5aa0f6;
			line-height: 80px;
			display: inline-block;
		}
	}
	h3 {
		text-align: center;
	}
	.payBtn {
		text-align: center;
		margin-top: 40px;
	}
	.queryForm {
		text-align: center;
	}
	::v-deep .el-input__inner {
		border-radius: 50px;
		overflow: hidden;
	}
	::v-deep .tbHead {
		background: #ecf3ff;
	}
}
</style>
