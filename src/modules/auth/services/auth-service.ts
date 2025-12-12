import { http } from '@/libs/axios';
import type { LoginDTO } from '../schemas/login-schema';
import type { AuthResponse } from '../types';

class AuthServices {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    return await http.post('/auth/login', credentials);
  }
}

export const authServices = new AuthServices();
