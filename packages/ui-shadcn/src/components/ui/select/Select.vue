<script lang="ts" setup>
import { SelectRoot, type SelectRootProps } from "reka-ui";

const props = defineProps<SelectRootProps>();
</script>

<template>
  <SelectRoot data-slot="select" v-bind="props">
    <slot />
  </SelectRoot>
</template>
