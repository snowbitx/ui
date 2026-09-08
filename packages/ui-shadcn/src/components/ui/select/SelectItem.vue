<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { SelectItem, SelectItemIndicator, type SelectItemProps, SelectItemText, useForwardProps } from "reka-ui";
import { CheckIcon } from "lucide-vue-next";
import { cn } from "../../../lib/utils";

const props = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = useForwardProps(props);
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="delegatedProps"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground [&_svg:not([class*=text-])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 cursor-pointer',
        props.class,
      )
    "
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectItemIndicator>
        <CheckIcon class="size-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
