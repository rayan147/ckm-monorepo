import { api } from '@ckm/lib-api';
import type { User } from '@ckm/db';

type VerifyLoginCodeResponse = {
  accessToken: string;
  user: Omit<User, 'passwordHash'>;
};

export const login = async (email: string, password: string): Promise<string | null> => {
  const { status, body } = await api.auth.login({
    body: {
      email,
      password
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

  console.log({ status, body })

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
