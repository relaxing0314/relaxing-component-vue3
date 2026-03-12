import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 这是一个包含构建选项的对象
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"), // 指定了库的入口文件，通常是一个 JavaScript 文件的路径。
      name: "relaxing-component-vue3", // 定义了库的名称，这里是 "relaxing-component-vue3"。
      fileName: (format) => `relaxing-component-vue3.${format}.js`, // 定义了输出文件的命名规则，使用了一个函数来生成不同格式的文件名。
    }, // 这是构建库的选项
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"], // 指定了需要排除的外部依赖项，这里只有 "vue"。
      output: {
        // 在 UMD 构建模式下，指定了外部依赖的全局变量名，这里将 "vue" 映射到 "Vue"，以确保在使用库时可以访问到 Vue.js。
        globals: {
          vue: "Vue",
        },
      }, // 定义了输出选项。
    }, // 这是用于 Rollup 构建工具的选项，Rollup 通常用于打包 JavaScript 库。
  },
})
