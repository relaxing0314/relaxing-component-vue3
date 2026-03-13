<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  // 绑定值
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  // 选项列表
  options: {
    type: Array,
    default: () => []
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请选择'
  },
  // 是否有边框
  bordered: {
    type: Boolean,
    default: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否允许清除
  allowClear: {
    type: Boolean,
    default: false
  },
  // 下拉菜单样式
  dropdownStyle: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const dropdownVisible = ref(false);
const focused = ref(false);
const selectRef = ref(null);

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue);
});

const selectedLabel = computed(() => {
  return selectedOption.value ? selectedOption.value.label : '';
});

function toggleDropdown(e) {
  e.stopPropagation();
  if (props.disabled) return;
  dropdownVisible.value = !dropdownVisible.value;
  focused.value = dropdownVisible.value;
  
  // 如果是显示下拉框，计算并设置下拉框位置
  if (dropdownVisible.value) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
}

function handleOptionClick(option) {
  if (props.disabled) return;
  emit('update:modelValue', option.value);
  dropdownVisible.value = false;
  emit('change', option.value);
}

function handleOutsideClick(e) {
  e.stopPropagation();
  
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    dropdownVisible.value = false;
    focused.value = false;
  }
}

function updateDropdownPosition() {
  if (!selectRef.value) return;
  const dropdown = selectRef.value.querySelector('.a-select-dropdown');
  if (!dropdown) return;
  const rect = selectRef.value.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom}px`;
  dropdown.style.left = `${rect.left}px`;
  dropdown.style.width = `${rect.width}px`;
  dropdown.style.display = 'block';
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>
<script>
export default {
  name: "ASelect",
};
</script>

<template>
  <div 
    class="a-select" 
    ref="selectRef"
    :class="{ 
      'a-select-focused': focused,
      'a-select-bordered': bordered,
      'a-select-open': dropdownVisible,
      'a-select-disabled': disabled
    }"
    @click="toggleDropdown"
  >
    <div class="a-select-selector">
      <span class="a-select-selection-item" v-if="selectedOption">
        <slot name="optionContent" :option="selectedOption">
          {{ selectedOption.label }}
        </slot>
      </span>
      <span class="a-select-selection-placeholder" v-else>
        {{ placeholder }}
      </span>
    </div>
    <span class="a-select-arrow">
      <span class="a-select-arrow-icon">
        <svg viewBox="64 64 896 896" focusable="false" data-icon="down" aria-hidden="true">
          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
        </svg>
      </span>
    </span>
    <div class="a-select-dropdown" v-show="dropdownVisible" :style="[dropdownStyle, { position: 'fixed' }]">
      <ul class="a-select-dropdown-menu">
        <li
          v-for="option in options"
          :key="option.value"
          :class="[
            'a-select-dropdown-menu-item', 
            { 'a-select-dropdown-menu-item-selected': option.value === modelValue }
          ]"
          @click.stop="handleOptionClick(option)"
        >
          <slot name="optionContent" :option="option">
            {{ option.label }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.a-select {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 100px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 6px;
  transition: all 0.2s;
}

.a-select-bordered .a-select-selector {
  border: 1px solid #d9d9d9;
}

.a-select-bordered:hover .a-select-selector {
  border-color: #4096ff;
}

.a-select-focused .a-select-selector,
.a-select-open .a-select-selector {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  outline: 0;
}

.a-select-open .a-select-arrow-icon {
  transform: rotate(180deg);
}

.a-select-disabled {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
  background: #f5f5f5;
}

.a-select-disabled .a-select-selector {
  background: #f5f5f5;
  border-color: #d9d9d9 !important;
}

.a-select-selector {
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 25px 0 11px;
  background-color: inherit;
  border-radius: 6px;
  transition: all 0.2s;
}

.a-select-selection-item {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.a-select-selection-placeholder {
  color: rgba(0, 0, 0, 0.25);
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.a-select-arrow {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 11px;
  height: 12px;
  margin-top: -6px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  line-height: 1;
  text-align: center;
  pointer-events: none;
}

.a-select-arrow-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  fill: currentColor;
  transition: transform 0.3s;
}

.a-select-dropdown {
  position: fixed;
  margin-top: 4px;
  padding: 4px 0;
  background-color: #ffffff;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 1050;
  max-height: 256px;
  min-width: 200px;
  overflow: hidden;
}

.a-select-dropdown-menu {
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 248px; /* 256 - 4*2 */
  overflow-y: auto;
}

.a-select-dropdown-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 5px 12px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: normal;
  line-height: 22px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 4px;
  margin: 0 4px;
}

.a-select-dropdown-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.a-select-dropdown-menu-item-selected {
  font-weight: 600;
  background-color: rgba(5, 145, 255, 0.1);
}
</style>