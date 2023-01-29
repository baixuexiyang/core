/**
 * 节流
 * @param fn 
 * @param delay 
 * @returns 
 */
export const throttle = (fn: () => void, delay: number) => {
  let last = 0 // 上次触发时间
  return (...args) => {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}