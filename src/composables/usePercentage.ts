import { computed, toValue, type Ref } from "vue";

function usePercentage(total: Ref<number> | number, fromTotal: Ref<number> | number) {
  return computed(() => {
    const totalValue = toValue(total)
    const fromTotalValue = toValue(fromTotal)

    if (totalValue > 0) {
      return Math.floor((fromTotalValue / totalValue) * 100)
    }

  return 0
  })
}

export default usePercentage