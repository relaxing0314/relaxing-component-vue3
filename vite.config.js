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

  return {
    ...common,
  };
});
