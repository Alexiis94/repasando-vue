export async function fetchHomeData(): Promise<{ message: string }> {
  // Minimal example; replace with fetch/axios to real API
  return Promise.resolve({ message: 'Hola desde home service (mock)' });
}
