<script lang="ts" setup>
import { computed } from 'vue'
import AsyncImg from '../AsyncImg.vue'

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 64,
  },
  fontSize: {
    type: String,
    default: '',
  },
  radius: {
    type: String,
    default: '',
  },
  bg: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
})
const isImg = computed(() => {
  if (props.icon && props.icon.includes('iconfont:'))
    return false
  return true
})
const iconType = computed(() => {
  if (props.icon && props.icon.includes('iconfont:'))
    return 'iconfont'
  if (props.icon && props.icon.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/))
    return 'url'
  return 'img'
})
</script>

<template>
  <div
    class="avatar-img-container"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: radius ? radius : (isImg ? '0px' : '6px'),
      background: bg ? bg : (isImg ? 'none' : 'linear-gradient(315deg, #1A60FF 0%, #A5C0FF 100%)'),
    }"
  >
    <i
      v-if="iconType == 'iconfont'"
      class="icon iconfont"
      :class="icon.replace('iconfont:', '')"
      :style="{
        fontSize: fontSize || `${size / 2}px`,
        color,
      }"
    />
    <img
      v-else-if="iconType == 'url'"
      :src="icon"
      :style="{
        width: '100%',
        height: '100%',
        borderRadius: radius ? radius : '6px',
      }"
    >
    <AsyncImg
      v-else
      :radius="radius"
      :async-url="icon"
    />
  </div>
</template>

<style scoped>
.avatar-img-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
