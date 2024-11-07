import { zodSchemas } from '@ckm/db';
import { z } from "zod";

const HttpStatus = {
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  BAD_REQUEST: 400,
  CREATED: 201,
}

// Message schema
export const MessageSchema = z.object({
  message: z.string()
});

export const AuthError = z.object({
  status: z.literal(HttpStatus.INTERNAL_SERVER_ERROR),
  body: MessageSchema
})

// LoginResponse schema
export const LoginResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal(HttpStatus.OK),
    body: z.object({
      access_token: z.string(),
      session_token: z.string()
    })
  }),
  z.object({
    status: z.literal(HttpStatus.INTERNAL_SERVER_ERROR),
    body: MessageSchema
  })
]);

// RegisterResponse schema
export const RegisterResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal(HttpStatus.CREATED),
    body: zodSchemas.UserSchema.omit({ passwordHash: true })
  }),
  z.object({
    status: z.literal(HttpStatus.BAD_REQUEST),
    body: MessageSchema
  })
]);

// ChangePasswordResponse schema
export const ChangePasswordResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal(HttpStatus.OK),
    body: MessageSchema
  }),
  z.object({
    status: z.literal(HttpStatus.BAD_REQUEST),
    body: MessageSchema
  })
]);

// LogoutResponse schema
export const LogoutResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal(HttpStatus.OK),
    body: MessageSchema
  }),
  z.object({
    status: z.literal(HttpStatus.BAD_REQUEST),
    body: MessageSchema
  })
]);

// Inferred types
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type ChangePasswordResponse = z.infer<typeof ChangePasswordResponseSchema>;
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

