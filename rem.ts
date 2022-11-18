export const setRem = (screenRatioByDesign: number = 16 / 10) => {
  const setHtmlFontSize = () => {
    let docEle = document.documentElement;
    var screenRatio = docEle.clientWidth / docEle.clientHeight;
    var fontSize =
      ((screenRatio > screenRatioByDesign
        ? screenRatioByDesign / screenRatio
        : 1) *
        docEle.clientWidth) /
      100;
    docEle.style.fontSize = fontSize.toFixed(3) + 'px';
    console.log(fontSize.toFixed(3));
  };
  setHtmlFontSize();
  window.addEventListener('resize', setHtmlFontSize);
};