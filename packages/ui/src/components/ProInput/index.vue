<script setup lang="ts">
import { watch } from "vue";
import { useDebounce } from "../../composables/hooks";

defineOptions({
  name: "ProInput",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 输入停止 delay 毫秒后才同步 v-model（防抖） */
    debounce?: number;
  }>(),
  {
    debounce: 300,
  },
);

const model = defineModel<any>();

// debounce 为 0 时直接同步，不经过定时器
const setModel = useDebounce((value: any) => {
  model.value = value;
}, props.debounce);

watch(model, (value) => {
  if (value === undefined) setModel(value);
});
</script>

<template>
  <a-input
    v-bind="$attrs"
    :value="model"
    @update:value="
      (value) => {
        if (props.debounce > 0) setModel(value);
        else model = value;
      }
    "
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>
  </a-input>
</template>
