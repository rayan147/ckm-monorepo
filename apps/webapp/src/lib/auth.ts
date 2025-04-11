import { api } from '@ckm/lib-api';

export const login = async (email: string, password: string): Promise<boolean | null> => {
  const { status, body } = await api.auth.login({
    body: {
      email,
      password
    }
  });

  if (status === 200) {
    return body.success;
  }
  return null;
};

export const verifyLoginCode = async (verificationCode: string) => {
  const { status, body } = await api.auth.verifyLoginCode({
    body: {
      verificationCode
    }
  });

  if (status === 200) {
    return body;
  }
  return null;
};

export const resendCode = async (email: string) => {
  const { status, body } = await api.auth.resendCode({
    body: {
      email
    }
  });

  if (status === 200) {
    return body;
  }

  return null;
};

export const forgotPassword = async (email: string): Promise<{ message: string } | null> => {
  const { status, body } = await api.auth.forgotPassword({
    body: {
      email
    }
  });

  if (status == 200) {
    return body;
  }

  return null;
};

export const logout = async (): Promise<boolean> => {
  try {
    console.log('Client: Starting logout process');
    const response = await fetch('/api/auth/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    console.log('Client: Logout response status:', response.status);
    const data = await response.json();
    console.log('Client: Logout response data:', data);

    if (response.ok) {
      window.location.href = '/login?logged_out=true';
      return true;
    }

    return false;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
