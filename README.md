# relaxing-component-vue3

一个基于 Vue 3 的轻量级组件库，旨在提供一组简洁、易用的 UI 组件。

[![npm](https://img.shields.io/npm/v/relaxing-component-vue3.svg)](https://www.npmjs.com/package/relaxing-component-vue3)

## ✨ 特性

-   基于 Vue 3 Composition API
-   支持 TypeScript
-   支持按需引入，减小打包体积
-   提供本地示例，方便开发和预览

## 📦 安装

```bash
npm install relaxing-component-vue3
```

## 🚀 快速上手

### 全局引入

在你的 `main.js` 或 `main.ts` 中引入并注册插件。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import RelaxingComponentVue3 from 'relaxing-component-vue3'
// 引入样式
import 'relaxing-component-vue3/dist/relaxing-component-vue3.css'

const app = createApp(App)

// 全局注册所有组件
app.use(RelaxingComponentVue3)

app.mount('#app')
```

### 按需引入

你也可以只引入需要的组件，以优化最终的打包大小。

```vue
<template>
  <AButton>这是一个按需引入的按钮</AButton>
</template>

<script setup>
import { AButton } from 'relaxing-component-vue3'
// 别忘了单独引入样式
import 'relaxing-component-vue3/dist/relaxing-component-vue3.css'
</script>
```

## 🧩 可用组件

-   `AButton`: 按钮
-   `ASelect`: 选择器
-   `ATextarea`: 文本域
-   `ACollapse` & `ACollapse.Panel`: 折叠面板
-   `AsyncImg`: 异步图片加载
-   `Message`: 全局消息提示（通过 `this.$message` 或 `import { Message }` 调用）

## 📖 API 使用示例

### ASelect

```vue
<template>
  <ASelect
    v-model="selectedValue"
    placeholder="请选择"
    :options="[
      { value: 'option1', label: '选项一' },
      { value: 'option2', label: '选项二' },
    ]"
  />
</template>

<script setup>
import { ref } from 'vue'
const selectedValue = ref('')
</script>
```

### ACollapse

```vue
<template>
  <ACollapse>
    <ACollapse.Panel name="1" header="面板一">
      这里是面板一的内容。
    </ACollapse.Panel>
    <ACollapse.Panel name="2" header="面板二">
      这里是面板二的内容。
    </ACollapse.Panel>
  </ACollapse>
</template>
```

## 🔧 本地开发

本项目提供了一个示例页面，用于开发和调试组件。

1.  **克隆仓库**
    ```bash
    git clone https://github.com/relaxing0314/relaxing-component-vue3.git
    cd relaxing-component-vue3
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **运行本地示例**
    ```bash
    npm run dev
    ```
    访问 http://localhost:5173 (或你的 Vite 默认端口) 即可看到组件示例页面。

4.  **打包组件库**
    ```bash
    npm run build
    ```
    该命令会执行库模式打包，产物在 `dist` 目录下。

5.  **打包示例站点**
    ```bash
    npm run build:demo
    ```
    该命令会将示例页面打包成一个静态站点，同样输出到 `dist` 目录。

