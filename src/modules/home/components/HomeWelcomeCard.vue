<script setup lang="ts">
import { onMounted } from 'vue';
import { useHome } from '@/modules/home/composables/use-home';

const props = defineProps<{ title?: string }>();

const { data, load } = useHome();

onMounted(load);
</script>

<template>
  <div class="card">
    <h2>{{ props.title ?? 'Bienvenido' }}</h2>
    <p>{{ data.message ?? `Este componente es privado del módulo 'home'.` }}</p>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
}
</style>
