<script lang="ts">
	import { run } from 'svelte/legacy';
	import { enhance } from '$app/forms';
	import { match } from 'ts-pattern';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';
	import type { SubmitFunction } from '@sveltejs/kit';
	import RestaurantForm from '../../../../routes/dashboard/organization/RestaurantForm.svelte';

	interface Props {
		form: any;
	}

	let { form }: Props = $props();

	let step = $state(1);
	let email = $state('');
	let password = $state('');
	let code = $state('');
	let submitting = $state(false);
	let error = $state('');

	run(() => {
		if (form?.step) {
			step = form.step;
		}
	});

	const handleEnhance: SubmitFunction = (event) => {
		const form = event.formElement;
		const actionUrl = new URL(form.action).pathname;
		submitting = true;
		error = '';

		return async ({ result, update }) => {
			submitting = false;
			console.log('Result:', result);
			console.log({ actionUrl });

			if (result.data.actionType === 'resendCode') {
				// Handle Resend Code Response
				match(result)
					.with({ type: 'success' }, () => {
						error = 'Verification code has been resent to your email.';
					})
					.with({ type: 'failure' }, (res) => {
						error = res.data?.message || 'An error occurred. Please try again.';
					})
					.otherwise(() => {
						error = 'An unexpected error occurred. Please try again.';
					});
			} else if (result.data.actionType === 'verify') {
				// Handle Verify Code Response
				await match(result)
					.with({ type: 'success' }, async (res) => {
						if (res.data?.type === 'success' && res.data?.location) {
							if (res.data?.user) {
								auth.login(res.data.user);
								email = res.data.email;
								await goto(res.data.location);
							}
						}
					})
					.with({ type: 'failure' }, (res) => {
						error = res.data?.message || 'An error occurred. Please try again.';
					})
					.otherwise(() => {
						error = 'An unexpected error occurred. Please try again.';
					});
			} else {
				// Handle Login Response
				match(result)
					.with({ type: 'success' }, (res) => {
						if (res.data?.step) {
							step = res.data.step;
							email = res.data.email;
						}
					})
					.with({ type: 'failure' }, (res) => {
						error = res.data?.message || 'An error occurred. Please try again.';
					})
					.otherwise(() => {
						error = 'An unexpected error occurred. Please try again.';
					});
			}

			await update();
		};
	};
</script>

<h2 class="mb-6 text-2xl font-bold text-center text-gray-900">
	{step === 1 ? 'Sign in to your account' : 'Enter Verification Code'}
</h2>

{#if error}
	<div class="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
		{error}
	</div>
{/if}

{#if step === 1}
	<!-- Login Form -->
	<form method="POST" action="?/login" use:enhance={handleEnhance} class="space-y-4">
		<div>
			<input
				type="email"
				name="email"
				bind:value={email}
				placeholder="Email address"
				required
				class="w-full px-3 py-2 border rounded-md"
			/>
		</div>
		<div>
			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="Password"
				required
				class="w-full px-3 py-2 border rounded-md"
			/>
		</div>
		<div class="flex items-center justify-between text-sm">
			<label class="flex items-center">
				<input type="checkbox" name="remember-me" class="mr-2" />
				Remember me
			</label>
			<a href="/forgot-password" class="text-indigo-600 hover:underline">Forgot password?</a>
		</div>
		<button
			type="submit"
			class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
			disabled={submitting}
		>
			{submitting ? 'Processing...' : 'Sign in'}
		</button>
	</form>
	<p class="mt-4 text-sm text-center">
		Don't have an account?
		<a href="/register" class="text-indigo-600 hover:underline">Create one</a>
	</p>
{:else if step === 2}
	<!-- Verify Code Form -->
	<form method="POST" action="?/verify" use:enhance={handleEnhance} class="space-y-4">
		<input
			type="text"
			name="code"
			bind:value={code}
			placeholder="Enter verification code"
			class="w-full px-3 py-2 border rounded-md"
		/>
		<input type="hidden" name="email" value={email} />

		<button
			type="submit"
			class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
			disabled={submitting}
		>
			{submitting ? 'Processing...' : 'Verify Code'}
		</button>
	</form>

	<!-- Resend Code Form -->
	<form method="POST" action="?/resendCode" use:enhance={handleEnhance} class="mt-4">
		<input type="hidden" name="email" value={email} />
		<button
			type="submit"
			class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
			disabled={submitting}
		>
			Resend Code
		</button>
	</form>
{/if}
