import { a as api } from './index2-NJef63Gp.js';

const login = async (email, password) => {
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
const verifyLoginCode = async (code) => {
  const { status, body } = await api.auth.verifyLoginCode({
    body: {
      code
    }
  });
  console.log({ status, body });
  if (status === 200) {
    return body;
  }
  return null;
};
const resendCode = async (email) => {
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
const forgotPassword = async (email) => {
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

export { forgotPassword as f, login as l, resendCode as r, verifyLoginCode as v };
//# sourceMappingURL=auth-C6JRQBrD.js.map
