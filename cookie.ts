/**
 *
 * @param key 获取
 * @returns
 */
export const getCookie = (key: string) => {
  // eslint-disable-next-line no-param-reassign
  key = `${key}=`;
  let cookieStr = decodeURIComponent(document.cookie.replace(/;s*/gi, ';'));
  if (!cookieStr) {
    return '';
  }
  let arr = cookieStr.split(';');
  let curItem = arr.find((item) => item.indexOf(key) > -1);
  if (!curItem) {
    return '';
  }
  return curItem.replace(key, '');
};

/**
 * 
 * @param key 
 * @param value 
 * @param options 
 */
export const setCookie = (key: string, value: string, options: any) => {
  let def = { path: '/', expires: 0 };
  let params = Object.assign({}, def, options);
  let d = new Date();
  if (!!params.expires) {
    d.setTime(d.getTime() + params.expires * 1000);
    params.expires = +d.toUTCString();
  }
  let result = Object.keys(params).reduce((acc, akey) => {
    let curVal = params[akey];
    return curVal ? (acc += `${akey}=${curVal};`) : acc;
  }, `${key}=${encodeURIComponent(value)};`);
  document.cookie = result;
}

/**
 * 
 * @param key 
 */
export const delCookie = (key: string) => {
  document.cookie = `${key}=;expires=-1`;
}
