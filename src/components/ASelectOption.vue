<script setup>
const props = defineProps({
  // 选项值
  value: {
    type: [String, Number],
    required: true
  },
  // 选项标签
  label: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否选中
  selected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select']);

function handleClick() {
  emit('select', {
    value: props.value,
    label: props.label || props.value
  });
}
</script>
<script>
export default {
  name: "ASelectOption",
};
</script>

<template>
  <li
    class="a-select-option"
    :class="{
      'a-select-option-disabled': disabled,
      'a-select-option-selected': selected
    }"
    @click="!disabled && handleClick()"
  >
    <slot>{{ label || value }}</slot>
  </li>
</template>

<style scoped>
.a-select-option {
  position: relative;
  display: block;
  min-height: 32px;
  padding: 5px 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: normal;
  line-height: 22px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.a-select-option:hover {
  background-color: #f5f5f5;
}

.a-select-option-selected {
  color: #1890ff;
  font-weight: 600;
  background-color: #e6f7ff;
}

.a-select-option-disabled {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

.a-select-option-disabled:hover {
  background-color: transparent;
}
</style>