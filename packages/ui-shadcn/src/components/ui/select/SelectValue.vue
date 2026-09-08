<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { SelectValue } from "reka-ui";
import { cn } from "../../../lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <SelectValue data-slot="select-value" :class="cn(props.class)">
    <slot />
  </SelectValue>
</template>
