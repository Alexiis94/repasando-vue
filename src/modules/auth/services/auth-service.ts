import { http } from '@/libs/axios';

class AuthServices {
  async login(username: string, password: string): Promise<any> {
    return http.post('/auth/login', { username, password });
  }
}

export const authServices = new AuthServices();
