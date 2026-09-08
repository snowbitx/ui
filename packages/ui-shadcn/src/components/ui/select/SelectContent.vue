<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { SelectContent, type SelectContentEmits, type SelectContentProps, SelectPortal, SelectViewport, SelectScrollUpButton, SelectScrollDownButton, useForwardPropsEmits } from "reka-ui";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-vue-next";
import { cn } from "../../../lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(), {
  position: "popper",
});
const emits = defineEmits<SelectContentEmits>();

const delegatedProps = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...delegatedProps, ...$attrs }"
      :class="
        cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-[1100] max-h-(--reka-select-content-available-height) min-w-[8rem] origin-(--reka-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          props.class,
        )
      "
    >
      <SelectScrollUpButton class="flex cursor-default items-center justify-center py-1">
        <ChevronUpIcon class="size-4" />
      </SelectScrollUpButton>
      <SelectViewport
        :class="
          cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1',
          )
        "
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton class="flex cursor-default items-center justify-center py-1">
        <ChevronDownIcon class="size-4" />
      </SelectScrollDownButton>
    </SelectContent>
  </SelectPortal>
</template>
