<script setup>
import { ref } from 'vue';

const props = defineProps({
  // 绑定值
  modelValue: {
    type: String,
    default: ''
  },
  // 占位符
  placeholder: {
    type: String,
    default: ''
  },
  // 行数
  rows: {
    type: [String, Number],
    default: 4
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 自动获取焦点
  autofocus: {
    type: Boolean,
    default: false
  },
  // 最大长度
  maxlength: {
    type: Number,
    default: undefined
  },
  // 显示字数统计
  showCount: {
    type: Boolean,
    default: false
  },
  // 只读
  readonly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'keydown']);

const focused = ref(false);
const textareaRef = ref(null);

function handleInput(e) {
  emit('update:modelValue', e.target.value);
  emit('input', e);
}

function handleFocus(e) {
  focused.value = true;
  emit('focus', e);
}

function handleBlur(e) {
  focused.value = false;
  emit('blur', e);
}

function handleKeydown(e) {
  emit('keydown', e);
}

function focus() {
  textareaRef.value?.focus();
}

function blur() {
  textareaRef.value?.blur();
}

defineExpose({
  focus,
  blur
});
</script>
<script>
export default {
  name: "ATextarea",
};
</script>

<template>
  <div 
    class="a-textarea-wrapper"
    :class="{ 
      'a-textarea-focused': focused,
      'a-textarea-disabled': disabled
    }"
  >
    <textarea
      ref="textareaRef"
      class="a-textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :readonly="readonly"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    ></textarea>
    <span v-if="showCount && maxlength" class="a-textarea-count">
      {{ modelValue.length }}/{{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
.a-textarea-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  background-image: none;
  border-radius: 2px;
  transition: all 0.3s;
}

.a-textarea {
  box-sizing: border-box;
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  background-image: none;
  border-radius: 2px;
  transition: all 0.3s;
  resize: vertical;
  outline: none;
  height: 100%;
  border: none;
  padding: 14px 16px;
  line-height: 1.6;
  color: #2d3748;
  background: #fafafa;
  resize: none;
  max-height: 150px;
}

.a-textarea:hover {
  border-color: #40a9ff;
  border-right-width: 1px;
}

.a-textarea::placeholder {
  color: #bfbfbf;
}

.a-textarea-disabled .a-textarea {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 1;
}

.a-textarea-disabled .a-textarea:hover {
  border-color: #d9d9d9;
}

.a-textarea-count {
  position: absolute;
  right: 11px;
  bottom: 8px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
  pointer-events: none;
}
</style>