<script setup lang="ts">
defineProps<{ label?: string }>();
</script>

<template>
  <button class="btn">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: 1px solid transparent;
}
</style>
