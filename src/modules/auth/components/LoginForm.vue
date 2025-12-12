<script setup lang="ts">
import useLogin from '../composables/use-login';

const { errors, isSubmitting, onSubmit, email, emailAttrs, password, passwordAttrs } = useLogin();
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="email" v-bind="emailAttrs" />
    <div>{{ errors.email }}</div>

    <input v-model="password" v-bind="passwordAttrs" />
    <div>{{ errors.password }}</div>
    <button :disabled="isSubmitting">
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>
