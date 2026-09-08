import { ref } from "vue";

/**
 * 防抖：间隔内重复调用只执行最后一次
 */
export function useDebounce(fn: (...args: any[]) => void, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * 节流：间隔内最多执行一次
 */
export function useThrottle(fn: (...args: any[]) => void, interval = 300) {
  let last = 0;

  return (...args: any[]) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    }
  };
}

/**
 * async 点击的 loading 状态：等待 promise 结束自动复位
 */
export function useAsyncLoading() {
  const isLoading = ref(false);

  async function wrap(fn: (...args: any[]) => any, ...args: any[]) {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      return await fn(...args);
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, wrap };
}
