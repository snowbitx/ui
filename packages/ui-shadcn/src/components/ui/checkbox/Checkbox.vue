<script lang="ts" setup>
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { CheckIcon } from "lucide-vue-next";
import { cn } from "../../../lib/utils";

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = useForwardPropsEmits(props, emits);
</script>

<template>
  <CheckboxRoot
    data-slot="checkbox"
    v-bind="delegatedProps"
    :class="
      cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex items-center justify-center text-current transition-none">
      <CheckIcon class="size-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
