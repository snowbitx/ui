<script setup lang="ts">
defineOptions({
  name: 'SmokeCase',
})

defineProps<{
  title: string
  hint?: string
}>()
</script>

<template>
  <section class="case">
    <h2>{{ title }}</h2>
    <p v-if="hint" class="hint">{{ hint }}</p>
    <slot></slot>
  </section>
</template>

<style scoped>
.case {
  margin-bottom: 8px;
}
</style>
