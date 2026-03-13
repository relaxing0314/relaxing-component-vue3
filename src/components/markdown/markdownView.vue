<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { addClassToImageList, beautifyA, beautifyTable } from './utils'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  maxHeight: {
    type: [String, Number],
    default: 'none',
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
})

const containerStyle = computed(() => {
  const style = {
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
    overflowY: props.maxHeight !== 'none' ? 'auto' : 'visible',
  }
  return style
})

const themeClass = computed(() => {
  return props.theme === 'dark' ? 'markdown-dark' : 'markdown-light'
})

const containerRef = ref(null)

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  gfm: true,
  breaks: true,
  headerIds: true,
  langPrefix: 'hljs language-',
})

function processEmbeddedMarkdown(content) {
  const markdownCodeBlockRegex = /```(?:markdown|md)\n([\s\S]*?)\n```/g
  return content.replace(markdownCodeBlockRegex, (match, markdownContent) => {
    return marked(markdownContent.trim())
  })
}

const htmlContent = computed(() => {
  const data = props.content || ''
  const processedData = processEmbeddedMarkdown(data)
  return marked(processedData)
})

function processUndefinedLanguageBlocks() {
  if (!containerRef.value)
    return

  // 查找所有language-undefined的代码块
  const undefinedLangBlocks = containerRef.value.querySelectorAll('.language-undefined')
  undefinedLangBlocks.forEach((block) => {
    block.classList.remove('language-undefined')
    block.classList.add('language-plaintext')
  })
}

watch(() => htmlContent.value, () => {
  viewOptimize()
})

function viewOptimize() {
  nextTick(() => {
    if (containerRef.value) {
      beautifyA(containerRef.value)
      addClassToImageList(containerRef.value)
      beautifyTable(containerRef.value)

      processUndefinedLanguageBlocks()
    }
  })
}
onMounted(() => {
  viewOptimize()
})
</script>

<script>
export default {
  name: "MarkdownView",
};
</script>

<template>
  <div
    ref="containerRef"
    class="markdown-container"
    :class="[themeClass, { 'markdown-bordered': props.bordered }]"
    :style="containerStyle"
  >
    <div
      v-highlight
      class="markdown-content"
      v-html="htmlContent"
    />
  </div>
</template>

<style scoped>
.markdown-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.35;
  position: relative;
  transition: all 0.3s ease;
}

.markdown-dark {
  background-color: #0d1117;
  color: #e6edf3;
}
/* 滚动条样式 */
.markdown-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.markdown-container.markdown-light::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.markdown-container.markdown-light::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
}
.markdown-container.markdown-light::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
.markdown-container.markdown-dark::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
.markdown-container.markdown-dark::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.3s ease;
}
.markdown-container.markdown-dark::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
.markdown-container.markdown-light.markdown-bordered {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px 10px;
}
.markdown-container.markdown-dark.markdown-bordered {
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 6px 10px;
}
/* markdown-content */
.markdown-container ::v-deep(.markdown-content) {
  font-size: 14px;
  line-height: 1.35;
  word-wrap: break-word;
}
/* 标题样式 */
.markdown-container ::v-deep(.markdown-content) h1, .markdown-container ::v-deep(.markdown-content) h2, .markdown-container ::v-deep(.markdown-content) h3, .markdown-container ::v-deep(.markdown-content) h4, .markdown-container ::v-deep(.markdown-content) h5, .markdown-container ::v-deep(.markdown-content) h6 {
  margin-top: 9px;
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 1.2;
}
/* 首个元素减少顶部边距 */
.markdown-container ::v-deep(.markdown-content) > *:first-child {
  margin-top: 0;
}
/* 相邻元素间间距处理 */
.markdown-container ::v-deep(.markdown-content) h1 + p, .markdown-container ::v-deep(.markdown-content) h2 + p, .markdown-container ::v-deep(.markdown-content) h3 + p, .markdown-container ::v-deep(.markdown-content) h4 + p, .markdown-container ::v-deep(.markdown-content) h5 + p, .markdown-container ::v-deep(.markdown-content) h6 + p,
  .markdown-container ::v-deep(.markdown-content) h1 + ul, .markdown-container ::v-deep(.markdown-content) h2 + ul, .markdown-container ::v-deep(.markdown-content) h3 + ul, .markdown-container ::v-deep(.markdown-content) h4 + ul, .markdown-container ::v-deep(.markdown-content) h5 + ul, .markdown-container ::v-deep(.markdown-content) h6 + ul,
  .markdown-container ::v-deep(.markdown-content) h1 + ol, .markdown-container ::v-deep(.markdown-content) h2 + ol, .markdown-container ::v-deep(.markdown-content) h3 + ol, .markdown-container ::v-deep(.markdown-content) h4 + ol, .markdown-container ::v-deep(.markdown-content) h5 + ol, .markdown-container ::v-deep(.markdown-content) h6 + ol {
  margin-top: 2px;
}
.markdown-container ::v-deep(.markdown-content) h1 {
  font-size: 1.65em;
  padding-bottom: 0.2em;
  margin-bottom: 8px;
}
.markdown-container ::v-deep(.markdown-content) h2 {
  font-size: 1.25em;
  padding-bottom: 6px;
  margin-bottom: 6px;
}
.markdown-container ::v-deep(.markdown-content) h3 {
  font-size: 1.15em;
  margin-bottom: 8px;
}
.markdown-container ::v-deep(.markdown-content) h4 {
  font-size: 1em;
  margin-bottom: 8px;
}
/* 段落和列表样式 */
.markdown-container ::v-deep(.markdown-content) p {
  margin-top: 0;
  line-height: 20px;
  margin-bottom: 8px;
}
.markdown-container ::v-deep(.markdown-content) ul, .markdown-container ::v-deep(.markdown-content) ol {
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 1.5em;
}
.markdown-container ::v-deep(.markdown-content) li {
  margin-bottom: 0;
  padding-bottom: 0;
  line-height: 1.25;
  display: list-item;
}
.markdown-container ::v-deep(.markdown-content) li + li {
  margin-top: 10px;
}
/* 列表嵌套优化 */
.markdown-container ::v-deep(.markdown-content) ul ul, .markdown-container ::v-deep(.markdown-content) ul ol, .markdown-container ::v-deep(.markdown-content) ol ul, .markdown-container ::v-deep(.markdown-content) ol ol {
  margin-top: 5px;
  margin-bottom: 5px;
}
/* 引用块样式 */
.markdown-container ::v-deep(.markdown-content) blockquote {
  padding: 0.2em 0.7em;
  color: #6e7781;
  margin: 0 0 8px 0;
}
.markdown-container ::v-deep(.markdown-content) blockquote p {
  margin: 0.1em 0;
}
/* 代码样式 */
.markdown-container ::v-deep(.markdown-content) code {
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  padding: 0.08em 0.2em;
  margin: 0;
  font-size: 0.85em;
  border-radius: 3px;
}
.markdown-container ::v-deep(.markdown-content) pre {
  margin-top: 0;
  margin-bottom: 5px;
  padding: 8px 10px;
  overflow: auto;
  font-size: 0.85em;
  line-height: 1.25;
  border-radius: 4px;
}
.markdown-container ::v-deep(.markdown-content) pre code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  background-color: transparent;
  border: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
/* 链接样式 */
.markdown-container ::v-deep(.markdown-content) a {
  text-decoration: none;
  transition: color 0.2s ease;
}
.markdown-container ::v-deep(.markdown-content) a:hover {
  text-decoration: underline;
}
/* 图片样式 */
.markdown-container ::v-deep(.markdown-content) img {
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 4px 0;
}
/* 表格样式 */
.markdown-container ::v-deep(.markdown-content) .table-wrapper {
  overflow-x: auto;
  margin-bottom: 5px;
}
/* 滚动条样式 */
.markdown-container ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.markdown-container ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-track {
  border-radius: 4px;
}
.markdown-container ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-thumb {
  border-radius: 4px;
  transition: all 0.3s ease;
}
.markdown-container ::v-deep(.markdown-content) table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 8px 0;
  display: table;
  overflow: auto;
}
.markdown-container ::v-deep(.markdown-content) table th, .markdown-container ::v-deep(.markdown-content) table td {
  padding: 4px 7px;
}
.markdown-container ::v-deep(.markdown-content) table th {
  font-weight: 600;
}
.markdown-container ::v-deep(.markdown-content) table tr:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.03);
}
.markdown-container ::v-deep(.markdown-content) table tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
/* 水平线样式 */
.markdown-container ::v-deep(.markdown-content) hr {
  height: 1px;
  padding: 0;
  margin: 6px 0;
  border: 0;
}
/* 复选框样式 */
.markdown-container ::v-deep(.markdown-content) input[type="checkbox"] {
  margin-right: 3px;
  vertical-align: middle;
}
/* 列表项内的段落处理 */
.markdown-container ::v-deep(.markdown-content) li p {
  margin-top: 5px;
  margin-bottom: 5px;
}
/* light */
.markdown-light ::v-deep(.markdown-content) {
  color: #24292f;
}
/* 文本选中样式 */
.markdown-light ::v-deep(.markdown-content) ::selection {
  background-color: rgba(0, 120, 215, 0.2);
  color: inherit;
}
/* 标题样式 */
.markdown-light ::v-deep(.markdown-content) h1, .markdown-light ::v-deep(.markdown-content) h2, .markdown-light ::v-deep(.markdown-content) h3, .markdown-light ::v-deep(.markdown-content) h4, .markdown-light ::v-deep(.markdown-content) h5, .markdown-light ::v-deep(.markdown-content) h6 {
  color: #1a1a1a;
}
.markdown-light ::v-deep(.markdown-content) h1 {
  border-bottom: 1px solid #e5e7eb;
}
.markdown-light ::v-deep(.markdown-content) h2 {
  border-bottom: 1px solid #e5e7eb;
}
/* 引用块样式 */
.markdown-light ::v-deep(.markdown-content) blockquote {
  border-left: 3px solid #dfe2e5;
  background-color: #f6f8fa;
}
/* 代码样式 */
.markdown-light ::v-deep(.markdown-content) code {
  background-color: #f6f8fa;
  border: 1px solid #e5e7eb;
}
.markdown-light ::v-deep(.markdown-content) pre {
  background-color: #f6f8fa;
}
/* 链接样式 */
.markdown-light ::v-deep(.markdown-content) a {
  color: #0969da;
}
.markdown-light ::v-deep(.markdown-content) a:hover {
  color: #1877F2;
}
/* 表格样式 */
.markdown-light ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}
.markdown-light ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
.markdown-light ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
.markdown-light ::v-deep(.markdown-content) table th, .markdown-light ::v-deep(.markdown-content) table td {
  border: 1px solid #eaeaea;
}
.markdown-light ::v-deep(.markdown-content) table th {
  background-color: #f6f8fa;
  color: #24292f;
}
/* 水平线样式 */
.markdown-light ::v-deep(.markdown-content) hr {
  background-color: #e5e7eb;
}
/* dark */
.markdown-dark ::v-deep(.markdown-content) {
  color: #e6edf3;
}
/* 文本选中样式 */
.markdown-dark ::v-deep(.markdown-content) ::selection {
  background-color: rgba(56, 139, 253, 0.4);
  color: inherit;
}
/* 标题样式 */
.markdown-dark ::v-deep(.markdown-content) h1, .markdown-dark ::v-deep(.markdown-content) h2, .markdown-dark ::v-deep(.markdown-content) h3, .markdown-dark ::v-deep(.markdown-content) h4, .markdown-dark ::v-deep(.markdown-content) h5, .markdown-dark ::v-deep(.markdown-content) h6 {
  color: #ffffff;
}
.markdown-dark ::v-deep(.markdown-content) h1 {
  border-bottom: 1px solid #30363d;
}
.markdown-dark ::v-deep(.markdown-content) h2 {
  border-bottom: 1px solid #30363d;
}
/* 引用块样式 */
.markdown-dark ::v-deep(.markdown-content) blockquote {
  border-left: 3px solid #30363d;
  background-color: #161b22;
}
/* 代码样式 */
.markdown-dark ::v-deep(.markdown-content) code {
  background-color: #161b22;
  border: 1px solid #30363d;
}
.markdown-dark ::v-deep(.markdown-content) pre {
  background-color: #161b22;
}
/* 链接样式 */
.markdown-dark ::v-deep(.markdown-content) a {
  color: #58a6ff;
}
.markdown-dark ::v-deep(.markdown-content) a:hover {
  color: #79c0ff;
}
/* 表格样式 */
.markdown-dark ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.markdown-dark ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
.markdown-dark ::v-deep(.markdown-content) .table-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
.markdown-dark ::v-deep(.markdown-content) table th, .markdown-dark ::v-deep(.markdown-content) table td {
  border: 1px solid #30363d;
}
.markdown-dark ::v-deep(.markdown-content) table th {
  background-color: #161b22;
  color: #ffffff;
}
/* 水平线样式 */
.markdown-dark ::v-deep(.markdown-content) hr {
  background-color: #30363d;
}
/* 在小屏幕上进一步紧凑显示 */
@media (max-width: 640px) {
  .markdown-container ::v-deep(.markdown-content) {
    font-size: 13px;
  }
  .markdown-container ::v-deep(.markdown-content) h1 {
    font-size: 1.5em;
  }
  .markdown-container ::v-deep(.markdown-content) h2 {
    font-size: 1.2em;
  }
  .markdown-container ::v-deep(.markdown-content) h3 {
    font-size: 1.1em;
  }
  .markdown-container ::v-deep(.markdown-content) ul, .markdown-container ::v-deep(.markdown-content) ol {
    padding-left: 1.2em;
  }
  .markdown-container ::v-deep(.markdown-content) pre {
    padding: 6px 8px;
  }
  .markdown-container ::v-deep(.markdown-content) blockquote {
    padding: 0.15em 0.6em;
  }
  .markdown-container ::v-deep(.markdown-content) table th, .markdown-container ::v-deep(.markdown-content) table td {
      padding: 3px 5px;
    }
  }
</style>

<style>
.markdown-content{
  .image-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .image-item{
      display: block;
      height: 192px;
      margin: 0;
      padding: 4px;
    }
  }
  .link-image-box{
    width: 240px;
    border: 1px solid #e6e4e4;
    border-radius: 8px;
    .link-image-title{
      padding: 10px;
      font-weight: 600;
      font-size: 16px;
      border-bottom: 1px solid #e6e4e4;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      color: rgba(0, 0, 0, 0.88);
    }
    .link-image{
      width: 240px;
    }
  }
}
</style>
