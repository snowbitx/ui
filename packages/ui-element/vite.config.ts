import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";

// rolldown-vite 下 rollupOptions 已被忽略，external 必须写在 build.rolldownOptions
// peerDeps + workspace 依赖保持 external，使用方自行安装
const externals = [
  /^vue($|\/)/,
  /^@cynnie\/ui-core($|\/)/,
  /^element-plus($|\/)/,
  /^@element-plus/,
];

const componentEntry = (name: string) =>
  fileURLToPath(new URL(`./src/components/${name}/index.vue`, import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 源码相对导入均带 .js / .vue 扩展名（NodeNext 规范），生成的 d.ts 原样保留
    dts({ tsconfigPath: "./tsconfig.json", outDir: "dist", entryRoot: "src" }),
  ],
  build: {
    lib: {
      // 入口：主入口 + 每个深路径导出一个文件，与 exports 一一对应
      entry: {
        index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        // 键带 /index 后缀，使产物为 dist/components/Xxx/index.js，与 exports 一致
        "components/ProTable/index": componentEntry("ProTable"),
        "components/ProFormBuilder/index": componentEntry("ProFormBuilder"),
        "components/ProButton/index": componentEntry("ProButton"),
        "components/ProInput/index": componentEntry("ProInput"),
        "components/ProSelect/index": componentEntry("ProSelect"),
        "components/ProCheckboxGroup/index": componentEntry("ProCheckboxGroup"),
        "components/ProRadioGroup/index": componentEntry("ProRadioGroup"),
        "components/ProModal/index": componentEntry("ProModal"),
        "components/ProConfirmButton/index": componentEntry("ProConfirmButton"),
        "components/ProDescriptions/index": componentEntry("ProDescriptions"),
        "utils/openDialog": fileURLToPath(
          new URL("./src/utils/openDialog.ts", import.meta.url),
        ),
      },
      formats: ["es"],
    },
    outDir: "dist",
    sourcemap: true,
    minify: false,
    rolldownOptions: {
      external: externals,
    },
  },
});
