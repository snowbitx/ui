import { onMounted, ref, watch, type Ref } from "vue";

export interface DictOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface UseOptionsOptions {
  /** 静态选项，元素支持任意结构（配合 labelField/valueField）；也支持返回选项的函数或响应式值 */
  options?: any
  /** 远程字典：返回选项数组的函数，会在挂载时和 deps 变化时自动调用 */
  fetch?: (...args: any[]) => Promise<DictOption[]> | DictOption[]
  /** 依赖值，变化时重新拉取远程字典 */
  deps?: Ref<any> | Ref<any>[]
  /** 挂载时是否立即拉取，默认 true */
  immediate?: boolean
}

/**
 * 选项数据源：静态数组 / 函数 / 远程字典三选一。
 * 供 ProSelect / ProCheckboxGroup / ProRadioGroup 共用。
 */
export function useOptions(config: UseOptionsOptions = {}) {
  const options = ref<any[]>([]);
  const isLoading = ref(false);

  function unwrapDeps(): any {
    const deps = config.deps;
    // deps 可能是 Ref / Ref 数组 / 普通值，取当前值给 fetch 函数用
    if (deps == null) return undefined;
    if (Array.isArray(deps)) {
      return deps.map((d) => (d && typeof d === "object" && "value" in d ? d.value : d));
    }
    return deps && typeof deps === "object" && "value" in deps ? deps.value : deps;
  }

  async function load() {
    const { options: staticOptions, fetch } = config;
    // options 可能是响应式包裹的值（computed），先解包
    const source = typeof staticOptions === "object" && staticOptions !== null && "value" in staticOptions ? (staticOptions as any).value : staticOptions;
    if (source) {
      options.value = typeof source === "function" ? await source(unwrapDeps()) : source;
      return;
    }
    if (fetch) {
      isLoading.value = true;
      try {
        options.value = await fetch(unwrapDeps());
      } finally {
        isLoading.value = false;
      }
    }
  }

  if (config.deps) {
    const deps = Array.isArray(config.deps) ? config.deps : [config.deps];
    watch(deps, () => load());
  }

  onMounted(() => {
    if (config.immediate !== false) load();
  });

  return { options, isLoading, reload: load };
}
