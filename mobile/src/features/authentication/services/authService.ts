import { AUTH_ENDPOINTS } from '@/constants/api';

/** DRF often returns `detail` as a string or a list of strings. */
function messageFromApiBody(data: unknown): string {
  if (!data || typeof data !== 'object') return 'Login failed';
  const d = data as Record<string, unknown>;
  const detail = d.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    return typeof first === 'string' ? first : String(first);
  }
  const nfe = d.non_field_errors;
  if (Array.isArray(nfe) && nfe.length > 0) {
    const first = nfe[0];
    return typeof first === 'string' ? first : String(first);
  }
  return 'Login failed';
}

function isExpectedLoginFailure(message: string): boolean {
  return /account not found/i.test(message) || /wrong password/i.test(message);
}

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
        throw new Error(messageFromApiBody(data));
      }

      return data;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (!isExpectedLoginFailure(msg)) {
        console.error('Login Error:', error);
      }
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
          role: 'user',
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
