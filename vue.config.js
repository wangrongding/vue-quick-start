const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	devServer: {
		host: "0.0.0.0",
		port: 9531,
		disableHostCheck: true,
		proxy: {
			"/api": {
				target: process.env.VUE_APP_BASE_URL,
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					"^/api": "/",
				},
			},
		},
	},
	// 开启gzip压缩
	configureWebpack: () => {
		let temparr = [];
		if (process.env.NODE_ENV !== "production") {
			temparr.push(
				new NyanProgressPlugin({
					// 获取进度的时间间隔，默认 180 ms
					debounceInterval: 60,
					nyanCatSays(progress, messages) {
						if (progress === 1) {
							// 当构建完成时，喊出的话
							return "冲!!!";
						}
					},
				})
			);
		} else {
			temparr.push(
				new CompressionPlugin({
					test: /\.js$|\.html$|\.css/,
					threshold: 10240,
					deleteOriginalAssets: false,
				})
			);
		}
		return { plugins: temparr };
	},
	chainWebpack: (config) => {
		// 配置路径别名
		config.resolve.alias
			.set("@", resolve("src"))
			.set("assets", resolve("src/assets"))
			.set("api", resolve("src/api"))
			.set("router", resolve("src/router"))
			.set("store", resolve("src/store"))
			.set("components", resolve("src/components"));
	},
};
