/**
 * 防抖
 * @param fn 
 * @param delay 
 * @returns 
 */
export const debounce = (fn: () => void, delay: number) => {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}