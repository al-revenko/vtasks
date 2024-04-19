import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { toValue, type Ref, computed } from 'vue'

type TimeType = Exclude<Parameters<typeof dayjs>[0], null | undefined>

function useTimeFormatter(time: Ref<TimeType> | TimeType, template: string) {
  return computed(() => {
    const value = toValue(time)

    return dayjs(value).locale('ru').format(template)
  })
}

export default useTimeFormatter
