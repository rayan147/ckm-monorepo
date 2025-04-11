import { zodSchemas } from '@ckm/db';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const SessionValidationSchema = zodSchemas.SessionSchema.extend({
  id: z.string() // Override the id field to accept any string
})
const SessionValidationSuccess = z.object({
  session: SessionValidationSchema,
  user: zodSchemas.UserSchema
});

const SessionValidationFailure = z.object({
  session: z.null(),
  user: z.null()
});

// Create the union
const SessionValidationResultSchema = z.union([
  SessionValidationSuccess,
  SessionValidationFailure
]);

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
        user: zodSchemas.UserSchema.extend({
          auth: z.array(zodSchemas.AuthSchema.optional())
        }),
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      verificationCode: z.string(),
    }),
    summary: 'Verify login code',
  },
  // In your contract definition
  register: {
    method: 'POST',
    path: '/auth/register',
    responses: {
      201: zodSchemas.UserSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      profileImage: z.string().optional(),
      password: z.string(),
      role: zodSchemas.UserRoleSchema.optional(),
      isOrganization: z.boolean().optional(),
      organizationInput: z.object({
        name: z.string(),
        imageUrl: z.string().optional()
      }).optional(),
      restaurantsInput: z.array(z.object({
        name: z.string(),
        imageUrl: z.string().optional(),
        address: z.string(),
        city: z.string(),
        zipCode: z.string(),
        state: z.string(),
        owner: z.string()
      })).optional()
    }),
    summary: 'User registration with optional organization and restaurants',
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

  validateSessionToken: {
    method: 'POST',
    path: '/auth/validate-session-token',
    responses: {
      200: SessionValidationResultSchema,
      400: z.object({
        success: z.boolean()
      }),

    },
    body: z.object({
      sessionToken: z.string()
    }),
    summary: 'validate the session token'
  },

});
