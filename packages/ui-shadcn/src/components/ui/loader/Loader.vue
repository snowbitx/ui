<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { LoaderCircleIcon } from "lucide-vue-next";
import { cn } from "../../../lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <LoaderCircleIcon data-slot="loader" :class="cn('size-4 animate-spin text-muted-foreground', props.class)" />
</template>
