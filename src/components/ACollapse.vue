<script setup>
import { ref, watch, provide } from 'vue';
import ACollapsePanel from './ACollapsePanel.vue';

const props = defineProps({
  // 手风琴模式，只允许展开一个面板
  accordion: {
    type: Boolean,
    default: false
  },
  // 当前激活的面板的key
  activeKey: {
    type: [Array, String, Number]
  },
  // 默认激活的面板的key
  defaultActiveKey: {
    type: [Array, String, Number]
  },
  // 是否有边框
  bordered: {
    type: Boolean,
    default: true
  },
  // 自定义展开图标
  expandIcon: {
    type: [String, Object],
    default: ''
  },
  // 自定义折叠图标
  collapseIcon: {
    type: [String, Object],
    default: ''
  },
  // 展开图标的位置
  expandIconPosition: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  }
});

const emit = defineEmits(['change']);

const currentActiveKey = ref(
  props.activeKey || props.defaultActiveKey || (props.accordion ? '' : [])
);

watch(
  () => props.activeKey,
  (val) => {
    if (val !== undefined) {
      currentActiveKey.value = val;
    }
  }
);

function togglePanel(panelKey) {
  let activeKey = currentActiveKey.value;

  if (props.accordion) {
    activeKey = activeKey === panelKey ? '' : panelKey;
  } else {
    activeKey = [...(Array.isArray(activeKey) ? activeKey : [activeKey])];
    const index = activeKey.indexOf(panelKey);

    if (index > -1) {
      activeKey.splice(index, 1);
    } else {
      activeKey.push(panelKey);
    }
  }

  currentActiveKey.value = activeKey;
  emit('change', activeKey);
}

function isActive(panelKey) {
  const activeKey = currentActiveKey.value;

  if (props.accordion) {
    return activeKey === panelKey;
  } else {
    return (Array.isArray(activeKey) ? activeKey : [activeKey]).includes(panelKey);
  }
}

provide('collapse', {
  isActive,
  togglePanel,
  get expandIconPosition() {
    return props.expandIconPosition;
  },
  get expandIcon() {
    return props.expandIcon;
  },
  get collapseIcon() {
    return props.collapseIcon;
  }
});

defineExpose({
  Panel: ACollapsePanel
});
</script>
<script>
export default {
  name: "ACollapse",
};
</script>

<template>
  <div
    class="collapse"
    :class="{
      'collapse-accordion': accordion,
      'collapse-borderless': !bordered
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.collapse {
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
}
.collapse.collapse-borderless {
  border: 0;
  background-color: transparent;
}
</style>
