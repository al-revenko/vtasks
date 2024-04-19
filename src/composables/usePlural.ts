import { computed, toValue, type Ref } from 'vue'

type PluralArgsType = Parameters<typeof Intl.PluralRules>

function usePlural(
  num: number | Ref<number>,
  locale: PluralArgsType[0] | Ref<PluralArgsType[0]> = 'ru-RU',
  options?: PluralArgsType[1],
) {
  return computed(() => {
    const localeValue = toValue(locale)
    const numValue = toValue(num)

    return new Intl.PluralRules(localeValue, options).select(numValue)
  })
}

export default usePlural
