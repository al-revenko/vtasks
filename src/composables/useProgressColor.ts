import { computed, type Ref } from 'vue'

function useProgressColor(percentage: Ref<number>, prefix: string ='') {

  return computed(() => {
    if (percentage.value === 0) {
      return ''
    }

    if (percentage.value <= 20) {
      return prefix + 'red-800'
    }

    if (percentage.value <= 40) {
      return prefix + 'orange-600'
    }

    if (percentage.value <= 60) {
      return prefix + 'amber-500'
    }

    if (percentage.value <= 80) {
      return prefix + 'yellow-400'
    }

    if (percentage.value <= 90) {
      return prefix + 'lime-400'
    }

    if (percentage.value < 100) {
      return prefix + 'lime-500'
    }

    return prefix + 'lime-600'
  })
}

export default useProgressColor
