import { type Ref, watch } from 'vue'

function useDisableScroll(disable: Ref<boolean>) {
  watch(
    disable,
    () => {
      if (disable.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    { immediate: true },
  )
}

export default useDisableScroll
