import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/modules/auth/types';
import type { LoginDTO } from '../schemas/login-schema';
import { authServices } from '../services/auth-service';

export const useAuthStore = defineStore('auth', () => {
  // STATE
  const token = ref<string | null>(sessionStorage.getItem('token'));
  const refreshToken = ref<string | null>(sessionStorage.getItem('refreshToken'));
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  // GETTERS
  const isAuthenticated = computed(() => !!token.value);

  // ACTIONS
  async function login(credentials: LoginDTO) {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      const response = await authServices.login(credentials);
      console.log(response);

      token.value = response.access_token;
      refreshToken.value = response.refresh_token;

      setToken(token.value, refreshToken.value);

      return response; // Retornamos para que la UI pueda decidir redirección
    } catch (error: any) {
      token.value = null;
      refreshToken.value = null;
      setToken(null, null);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function setToken(newToken: string | null, newRefreshToken: string | null) {
    if (newToken) {
      sessionStorage.setItem('token', newToken);
    }

    if (newRefreshToken) {
      sessionStorage.setItem('refreshToken', newRefreshToken);
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
    isLoading,
    login,
    setToken,
    logout,
  };
});
