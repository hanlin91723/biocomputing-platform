/**
 * 文件导出
 * res 文件流
 * filename 文件名
 * options 转出文件的格式类型等配置
 */
export const exportLists = (res, filename, options = {}) => {
  const blob = new Blob([res, ], options);
  const elink = document.createElement("a");
  elink.download = filename;
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL对象
  document.body.removeChild(elink);
};

/**
 * 防抖函数
 * fn 外部传入的函数
 * delay 延迟的时间
 */
export function debounce(fn, delay = 500) {
  // 定义一个定时器， 保存上一次的定时器
  let timer = null;
  // 真正执行的函数
  const _debounce = function (...args) {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer);
    // 延迟执行
    timer = setTimeout(() => {
      // 外部传入的真正要执行的函数 矫正this的指向
      fn.apply(this, args);
    }, delay);
  };
  return _debounce;
}

/**
 * 节流函数
 * fn 外部传入的函数
 * interval 延迟的时间
 */
export function throttle(fn, interval = 1000) {
  // 记录上一次的开始的时间
  let lastTime = 0;
  // 时间触发时，真正执行的函数
  const _throttle = function () {
    // 获取当前事件触发时的时间
    const nowTime = new Date().getTime();
    // 使用当前触发的时间和之前的时间间隔以及上一次开始的时间， 计算出还剩余多长事件需要去触发函数
    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      // 真正触发函数
      fn();
      // 保留上次触发的时间
      lastTime = nowTime;
    }
  };
  return _throttle;
}

/**
 * 千分位分隔符
 * num 需处理的数字
 */
export function formatter(num) {
  const numberArr = num.toString().split(".");
  const numberInt = numberArr[0]; //取得数字整数部分
  const numbers = numberInt.toString().split("").reverse();
  const segs = [];
  while (numbers.length) segs.push(numbers.splice(0, 3).join(""));
  return (
    segs.join(",").split("").reverse().join("") +
    (numberArr.length > 1 ? `.${numberArr[1]}` : "")
  );
}