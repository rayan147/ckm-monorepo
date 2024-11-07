// src/routes/+page.server.js
import { api } from '@ckm/lib-api';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const emailFormDataValue = data.get('email');
			if (!emailFormDataValue) {
				return {
					message: 'Please provide an email address.'
				};
			}
			const email = emailFormDataValue.toString();
			const res = await api.earlyAccess.storeEmail({
				body: {
					email
				}
			});

			if (res.status !== 200) {
				return {
					message: `The email ${email} has already been registered.`
				};
			}

			return {
				message: 'Your email has been successfully registered!'
			};
		} catch (error) {
			console.error(error);
			return {
				message: 'An error occurred. Please try again later.'
			};
		}
	}
};
