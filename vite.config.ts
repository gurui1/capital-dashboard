// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		AutoImport({
			//安装两行后你会发现在组件中不用再导入ref，reactive等
			imports: ['vue', 'vue-router'],
			//存放的位置
			dts: "src/auto-import.d.ts",
			//element
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			// 引入组件的,包括自定义组件
			// 存放的位置
			dts: "src/components.d.ts",
			//element
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		// ↓路径别名
		alias: {
			"@": resolve(__dirname, "./src")
		}
	},
	// server: {
	// 	proxy: {
	// 		target: 'http://192.168.6.14:8082'
	// 	  }
	// 	}

})
