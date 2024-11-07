import { login, resendCode as resendCodeService, verifyLoginCode } from '$lib/auth';
import { fail } from '@sveltejs/kit';
import { match, P } from 'ts-pattern';
import type { Actions } from './$types';

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    return match({ email, password })
      .with({ email: P.nullish, password: P.nullish }, () =>
        fail(400, {
          step: 1,
          message: 'Email and password are required',
        })
      )
      .with(
        { email: P.string.includes('@'), password: P.string.length(10) },
        () =>
          fail(400, {
            step: 1,
            message: 'Needs to be a valid email or password needs to be 10 chars long',
          })
      )
      .otherwise(async ({ email, password }) => {
        try {
          const response = await login(email!, password!);

          return match(response)
            .with(null, () =>
              fail(401, {
                step: 1,
                message: 'Invalid email or password',
              })
            )
            .otherwise(() => {
              cookies.set('email', email, {
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
              })
              return {
                step: 2,
                email
              };
            });
        } catch (error) {
          console.error(error);
          return fail(500, {
            step: 1,
            message: 'An error occurred. Please try again.',
          });
        }
      });
  },

  resendCode: async ({ request, cookies }) => {
    const email = cookies.get('email')
    console.log({ email })

    return match(email)
      .with(P.string.includes('@'), async (email) => {
        try {
          await resendCodeService(email); // Ensure you pass the email here
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
      })
      .with(P.nullish, () =>
        fail(400, {
          step: 2,
          message: 'Email not found',
        })
      )
      .otherwise(() =>
        fail(401, {
          step: 2,
          message: 'Not Authorized',
        })
      );
  },

  verify: async ({ request, cookies }) => {
    try {
      const data = await request.formData();
      const codeRaw = data.get('code')?.toString()

      return match(codeRaw)
        .with(P.string.length(6), async (code) => {
          const res = await verifyLoginCode(codeRaw!);
          console.log(res)

          return match(res)
            .with(P.nullish, () =>
              fail(401, {
                step: 2,
                message: 'Invalid verification code',
              })
            )
            .otherwise(({ user, accessToken }) => {
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
            });
        })
        .otherwise(() =>
          fail(400, {
            step: 2,
            message: 'Code cannot be null or invalid length',
          })
        );
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

