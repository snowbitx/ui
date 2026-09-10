<script setup lang="ts">
import { watch } from "vue";
import { useDebounce } from "@cynnie/ui-core";
import { Input } from "../ui/input";
import { XIcon, SearchIcon } from "lucide-vue-next";
import { Button } from "../ui/button";

defineOptions({
  name: "ProInput",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    /** 输入停止 delay 毫秒后才同步 v-model（防抖） */
    debounce?: number;
    /** 一键清空，对齐 antd 的 allow-clear */
    allowClear?: boolean;
    /** 是否显示为搜索框（回车时触发 search），对齐 a-input-search */
    search?: boolean;
  }>(),
  {
    debounce: 300,
    allowClear: false,
    search: false,
  },
);

const emit = defineEmits(["search", "pressEnter", "change"]);

const model = defineModel<any>();

// debounce 为 0 时直接同步，不经过定时器
const setModel = useDebounce((value: any) => {
  model.value = value;
}, props.debounce);

watch(model, (value) => {
  if (value === undefined) setModel(value);
});

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  if (props.debounce > 0) setModel(value);
  else model.value = value;
}

function onClear() {
  model.value = "";
  emit("change", "");
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    emit("pressEnter", event);
    if (props.search) emit("search", model.value);
  }
}
</script>

<template>
  <div class="flex w-full items-center gap-2" :class="$attrs.class" :style="($attrs.style as any)">
    <div class="relative min-w-0 flex-1">
      <Input
        v-bind="{ ...$attrs, class: '', style: '' }"
        :class="allowClear && model ? 'pr-8' : ''"
        :value="model ?? ''"
        @input="onInput"
        @keydown="onKeydown"
        @change="emit('change', model)"
      />
      <button
        v-if="allowClear && model"
        type="button"
        tabindex="-1"
        aria-label="清空"
        class="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground/70 transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
        @click="onClear"
      >
        <XIcon class="size-3.5" />
      </button>
    </div>
    <!-- search 模式：渲染一个搜索按钮（对齐 a-input-search 的 enter-button） -->
    <Button v-if="search" type="button" variant="outline" class="shrink-0" @click="emit('search', model)">
      <SearchIcon class="size-4" />
    </Button>
  </div>
</template>
