<script lang="ts">
	import { run, preventDefault } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { format } from 'date-fns';
	import type { Shift, User } from '@ckm/types';
	import { X } from 'lucide-svelte';

	interface Props {
		show?: boolean;
		date: Date;
		shift?: Shift | null;
		users?: User[];
		errors?: string[];
	}

	let {
		show = $bindable(false),
		date,
		shift = null,
		users = [],
		errors = []
	}: Props = $props();

	const dispatch = createEventDispatcher();

	let formData = $state({
		userId: shift?.userId || '',
		startTime: shift
			? format(new Date(shift.startTime), "yyyy-MM-dd'T'HH:mm")
			: format(date, "yyyy-MM-dd'T'HH:mm"),
		endTime: shift
			? format(new Date(shift.endTime), "yyyy-MM-dd'T'HH:mm")
			: format(date, "yyyy-MM-dd'T'HH:mm"),
		status: shift?.status || 'SCHEDULED'
	});

	// Update formData when shift or date changes
	run(() => {
		formData.userId = shift?.userId || '';
		formData.startTime = shift
			? format(new Date(shift.startTime), "yyyy-MM-dd'T'HH:mm")
			: format(date, "yyyy-MM-dd'T'HH:mm");
		formData.endTime = shift
			? format(new Date(shift.endTime), "yyyy-MM-dd'T'HH:mm")
			: format(date, "yyyy-MM-dd'T'HH:mm");
		formData.status = shift?.status || 'SCHEDULED';
	});

	function handleSubmit() {
		dispatch('save', formData);
	}

	function handleDelete() {
		dispatch('delete');
	}

	function closeModal() {
		show = false;
		dispatch('close');
	}
</script>

{#if show}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 200 }}
	>
		<!-- Modal Box -->
		<div
			class="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl sm:mx-auto"
			transition:fly={{ y: 20, duration: 300 }}
		>
			<div class="w-full p-6 bg-white rounded-lg shadow-xl">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-xl font-semibold">{shift ? 'Edit Shift' : 'Add New Shift'}</h2>
					<button
						onclick={closeModal}
						class="text-gray-500 hover:text-gray-700 focus:outline-none"
					>
						<X class="w-6 h-6" aria-label="Close modal" />
					</button>
				</div>

				<!-- Display Errors -->
				{#if errors.length > 0}
					<div class="mb-4">
						{#each errors as error}
							<p class="text-sm text-red-600">{error}</p>
						{/each}
					</div>
				{/if}

				<form onsubmit={preventDefault(handleSubmit)} class="space-y-4">
					<!-- User Selection -->
					<div>
						<label for="userId" class="block text-sm font-medium text-gray-700">User</label>
						<select
							id="userId"
							bind:value={formData.userId}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						>
							<option value="">Select User</option>
							{#each users as user}
								<option value={user.id}>{user.firstName} {user.lastName}</option>
							{/each}
						</select>
					</div>

					<!-- Start Time -->
					<div>
						<label for="startTime" class="block text-sm font-medium text-gray-700">Start Time</label
						>
						<input
							type="datetime-local"
							id="startTime"
							bind:value={formData.startTime}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>

					<!-- End Time -->
					<div>
						<label for="endTime" class="block text-sm font-medium text-gray-700">End Time</label>
						<input
							type="datetime-local"
							id="endTime"
							bind:value={formData.endTime}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>

					<!-- Status -->
					<div>
						<label for="status" class="block text-sm font-medium text-gray-700">Status</label>
						<select
							id="status"
							bind:value={formData.status}
							required
							class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						>
							<option value="SCHEDULED">Scheduled</option>
							<option value="COMPLETED">Completed</option>
							<option value="CANCELLED">Cancelled</option>
						</select>
					</div>

					<!-- Action Buttons -->
					<div class="flex justify-between pt-4">
						<button
							type="submit"
							class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							{shift ? 'Update Shift' : 'Create Shift'}
						</button>

						{#if shift}
							<button
								type="button"
								onclick={handleDelete}
								class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Delete Shift
							</button>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
