import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const message = ref('Вы уверены?')
  const isVisible = ref(false)
  const callback = ref(() => {})

  const open = (newMessage: string, newCallback: ()=> void) => {
    callback.value = newCallback
    message.value = newMessage
    isVisible.value = true
  }

  const close = () => {
    isVisible.value = false
  }

  const confirm = () => {
    callback.value()
    close()
  }

  return { message, isVisible, open, close, confirm }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
