import { forgotPassword } from "$lib/auth";
import { fail } from "@sveltejs/kit";
import { match, P } from "ts-pattern";
import type { Actions } from './$types';

export const actions = {
  forgotPassword: async ({ request }) => {
    const data = await request.formData();
    const rawEmail = data.get('email')?.toString();

    return match(rawEmail)
      .with(P.string.includes('@'), forgotPassword)
      .with(P.string, () => fail(400, {
        message: 'Invalid email format',
        type: 'failure'
      }))
      .otherwise(() => ({
        type: 'success'
      }))
  }
} satisfies Actions;
