import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";

// rolldown-vite 下 rollupOptions 已被忽略，external 必须写在 build.rolldownOptions
// 无 UI 依赖的核心层：vue 保持 external，其余全部内联
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 源码相对导入均带 .js / .vue 扩展名（NodeNext 规范），生成的 d.ts 原样保留，
    // bundler 与 nodenext 两种解析模式都可消费
    dts({ tsconfigPath: "./tsconfig.json", outDir: "dist", entryRoot: "src" }),
  ],
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      },
      formats: ["es"],
    },
    outDir: "dist",
    sourcemap: true,
    minify: false,
    rolldownOptions: {
      external: [/^vue($|\/)/],
    },
  },
});
