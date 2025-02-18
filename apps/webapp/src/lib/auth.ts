import { api } from '@ckm/lib-api';
import type { User } from '@ckm/db';

type VerifyLoginCodeResponse = {
  accessToken: string;
  user: Omit<User, 'passwordHash'>;
};

export const login = async (email: string, password: string, csrfToken: string): Promise<string | null> => {
  console.log('CSRF Token:', csrfToken);
  const { status, body } = await api.auth.login({
    body: {
      email,
      password
    },
    extraHeaders: {
      "x-csrf-token": csrfToken
    }
  });

  if (status === 200) {
    return body.code;
  }
  return null;
};

export const verifyLoginCode = async (code: string): Promise<VerifyLoginCodeResponse | null> => {
  const { status, body } = await api.auth.verifyLoginCode({
    body: {
      code
    }
  });

  if (status === 200) {
    return body;
  }
  return null;
};

export const resendCode = async (email: string): Promise<{ code: string } | null> => {
  const { status, body } = await api.auth.resendCode({
    body: {
      email
    }
  })

  if (status === 200) {
    return body
  }

  return null
}


export const forgotPassword = async (email: string): Promise<{ message: string } | null> => {
  const { status, body } = await api.auth.forgotPassword({
    body: {
      email
    }
  })

  if (status == 200) {
    return body
  }

  return null
}
