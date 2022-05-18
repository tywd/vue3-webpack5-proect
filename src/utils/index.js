/*
 * @Author: tywd
 * @Date: 2022-05-18 17:30:59
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-18 17:34:53
 * @FilePath: /webpack5-vue3/src/utils/index.js
 * @Description: 常用公用方法
 */

/**
 * @Descripttion: 防抖，反复触发时 在设置的 delay 时间间隔内点击的话，只会执行最后一次
 * @param fn {function} 需要执行的函数
 * @param delay {number} 时间 默认 300ms
 * @return {*}
 */
const debounce = (fn, delay = 300) => {
  let timer = 0;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  }
}

/**
 * @Descripttion: 节流，反复触发时 根据设置的 delay 时间间隔来反复执行方法
 * @param fn {function} 需要执行的函数
 * @param delay {number} 时间 默认 300ms
 * @return {*}
 */
const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    if (Date.now() - last > delay) {
      last = Date.now()
      setTimeout(() => {
        fn.call(this, ...args);
      }, delay);
    }
  }
}

export {
  debounce,
  throttle
}