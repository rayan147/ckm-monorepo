import { zodSchemas } from '@ckm/db';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const authContract = c.router({
  resendCode: {
    method: 'POST',
    path: '/auth/resend-code',
    responses: {
      200: z.object({
        code: z.string(),
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      email: z.string().email(),
    }),
    summary: 'Resend the verifyLoginCode',
  },
  login: {
    method: 'POST',
    path: '/auth/login',
    responses: {
      200: z.object({
        code: z.string(),
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    summary: 'User login',
  },
  verifyLoginCode: {
    method: 'POST',
    path: '/auth/verify-login',
    responses: {
      200: z.object({
        accessToken: z.string(),
        user: zodSchemas.UserSchema.omit({ passwordHash: true }),
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      code: z.string(),
    }),
    summary: 'Verify login code',
  },
  register: {
    method: 'POST',
    path: '/auth/register',
    responses: {
      201: zodSchemas.UserSchema.omit({ passwordHash: true }),
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.UserUncheckedCreateInputSchema,
    summary: 'User registration',
  },
  changePassword: {
    method: 'POST',
    path: '/auth/change-password/:userId',
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
    }),
    pathParams: z.object({
      userId: z.coerce.number(),
    }),
    summary: 'Change user password',
  },
  logout: {
    method: 'POST',
    path: '/auth/logout',
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      userId: z.number(),
      accessToken: z.string(),
    }),
    summary: 'User logout',
  },
  forgotPassword: {
    method: 'POST',
    path: '/auth/forgot-password',
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      email: z.string().email(),
    }),
    summary: 'Request password reset',
  },
  resetPassword: {
    method: 'POST',
    path: '/auth/reset-password',
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      resetToken: z.string(),
      newPassword: z.string(),
    }),
    summary: 'Reset password',
  },
});
