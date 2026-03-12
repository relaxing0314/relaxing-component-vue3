<script setup>
import { computed } from 'vue';

const props = defineProps({
  // 按钮类型
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'dashed', 'text', 'link'].includes(value)
  },
  // HTML 类型
  htmlType: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  // 按钮尺寸
  size: {
    type: String,
    default: 'middle',
    validator: (value) => ['large', 'middle', 'small'].includes(value)
  },
  // 按钮形状
  shape: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'circle', 'round'].includes(value)
  },
  // 是否为危险按钮
  danger: {
    type: Boolean,
    default: false
  },
  // 按钮是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否加载中
  loading: {
    type: Boolean,
    default: false
  },
  // 幽灵按钮
  ghost: {
    type: Boolean,
    default: false
  },
  // 是否为块级元素
  block: {
    type: Boolean,
    default: false
  },
  // 链接地址
  href: {
    type: String,
    default: ''
  },
  // 图标位置
  iconPosition: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'end'].includes(value)
  },
  // 颜色
  color: {
    type: String,
    default: '',
    validator: (value) => !value || ['error', 'warning', 'success', 'primary', 'default'].includes(value)
  },
  // 前置图标
  preIcon: {
    type: [String, Object],
    default: null
  },
  // 后置图标
  postIcon: {
    type: [String, Object],
    default: null
  },
  // 图标大小
  iconSize: {
    type: Number,
    default: 14
  }
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  return [
    'a-button',
    `a-button-${props.type}`,
    `a-button-size-${props.size}`,
    {
      [`a-button-${props.shape}`]: props.shape !== 'default',
      'a-button-dangerous': props.danger,
      'a-button-disabled': props.disabled,
      'a-button-loading': props.loading,
      'a-button-ghost': props.ghost,
      'a-button-block': props.block,
      [`a-button-color-${props.color}`]: props.color && !props.type
    }
  ];
});

function handleClick(event) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  if (props.href) {
    window.location.href = props.href;
  }

  emit('click', event);
}
</script>
<script>
export default {
  name: "AButton",
};
</script>

<template>
  <button
    :class="buttonClasses"
    :type="htmlType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 加载状态图标 -->
    <span v-if="loading" class="a-button-loading-icon">
      <svg viewBox="0 0 1024 1024" class="loading-icon" data-icon="loading">
        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
      </svg>
    </span>
    
    <!-- 前置图标 -->
    <span v-if="preIcon && !loading" class="a-button-icon" :class="{'a-button-icon-left': true}">
      <slot name="preIcon">
        <component :is="preIcon" :style="{fontSize: `${iconSize}px`}" />
      </slot>
    </span>
    
    <!-- 按钮内容 -->
    <span class="a-button-text" v-if="$slots.default || $attrs.title">
      <slot></slot>
    </span>
    
    <!-- 后置图标 -->
    <span v-if="postIcon && !loading" class="a-button-icon" :class="{'a-button-icon-right': true}">
      <slot name="postIcon">
        <component :is="postIcon" :style="{fontSize: `${iconSize}px`}" />
      </slot>
    </span>
  </button>
</template>

<style scoped>
/* 基础按钮样式 */
.a-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  line-height: 1.5714285714285714;
  border-radius: 6px;
  padding: 4px 15px;
  font-size: 14px;
  height: 32px;
  min-width:32px;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
.a-button:focus {
  outline: 0;
}
/* 禁用状态 */
.a-button.a-button-disabled, .a-button[disabled] {
  cursor: not-allowed;
  border-color: #d9d9d9!important;
  color: rgba(0, 0, 0, 0.25)!important;
  background-color: rgba(0, 0, 0, 0.04) !important;
  box-shadow: none!important;
}
/* 尺寸 */
.a-button.a-button-size-large {
  padding: 6px 15px;
  font-size: 16px;
  height: 40px;
  border-radius: 8px;
}
.a-button.a-button-size-small {
  padding: 0px 7px;
  font-size: 14px;
  height: 24px;
  border-radius: 4px;
}
/* 按钮形状 */
.a-button.a-button-circle {
  min-width: 32px;
  padding: 0;
  border-radius: 50%;
}
.a-button.a-button-circle.a-button-size-large {
  min-width: 40px;
}
.a-button.a-button-circle.a-button-size-small {
  min-width: 24px;
}
.a-button.a-button-round {
  border-radius: 32px;
}
.a-button.a-button-round.a-button-size-large {
  border-radius: 40px;
}
.a-button.a-button-round.a-button-size-small {
  border-radius: 24px;
}
/* 块级按钮 */
.a-button.a-button-block {
  width: 100%;
}
/* 加载状态 */
.a-button.a-button-loading {
  pointer-events: none;
  position: relative;
}
/* 按钮类型 */
.a-button.a-button-default {
  background-color: #ffffff;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.88);
}
.a-button.a-button-default:hover, .a-button.a-button-default:focus {
  color: #4096ff;
  border-color: #4096ff;
}
.a-button.a-button-default:active {
  color: #0958d9;
  border-color: #0958d9;
}
.a-button.a-button-default.a-button-dangerous {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
.a-button.a-button-default.a-button-dangerous:hover, .a-button.a-button-default.a-button-dangerous:focus {
  color: #ff7875;
  border-color: #ff7875;
}
.a-button.a-button-default.a-button-dangerous:active {
  color: #d9363e;
  border-color: #d9363e;
}
.a-button.a-button-primary {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}
.a-button.a-button-primary:hover, .a-button.a-button-primary:focus {
  background-color: #4096ff;
  border-color: #4096ff;
}
.a-button.a-button-primary:active {
  background-color: #0958d9;
  border-color: #0958d9;
}
.a-button.a-button-primary.a-button-dangerous {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}
.a-button.a-button-primary.a-button-dangerous:hover, .a-button.a-button-primary.a-button-dangerous:focus {
  background-color: #ff7875;
  border-color: #ff7875;
}
.a-button.a-button-primary.a-button-dangerous:active {
  background-color: #d9363e;
  border-color: #d9363e;
}
.a-button.a-button-dashed {
  background-color: #ffffff;
  border-color: #d9d9d9;
  border-style: dashed;
  color: rgba(0, 0, 0, 0.88);
}
.a-button.a-button-dashed:hover, .a-button.a-button-dashed:focus {
  color: #4096ff;
  border-color: #4096ff;
}
.a-button.a-button-dashed:active {
  color: #0958d9;
  border-color: #0958d9;
}
.a-button.a-button-dashed.a-button-dangerous {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
.a-button.a-button-dashed.a-button-dangerous:hover, .a-button.a-button-dashed.a-button-dangerous:focus {
  color: #ff7875;
  border-color: #ff7875;
}
.a-button.a-button-dashed.a-button-dangerous:active {
  color: #d9363e;
  border-color: #d9363e;
}
.a-button.a-button-text {
  background-color: transparent;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.88);
}
.a-button.a-button-text:hover, .a-button.a-button-text:focus {
  background-color: rgba(0, 0, 0, 0.06);
}
.a-button.a-button-text:active {
  background-color: rgba(0, 0, 0, 0.15);
}
.a-button.a-button-text.a-button-dangerous {
  color: #ff4d4f;
}
.a-button.a-button-text.a-button-dangerous:hover, .a-button.a-button-text.a-button-dangerous:focus {
  background-color: #fff1f0;
}
.a-button.a-button-text.a-button-dangerous:active {
  background-color: #ffccc7;
}
.a-button.a-button-link {
  background-color: transparent;
  border-color: transparent;
  color: #1677ff;
  padding: 4px 0;
}
.a-button.a-button-link:hover, .a-button.a-button-link:focus {
  color: #69b1ff;
}
.a-button.a-button-link:active {
  color: #0958d9;
}
.a-button.a-button-link.a-button-dangerous {
  color: #ff4d4f;
}
.a-button.a-button-link.a-button-dangerous:hover, .a-button.a-button-link.a-button-dangerous:focus {
  color: #ff7875;
}
.a-button.a-button-link.a-button-dangerous:active {
  color: #d9363e;
}
/* 幽灵按钮 */
.a-button.a-button-ghost {
  background-color: transparent;
}
.a-button.a-button-ghost.a-button-default {
  border-color: #fff;
  color: #fff;
}
.a-button.a-button-ghost.a-button-primary {
  border-color: #1677ff;
  color: #1677ff;
}
.a-button.a-button-ghost.a-button-dashed {
  border-color: #fff;
  color: #fff;
  border-style: dashed;
}
/* 颜色 */
.a-button.a-button-color-error {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}
.a-button.a-button-color-error:hover, .a-button.a-button-color-error:focus {
  background-color: #ff7875;
  border-color: #ff7875;
}
.a-button.a-button-color-error:active {
  background-color: #d9363e;
  border-color: #d9363e;
}
.a-button.a-button-color-warning {
  background-color: #faad14;
  border-color: #faad14;
  color: #fff;
}
.a-button.a-button-color-warning:hover, .a-button.a-button-color-warning:focus {
  background-color: #ffc53d;
  border-color: #ffc53d;
}
.a-button.a-button-color-warning:active {
  background-color: #d48806;
  border-color: #d48806;
}
.a-button.a-button-color-success {
  background-color: #52c41a;
  border-color: #52c41a;
  color: #fff;
}
.a-button.a-button-color-success:hover, .a-button.a-button-color-success:focus {
  background-color: #73d13d;
  border-color: #73d13d;
}
.a-button.a-button-color-success:active {
  background-color: #389e0d;
  border-color: #389e0d;
}
/* 图标样式 */
.a-button-text {
  margin: 0 4px;
}
.a-button-icon {
  display: flex;
  align-items: center;
}
.a-button-icon.a-button-icon-left {
  margin-right: 4px;
}
.a-button-icon.a-button-icon-right {
  margin-left: 4px;
}
/* 加载图标样式 */
.a-button-loading-icon {
  display: inline-flex;
  margin-right: 8px;
}
.loading-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  animation: loadingCircle 1s infinite linear;
}
@keyframes loadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
