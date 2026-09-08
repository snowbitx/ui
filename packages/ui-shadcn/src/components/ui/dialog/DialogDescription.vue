<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { DialogDescription, type DialogDescriptionProps } from "reka-ui";
import { cn } from "../../../lib/utils";

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>();
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="props"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
