/**
 * 获取url参数
 * @param url 
 * @returns 
 */
export const getParams = (url: string) => {
  url = url && location.href;
  if(window.URLSearchParams) {
    // 创建一个URLSearchParams实例
    const urlSearchParams = new URLSearchParams(window.location.search);
    // 把键值对列表转换为一个对象
    return Object.fromEntries(urlSearchParams.entries());
  } else {
    const params = {}
    if (url.includes('?')) {
      const str = url.split('?')[1]
      const arr = str.split('&')
      arr.forEach(item => {
        const key = item.split('=')[0]
        const val = item.split('=')[1]
        params[key] = decodeURIComponent(val) // 解码
      })
    }
    return params;
  }
}