<script setup lang="ts">
defineProps<{ label?: string }>();
</script>

<template>
  <button class="btn">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped></style>
