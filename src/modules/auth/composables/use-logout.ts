import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/use-auth-store';

const useLogout = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const logout = () => {
    authStore.logout();
    router.push({ name: 'Login' });
  };

  return {
    logout,
  };
};

export default useLogout;
