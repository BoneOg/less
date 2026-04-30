import { AUTH_ENDPOINTS } from '@/constants/api';

export interface UserData {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  confirm_password?: string;
}

export const authService = {
  async login(credentials: UserData) {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response received:', text);
        throw new Error(`Server returned non-JSON response: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      return data; // Should contain access and refresh tokens
    } catch (error: any) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  async register(userData: UserData) {
    try {
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.first_name,
          last_name: userData.last_name,
          role: 'owner', // Default role as per serializer
        }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response received during registration:', text);
        throw new Error(`Server returned non-JSON response: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(Object.values(data).flat().join(', ') || 'Registration failed');
      }

      return data;
    } catch (error: any) {
      console.error('Registration Error:', error);
      throw error;
    }
  },

  async getUserProfile(token: string) {
    try {
      const response = await fetch(AUTH_ENDPOINTS.ME, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch user profile');
      }

      return data;
    } catch (error: any) {
      console.error('Profile Error:', error);
      throw error;
    }
  },
};
