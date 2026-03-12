<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  defaultImg: {
    type: String,
    default: ''
  },
  asyncUrl: {
    type: String,
    default: ''
  },
  apiUrl: {
    type: String,
    default: ''
  },
  apiMethod: {
    type: String,
    default: 'POST'
  },
  apiHeaders: {
    type: Object,
    default: () => ({})
  }
})

const src = ref('')
const loading = ref(false)

watch(
  () => props.asyncUrl,
  async (asyncUrl) => {
    if (asyncUrl && props.apiUrl) {
        loading.value = true
        try {
          const formData = new FormData()
          formData.append('logo', asyncUrl)
          const response = await fetch(props.apiUrl, {
            method: props.apiMethod,
            body: formData,
            headers: props.apiHeaders,
          })
          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          src.value = url
        } catch (error) {
          console.error('图片加载失败:', error)
          src.value = props.defaultImg
        } finally {
          loading.value = false
        }
    } else {
        src.value = props.defaultImg
        loading.value = false
    }
  },
  { immediate: true, deep: true }
)
</script>
<script>
export default {
  name: 'AsyncImg'
};
</script>

<template>
  <div style="width:100%;height:100%;">
    <img
      v-show="src"
      :src="src"
      style="width:100%;height:100%;border-radius:6px;position:relative;"
    />
  </div>
</template>

<style scoped>
  
</style>
