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
        message: z.string(),
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      email: z.string().email(),
    }),
    summary: 'Resend verification code',
  },
  login: {
    method: 'POST',
    path: '/auth/login',
    responses: {
      200: z.object({
        success: z.boolean()
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
        sessionToken: z.string(),
        user: zodSchemas.UserSchema,
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      verificationCode: z.string(),
    }),
    summary: 'Verify login code',
  },
  register: {
    method: 'POST',
    path: '/auth/register',
    responses: {
      201: zodSchemas.UserSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.intersection(zodSchemas.UserCreateInputSchema,
      z.object({
        password: z.string(),
        role: zodSchemas.UserRoleSchema.optional()
      })
    ),
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
