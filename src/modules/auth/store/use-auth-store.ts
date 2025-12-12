import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/modules/auth/types/user';

export const useAuthStore = defineStore('auth', () => {
  // STATE
  const token = ref<string | null>(sessionStorage.getItem('token'));
  const refreshToken = ref<string | null>(sessionStorage.getItem('refreshToken'));
  const user = ref<User | null>(null);

  // GETTERS
  const isAuthenticated = computed(() => !!token.value);

  // ACTIONS
  function setToken(newToken: string | null, newRefreshToken: string | null) {
    token.value = newToken;
    refreshToken.value = newRefreshToken;

    if (newToken) {
      sessionStorage.setItem('token', newToken);
    } else {
      sessionStorage.removeItem('token');
    }

    if (newRefreshToken) {
      sessionStorage.setItem('refreshToken', newRefreshToken);
    } else {
      sessionStorage.removeItem('refreshToken');
    }
  }

  function logout() {
    user.value = null;
    setToken(null, null);
  }

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    logout,
  };
});
