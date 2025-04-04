import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { z } from 'zod';
import { zodSchemas } from '@ckm/db';
import { api } from '@ckm/lib-api'
import { login, resendCode as resendCodeService, verifyLoginCode } from '$lib/auth';
import { dev } from '$app/environment';
import { setSessionTokenCookie } from '$lib/server/auth';

// Constants
const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1700530799809-bfe8221d0465?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D';
const SESSION_MAX_AGE_THIRTY_DAYS = new Date(Date.now() + 30 * 60 * 60 * 24 * 1000)
const SESSION_MAX_AGE = 60 * 60 * 24 * 7
// Schemas with detailed error messages
const emailSchema = z
  .string({ required_error: "Email is required" })
  .email({ message: "Please enter a valid email address" });

const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(10, { message: "Password must be at least 10 characters long" });

const verificationCodeSchema = z
  .string({ required_error: "Verification code is required" })
  .length(6, { message: "Verification code must be exactly 6 characters" });

const restaurantSchema = z.object({
  name: z.string().min(1, { message: "Restaurant name is required" }),
  imageUrl: z.string().optional().default(DEFAULT_IMAGE_URL),
  address: z.string().min(1, { message: "Restaurant address is required" }),
  zipCode: z.string().min(1, { message: "Restaurant zip code is required" }),
  state: z.string().min(1, { message: "Restaurant state is required" }),
  city: z.string().min(1, { message: "Restaurant city is required" }),
  owner: z.string().min(1, { message: "Restaurant owner is required" })
});

const restaurantCreateManyInputSchema = z.array(restaurantSchema)
  .min(1, { message: "At least one restaurant is required" });

// Registration schema with improved validation and error messages
const registrationSchema = z.preprocess(
  (data) => {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
      return null;
    }
  },
  z.object({
    email: emailSchema,
    password: passwordSchema,
    role: zodSchemas.UserRoleSchema,
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    isOrganization: z.boolean(),
    profileImage: z.string().optional(),
    auth: z.object({
      passwordHash: z.string(),
      role: zodSchemas.UserRoleSchema.optional()
    }),
    restaurantsInput: restaurantCreateManyInputSchema,
    organizationInput: z.object({
      name: z.string().min(1, { message: "Organization name is required" }),
      imageUrl: z.string().optional(),
    }),
  })
    .refine((data) => {
      // If isOrganization is true, require organization input
      return !data.isOrganization || (data.organizationInput && data.organizationInput.name);
    }, {
      message: "Organization details are required when creating an organization",
      path: ["organizationInput"]
    })
)

// Type definitions for better type safety
type ApiError = Error & { statusCode?: number };
type RegistrationData = z.infer<typeof registrationSchema>;
type RestaurantData = z.infer<typeof restaurantSchema>;

/**
 * Gets CSRF token for form submission
 * 
 * @param fetch - Fetch function from request event
 * @returns CSRF token string
 * @throws Error if token retrieval fails
 */
async function getCsrfToken(fetch: Function): Promise<string> {
  try {
    const res = await fetch('http://localhost:3000/csrf', {
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error(`CSRF token request failed with status: ${res.status}`);
    }

    const { csrfToken, status } = await res.json();

    if (status !== 200 || !csrfToken) {
      throw new Error('Invalid CSRF token response');
    }

    return csrfToken;
  } catch (err) {
    console.error('CSRF token error:', err);
    throw error(403, 'Failed to authenticate request');
  }
}

/**
 * Sets secure cookies consistently
 * 
 * @param cookies - Cookie object from request event
 * @param name - Cookie name
 * @param value - Cookie value
 */
function setSecureCookie(cookies: RequestEvent['cookies'], name: string, value: string) {
  cookies.set(name, value, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: !dev, // Use secure cookies in production
    maxAge: SESSION_MAX_AGE
  });
}

// Action handlers
export const actions = {
  /**
   * Handles user login and sends verification code
   */
  login: async ({ request, cookies, fetch }: RequestEvent) => {
    const formData = await request.formData();

    // Validate form data with Zod
    const loginSchema = z.object({
      email: emailSchema,
      password: passwordSchema
    });

    const loginValidation = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password')
    });

    if (!loginValidation.success) {
      return fail(400, {
        success: false,
        step: 1,
        errors: loginValidation.error.flatten(),
        message: 'Invalid login credentials'
      });
    }

    try {
      const { email, password } = loginValidation.data;

      const res = await login(email, password);
      if (!res) {
        return fail(401, {
          success: false,
          step: 1,
          message: 'Invalid credentials'
        });
      }

      // Set secure cookie for the verification step
      setSecureCookie(cookies, 'email', email);

      return {
        success: true,
        step: 2,
        message: 'Verification code sent to your email'
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Login error:', apiError);

      return fail(apiError.statusCode || 500, {
        success: false,
        step: 1,
        message: apiError.message || 'Login failed. Please try again.'
      });
    }
  },

  /**
   * Handles user registration with organization and restaurants using updated backend
   */
  register: async ({ request, fetch }: RequestEvent) => {
    const formData = await request.formData();

    try {
      try {
      } catch (error) {
        console.warn('CSRF token retrieval failed, continuing without it:', error);
      }

      const rawRegistration = formData.get('registrationData')?.toString();
      console.log('Registration data:', { rawRegistration });

      if (!rawRegistration) {
        return fail(400, {
          success: false,
          step: 1,
          message: 'Registration data is required'
        });
      }

      const registrationValidation = registrationSchema.safeParse(rawRegistration);

      if (!registrationValidation.success) {
        console.error('Registration validation error:', JSON.stringify(registrationValidation.error.format(), null, 2));
        return fail(400, {
          success: false,
          step: 1,
          errors: registrationValidation.error.flatten(),
          message: 'Registration data validation failed. Please check all fields and try again.'
        });
      }

      const {
        email, firstName, lastName, isOrganization,
        organizationInput, restaurantsInput, profileImage,
        password, role
      } = registrationValidation.data;

      // Use the updated backend to handle user, organization, and restaurant creation in one request
      console.log('Sending unified registration data to API');
      try {
        const { status, body } = await api.auth.register({
          body: {
            email,
            firstName,
            lastName,
            profileImage,
            password,
            role,
            isOrganization,
            organizationInput: isOrganization ? organizationInput : undefined,
            restaurantsInput
          },
          // headers: csrfToken ? { 'csrf-token': csrfToken } : undefined
        });

        console.log('Registration API response:', status, body ? 'Success' : 'Failed');

        if (status !== 201 || !body) {
          return fail(400, {
            success: false,
            step: 1,
            message: 'Registration failed. The server could not process your request.'
          });
        }

        // Redirect to login page on successful registration
        redirect(303, '/login?registered=true');
      } catch (error) {
        console.error(error)
      }
    } catch (error) {
      // If it's already a redirect, let it propagate
      if (error instanceof Response) {
        throw error;
      }

      console.error('Registration error:', error);
      return fail(500, {
        success: false,
        step: 1,
        message: error instanceof Error ? error.message : 'An unexpected error occurred during registration'
      });
    }
  },

  /**
   * Resends verification code to user's email
   */
  resendCode: async ({ cookies }: RequestEvent) => {
    const email = cookies.get('email');

    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      return fail(400, {
        success: false,
        step: 2,
        message: 'Valid email is required in session'
      });
    }

    try {
      await resendCodeService(emailValidation.data);

      return {
        success: true,
        actionType: 'resendCode',
        message: 'Verification code has been resent to your email',
        step: 2
      };
    } catch (error) {
      console.error('Resend code error:', error);
      const apiError = error as ApiError;

      return fail(apiError.statusCode || 500, {
        success: false,
        step: 2,
        message: apiError.message || 'Failed to resend verification code'
      });
    }
  },

  /**
   * Verifies login code and completes authentication
   */
  verify: async ({ request, cookies }: RequestEvent) => {
    const data = await request.formData();

    const codeValidation = verificationCodeSchema.safeParse(data.get('code'));
    if (!codeValidation.success) {
      return fail(400, {
        success: false,
        step: 2,
        errors: codeValidation.error.flatten(),
        message: 'Invalid verification code format'
      });
    }

    try {
      const res = await verifyLoginCode(codeValidation.data);
      console.log({ res })

      if (!res || !res.sessionToken) {
        return fail(401, {
          success: false,
          step: 2,
          message: 'Invalid or expired verification code'
        });
      }


      // Clear email cookie as it's no longer needed
      cookies.delete('email', { path: '/' });

      setSessionTokenCookie(cookies, res.sessionToken, SESSION_MAX_AGE_THIRTY_DAYS)

      // Redirect to dashboard on successful login
      redirect(303, '/dashboard');
    } catch (error) {
      console.error('Verification error:', error);
      throw error

    }
  }
} satisfies Actions;
