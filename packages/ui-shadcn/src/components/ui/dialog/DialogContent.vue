<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { DialogClose, DialogPortal, DialogOverlay, DialogContent, type DialogContentEmits, type DialogContentProps, useForwardPropsEmits } from "reka-ui";
import { XIcon } from "lucide-vue-next";
import { cn } from "../../../lib/utils";

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      data-slot="dialog-overlay"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[1050] bg-black/50"
    />
    <DialogContent
      data-slot="dialog-content"
      v-bind="delegatedProps"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-[1060] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )
      "
    >
      <slot />

      <DialogClose
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs p-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none cursor-pointer"
      >
        <XIcon class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
