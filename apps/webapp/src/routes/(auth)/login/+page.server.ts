import { login, resendCode as resendCodeService, verifyLoginCode } from '$lib/auth';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    // Check for null/undefined values
    if (!email || !password) {
      return fail(400, {
        step: 1,
        message: 'Email and password are required',
      });
    }

    // Validate email and password
    const isValidEmail = email.includes('@');
    const isValidPassword = password.length >= 10;

    if (!isValidEmail || !isValidPassword) {
      return fail(400, {
        step: 1,
        message: 'Needs to be a valid email or password needs to be 10 chars long',
      });
    }

    try {
      const response = await login(email, password);

      if (!response) {
        return fail(401, {
          step: 1,
          message: 'Invalid email or password',
        });
      }

      cookies.set('email', email, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return {
        step: 2,
        email
      };
    } catch (error) {
      console.error(error);
      return fail(500, {
        step: 1,
        message: 'An error occurred. Please try again.',
      });
    }
  },

  resendCode: async ({ request, cookies }) => {
    const email = cookies.get('email');
    console.log({ email });

    if (!email) {
      return fail(400, {
        step: 2,
        message: 'Email not found',
      });
    }

    if (!email.includes('@')) {
      return fail(401, {
        step: 2,
        message: 'Not Authorized',
      });
    }

    try {
      await resendCodeService(email);
      return {
        actionType: 'resendCode',
        type: 'success',
        message: 'Verification code has been resent to your email.',
        step: 2,
      };
    } catch (error) {
      console.error(error);
      return fail(500, {
        step: 2,
        message: 'An error occurred while resending the code. Please try again.',
      });
    }
  },

  verify: async ({ request, cookies }) => {
    try {
      const data = await request.formData();
      const code = data.get('code')?.toString();

      if (!code || code.length !== 6) {
        return fail(400, {
          step: 2,
          message: 'Code cannot be null or invalid length',
        });
      }

      const res = await verifyLoginCode(code);
      if (!res) error(401, `res can not be null`)

      if (res.accessToken === null) {
        return fail(401, {
          step: 2,
          message: 'Invalid verification code',
        });
      }

      const { user, accessToken } = res;

      cookies.set('session', accessToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return {
        actionType: 'verify',
        type: 'success',
        location: '/dashboard',
        status: 200,
        user,
      };
    } catch (error) {
      console.error(error);
      const errorMessage = (error as Error).message;
      return fail(500, {
        step: 2,
        message: `An error occurred: ${errorMessage}. Please try again.`,
      });
    }
  },
} satisfies Actions;
