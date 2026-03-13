<template>
  <div class="demo-page">
    <header class="demo-header">
      <h1>relaxing-component-vue3 示例</h1>
      <p>下面展示的是已发布插件的基本使用方式。</p>
    </header>

    <section class="demo-section">
      <h2>AButton 按钮</h2>
      <AButton @click="handleClick">示例按钮</AButton>
    </section>

    <section class="demo-section">
      <h2>ASelect 选择器</h2>
      <ASelect
        v-model="selected"
        placeholder="请选择"
        :options="[
          {value: 'option1', label: '选项一'},
          {value: 'option2', label: '选项二'},
        ]"
      >
      </ASelect>
      <p class="demo-result">当前选择：{{ selected || "暂无" }}</p>
    </section>

    <section class="demo-section">
      <h2>ATextarea 文本域</h2>
      <ATextarea
        v-model="text"
        placeholder="请输入一些内容"
        :showCount="true"
        :maxlength="100"
      />
      <p class="demo-result">当前内容：{{ text || "暂无" }}</p>
    </section>

    <section class="demo-section">
      <h2>ACollapse 折叠面板</h2>
      <ACollapse>
        <ACollapse.Panel name="1" header="面板一">
          这里是面板一的内容。
        </ACollapse.Panel>
        <ACollapse.Panel name="2" header="面板二">
          这里是面板二的内容。
        </ACollapse.Panel>
      </ACollapse>
    </section>

    <section class="demo-section">
      <h2>MarkdownView Markdown 渲染器</h2>
      <MarkdownView :content="markdownStr" />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  AButton,
  ASelect,
  ATextarea,
  ACollapse,
  MarkdownView,
} from "relaxing-component-vue3";

const selected = ref("");
const text = ref("");
const markdownStr = ref(`以下是一道经典的鱼香肉丝的做法和图片\n\n### 鱼香肉丝的做法\n**食材：**\n- 瘦肉（猪里脊）200克\n- 胡萝卜1根\n- 青椒1个\n- 黑木耳适量\n- 郫县豆瓣酱1汤匙\n- 蒜末、姜末适量\n\n### 菜品图片\n![鱼香肉丝图片](https://file-res.mxnzp.com/cookbook_file/6/e/b/d/3/a/7/d/f34de1ea7f114097b114ae1c1f6567ba.jpg)\n\n这道菜酸甜微辣，非常下饭，希望您喜欢！`)

const handleClick = () => {
  // 这里可以结合 Message 组件进行消息提示
  console.log("AButton clicked");
};
</script>

<style scoped>
.demo-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.demo-header {
  margin-bottom: 32px;
}

.demo-header h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.demo-header p {
  margin: 0;
  color: #666;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section h2 {
  margin-bottom: 12px;
  font-size: 20px;
}

.demo-result {
  margin-top: 8px;
  color: #555;
}
</style>

