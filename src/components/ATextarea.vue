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
    <span
      v-if="showCount && maxlength"
      class="a-textarea-count"
    >
      {{ modelValue.length }}/{{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
.a-textarea-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.a-textarea {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 100%;
  min-height: 32px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
  resize: vertical;
  outline: none;
}

.a-textarea:hover {
  border-color: #4096ff;
}

.a-textarea-wrapper.a-textarea-focused .a-textarea {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  outline: 0;
}

.a-textarea::placeholder {
  color: rgba(0, 0, 0, 0.25);
}

.a-textarea-wrapper.a-textarea-disabled .a-textarea {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.a-textarea-wrapper.a-textarea-disabled .a-textarea:hover {
  border-color: #d9d9d9;
}

.a-textarea-count {
  position: absolute;
  right: 11px;
  bottom: 5px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
</style>