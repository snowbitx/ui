<script lang="ts" setup>
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui";
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<RadioGroupRootProps>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadioGroupRoot data-slot="radio-group" v-bind="delegatedProps" class="grid gap-3">
    <slot />
  </RadioGroupRoot>
</template>
