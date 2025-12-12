<script setup lang="ts">
import useLogout from '@/modules/auth/composables/use-logout';
import HomeWelcomeCard from '@/modules/home/components/HomeWelcomeCard.vue';

const { logout } = useLogout();
</script>

<template>
  <div>
    <HomeWelcomeCard title="Vista Home" />
    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped></style>
