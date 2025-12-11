import { ref } from 'vue';
import { fetchHomeData } from '@/modules/home/services/homeService';

export function useHome() {
  const data = ref<{ message?: string }>({});
  const loading = ref(false);
  const load = async () => {
    loading.value = true;
    try {
      data.value = await fetchHomeData();
    } finally {
      loading.value = false;
    }
  };
  return { data, loading, load };
}
