import { http } from '@/libs/axios';
import type { LoginDTO } from '@/modules/auth/schemas/login-schema';
import type { AuthResponse } from '@/modules/auth/types';

class AuthServices {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    return await http.post('/auth/login', credentials);
  }
}

export const authServices = new AuthServices();
