<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  },
  onClose: {
    type: Function,
    default: () => {}
  }
});

const visible = ref(false);
let timer = null;

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

const close = () => {
  visible.value = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  props.onClose();
};

onMounted(() => {
  visible.value = true;
  startTimer();
});

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});
</script>

<template>
  <div class="a-message" v-if="visible">
    <div class="a-message-content" :class="type">
      <span class="a-message-icon">
        <i v-if="type === 'success'" class="iconfont icon-success"></i>
        <i v-else-if="type === 'error'" class="iconfont icon-error"></i>
        <i v-else-if="type === 'warning'" class="iconfont icon-warning"></i>
        <i v-else-if="type === 'info'" class="iconfont icon-info"></i>
      </span>
      <span class="a-message-text">{{ content }}</span>
    </div>
  </div>
</template>

<style scoped>
.a-message {
  position: fixed;
  top: 8px;
  left: 0;
  right: 0;
  z-index: 1010;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.a-message-content {
  padding: 10px 16px;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  background: #fff;
  display: flex;
  align-items: center;
  pointer-events: all;
}

.a-message-icon {
  margin-right: 8px;
  font-size: 16px;
}

.a-message-text {
  font-size: 14px;
}

.success .a-message-icon {
  color: #52c41a;
}

.error .a-message-icon {
  color: #ff4d4f;
}

.warning .a-message-icon {
  color: #faad14;
}

.info .a-message-icon {
  color: #1890ff;
}
</style>
