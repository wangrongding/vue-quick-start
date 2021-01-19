<template>
	<div class="payBox">
		<div class="title">
			<h2>支付二维码</h2>
		</div>
		<div class="payDialog">
			<div class="payType">
				<img src="../assets/alipay.png" alt="" />
				<canvas class="qrcode" ref="qrcode1"></canvas>
				<p class="money">899¥</p>
				<p>请用手机扫描相应二维码后进行支付</p>
			</div>
			<div class="payType">
				<img src="../assets/wechat.png" alt="" />
				<canvas class="qrcode" ref="qrcode2"></canvas>
				<p class="money">899¥</p>
				<p>请用手机扫描相应二维码后进行支付</p>
			</div>
		</div>
	</div>
</template>
<script>
import QRCode from "qrcode";
export default {
	name: "payBox",
	data() {
		return {
			tableData: [],
			dialogVisible: false,
		};
	},
	created() {},
	mounted() {
		QRCode.toCanvas(this.$refs.qrcode1, "asdfagfsdafsadfasdf12sdfadsafad", {
			width: 300,
			height: 300,
		});
		QRCode.toCanvas(this.$refs.qrcode2, "asdfagfsdafsadfasdf12sdfadsafad", {
			width: 300,
			height: 300,
		});
	},
	methods: {},
};
</script>
<style lang="scss" scoped>
.payBox {
	padding: 0 20px;
	// height: 100vh;
	height: 100%;
	background: rgb(255, 255, 255);
	.payDialog {
		width: 90%;
		display: flex;
		justify-content: space-around;
		margin: 30px auto 0;
		.payType {
			display: flex;
			flex-direction: column;
			align-items: center;
			// border: 1px solid #cccccc86;
			text-align: center;
			// width: 300px;
			img {
				width: 150px;
			}
			.money {
				font-size: 22px;
				font-weight: 400;
				margin: 0;
			}
		}
	}
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
		::v-deep .el-input__inner {
			border-radius: 50px;
			overflow: hidden;
		}
	}
	::v-deep .tbHead {
		background: #ecf3ff;
	}
}
</style>
