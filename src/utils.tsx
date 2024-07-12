export const getOffset = (el: HTMLDivElement) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
};
