import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const common = {
    plugins: [vue()],
    resolve: {
      alias: {
        "relaxing-component-vue3": path.resolve(__dirname, "src/main.js"),
        "@": path.resolve(__dirname, "src"),
      },
    },
  };

  if (command === "build" && mode === "lib") {
    return {
      ...common,
      build: {
        outDir: "dist", // 明确指定库的输出目录
        emptyOutDir: false, // 构建时不清空 dist 目录
        lib: {
          entry: path.resolve(__dirname, "src/main.js"),
          name: "relaxing-component-vue3",
          fileName: (format) => `relaxing-component-vue3.${format}.js`,
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue",
            },
          },
        },
      },
    };
  }

  // 非 lib 模式下走正常 SPA 构建，用于示例页面
  return {
    ...common,
    build: {
      outDir: "dist_demo", // 示例站点的输出目录
    },
  };
});
