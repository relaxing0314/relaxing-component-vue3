import { createApp, h } from 'vue'
import AMessage from './AMessage.vue'

let instance
let instances = []
let seed = 1

const Message = function(options) {
  if (typeof window === 'undefined') return
  
  options = options || {}
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  
  const id = 'message_' + seed++
  const userOnClose = options.onClose
  
  options.onClose = function() {
    Message.close(id, userOnClose)
  }
  
  const container = document.createElement('div')
  document.body.appendChild(container)
  
  instance = createApp({
    render() {
      return h(AMessage, {
        ...options,
        onClose: () => {
          Message.close(id, userOnClose)
        }
      })
    }
  })
  
  instance.mount(container)
  instance.id = id
  instance.dom = container.firstElementChild
  
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.dom.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  
  instances.push(instance)
  return instance
}

const types = ['success', 'warning', 'info', 'error']

types.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        content: options
      }
    }
    options.type = type
    return Message(options)
  }
})

Message.close = function(id, userOnClose) {
  const len = instances.length
  let index = -1
  let removedHeight
  
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      index = i
      if (instances[i] && instances[i].dom) {
        removedHeight = instances[i].dom.offsetHeight;
      }
      instances[i].unmount()
      if(instances[i].dom && instances[i].dom.parentNode) {
        document.body.removeChild(instances[i].dom.parentNode)
      }
      instances.splice(i, 1)
      break
    }
  }
  
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].dom
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].unmount()
    document.body.removeChild(instances[i].dom.parentNode)
    instances.splice(i, 1)
  }
}

export default Message 