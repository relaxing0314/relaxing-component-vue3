<script setup>
import { inject, computed, ref } from 'vue';

const props = defineProps({
  // 面板头内容
  header: {
    type: String,
    default: ''
  },
  // 与activeKey对应的唯一标识
  itemKey: {
    type: [String, Number],
    required: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示箭头
  showArrow: {
    type: Boolean,
    default: true
  },
  // 右上角额外元素
  extra: {
    type: [String, Object]
  }
});

const emit = defineEmits(['click', 'motionEnd']);

const collapse = inject('collapse', {
  isActive: () => false,
  togglePanel: () => {},
  expandIconPosition: 'right',
  expandIcon: '',
  collapseIcon: ''
});

const contentRef = ref(null);

const isActive = computed(() => {
  return collapse.isActive ? collapse.isActive(props.itemKey) : false;
});

const expandIconPosition = computed(() => {
  return collapse.expandIconPosition || 'right';
});

const customExpandIcon = computed(() => {
  return collapse.expandIcon;
});

const customCollapseIcon = computed(() => {
  return collapse.collapseIcon;
});

function toggle() {
  if (collapse.togglePanel) {
    collapse.togglePanel(props.itemKey);
  }
  emit('click', props.itemKey);
}

function onMotionEnd() {
  emit('motionEnd');
}
</script>
<script>
export default {
  name: "ACollapsePanel",
};
</script>

<template>
  <div
    class="collapse-panel"
    :class="{
      'collapse-panel-active': isActive,
      'collapse-panel-disabled': disabled,
      'collapse-panel-no-arrow': !showArrow
    }"
  >
    <div class="collapse-panel-header" @click="!disabled && toggle()">
      <div class="collapse-panel-header-text">
        <slot name="header">{{ header }}</slot>
      </div>
      <div class="collapse-panel-extra" v-if="$slots.extra || extra" @click.stop>
        <slot name="extra">{{ extra }}</slot>
      </div>
      <div
        class="collapse-panel-arrow"
        v-if="showArrow"
        :class="{ 'collapse-panel-arrow-left': expandIconPosition === 'left' }"
      >
        <span
          class="arrow-icon"
          v-if="!$slots.expandIcon && !customExpandIcon && !customCollapseIcon"
        >
          <svg v-if="isActive" viewBox="0 0 1024 1024" class="icon">
            <path
              d="M512 704L195.2 387.2c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0L512 614.4l272-272c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L512 704z"
            ></path>
          </svg>
          <svg v-else viewBox="0 0 1024 1024" class="icon">
            <path
              d="M387.2 828.8c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8L614.4 512 342.4 240c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l316.8 316.8c12.8 12.8 12.8 32 0 44.8L387.2 828.8z"
            ></path>
          </svg>
        </span>
        <slot name="expandIcon">
          <component v-if="isActive && customExpandIcon" :is="customExpandIcon" />
          <component v-else-if="!isActive && customCollapseIcon" :is="customCollapseIcon" />
        </slot>
      </div>
    </div>
    <div class="collapse-panel-content" v-show="isActive" ref="contentRef">
      <div class="collapse-panel-content-box">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapse-panel {
  border-bottom: 1px solid #d9d9d9;
}

.collapse-panel:last-child {
  border-bottom: none;
}

.collapse-panel-header {
  position: relative;
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.collapse-panel-header:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.collapse-panel-arrow {
  margin-right: 12px;
  font-size: 12px;
  transition: transform 0.2s;
}

.collapse-panel-arrow-left {
  order: -1;
}

.collapse-panel-arrow .icon {
  width: 12px;
  height: 12px;
  fill: currentColor;
  transition: transform 0.2s;
}

.collapse-panel-header-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.collapse-panel-extra {
  margin-left: auto;
  padding-left: 16px;
}

.collapse-panel-content {
  overflow: hidden;
  color: rgba(0, 0, 0, 0.88);
  background-color: #ffffff;
  transition: height 0.2s ease-in-out;
}

.collapse-panel-content-box {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.collapse-panel-active .collapse-panel-header {
  font-weight: 600;
}

.collapse-panel-disabled .collapse-panel-header {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
}

.collapse-panel-no-arrow .collapse-panel-header {
  padding-left: 16px;
}
</style>
