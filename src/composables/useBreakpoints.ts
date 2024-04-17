import { onMounted } from 'vue'

function useBreakpoints(minPX: number, cb: (match: boolean) => unknown): void {
  onMounted(() => {
    const media = window.matchMedia(`(min-width: ${minPX}px)`)

    cb(media.matches)

    media.addEventListener('change', (ev) => {
      cb(ev.matches)
    })
  })
}

export default useBreakpoints
