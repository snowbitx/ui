<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { alertVariants } from ".";
import { cn } from "../../../lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  variant?: "default" | "destructive";
}>();
</script>

<template>
  <div data-slot="alert" :class="cn(alertVariants({ variant }), props.class)" role="alert">
    <slot />
  </div>
</template>
