<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import {
		format,
		addMonths,
		subMonths,
		addWeeks,
		subWeeks,
		startOfMonth,
		endOfMonth,
		startOfWeek,
		endOfWeek
	} from 'date-fns';
	import calendarize from '$lib/utils/calendarize';
	import { api } from '@ckm/lib-api';
	import type { Shift, User } from '@ckm/types';
	import ShiftModal from '$lib/components/Schedule/ShiftModal.svelte';
	import WeekView from '$lib/components/Schedule/WeekView.svelte';
	import MonthView from '$lib/components/Schedule/MonthView.svelte';
	import Arrow from '$lib/components/Schedule/Arrow.svelte';

	let currentDate = $state(new Date());
	let view: 'month' | 'week' = $state('month');
	let shifts: Shift[] = $state([]);
	let showShiftModal = $state(false);
	let selectedDate: Date | null = $state(null);
	let currentShift: Shift | null = $state(null);
	let users: User[] = $state([]);
	let errors: string[] = $state([]);

	// Search term
	let searchTerm: string = $state('');



	// Fetch user data on mount
	onMount(async () => {
		await userNameAndId();
	});

	// Function to fetch shifts based on the current period and view
	async function fetchShiftsForPeriod(date: Date, viewType: 'month' | 'week') {
		let start: Date, end: Date;
		if (viewType === 'month') {
			start = startOfMonth(date);
			end = endOfMonth(date);
		} else {
			start = startOfWeek(date, { weekStartsOn: 0 }); // 0 represents Sunday
			end = endOfWeek(date, { weekStartsOn: 0 });
		}

		try {
			const response = await api.shifts.getShifts({
				query: {
					startTime: start.toISOString(),
					endTime: end.toISOString()
				}
			});

			if (response.status === 200) {
				shifts = response.body;
				console.log(`Successfully fetched ${shifts.length} shifts for ${viewType} view`);
				errors = []; // Clear any previous errors
			} else {
				console.error(`Error fetching shifts: ${response.status}`);
				errors = [`Error fetching shifts: ${response.status}`];
				shifts = []; // Reset shifts to empty array in case of error
			}
		} catch (error: any) {
			console.error('Error fetching shifts:', error);
			errors = [`Error fetching shifts: ${error.message}`];
			shifts = []; // Reset shifts to empty array in case of error
		}
	}

	// Function to fetch user data
	async function userNameAndId() {
		try {
			const response = await api.users.getUsers({});
			if (response.status === 200) {
				users = response.body as User[];
				console.log(`Successfully fetched ${users.length} users`);
			} else {
				console.error(`Error fetching users: ${response.status}`);
				errors = [...errors, `Error fetching users: ${response.status}`];
			}
		} catch (error: any) {
			console.error('Error fetching users:', error);
			errors = [...errors, `Error fetching users: ${error.message}`];
		}
	}

	// Debounce setup for navigation functions
	let debounceTimer: number;

	function debounceFetchShifts(callback: () => void, delay: number) {
		clearTimeout(debounceTimer);
		debounceTimer = window.setTimeout(callback, delay);
	}

	// Navigation functions
	function navigatePrevious() {
		currentDate = view === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1);
		debounceFetchShifts(() => fetchShiftsForPeriod(currentDate, view), 300);
	}

	function navigateNext() {
		currentDate = view === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1);
		debounceFetchShifts(() => fetchShiftsForPeriod(currentDate, view), 300);
	}

	function toggleView() {
		view = view === 'month' ? 'week' : 'month';
	}

	// Modal handling functions
	function openShiftModal(event: CustomEvent) {
		const { date, shift } = event.detail;
		selectedDate = date;
		currentShift = shift;
		showShiftModal = true;
	}

	async function handleShiftSave(event: CustomEvent) {
		const shiftData = event.detail;

		// Validation: Shift cannot be in the past
		if (new Date(shiftData.startTime) < new Date() || new Date(shiftData.endTime) < new Date()) {
			console.error('Shift cannot be created in the past');
			errors = [];
			errors = [...errors, 'Shift cannot be created in the past'];
			return;
		}

		try {
			if (currentShift) {
				await api.shifts.updateShift({
					params: { id: currentShift.id },
					body: shiftData
				});
				console.log('Shift updated successfully');
			} else {
				await api.shifts.createShift({ body: shiftData });
				console.log('Shift created successfully');
			}
			await fetchShiftsForPeriod(currentDate, view);
			showShiftModal = false;
			errors = []; // Clear any previous errors
		} catch (error: any) {
			console.error('Error saving shift:', error);
			errors = [...errors, `Error saving shift: ${error.message}`];
		}
	}

	async function handleShiftDelete() {
		if (currentShift) {
			try {
				await api.shifts.deleteShift({ params: { id: currentShift.id } });
				console.log('Shift deleted successfully');
				await fetchShiftsForPeriod(currentDate, view);
				showShiftModal = false;
				errors = []; // Clear any previous errors
			} catch (error: any) {
				console.error('Error deleting shift:', error);
				errors = [...errors, `Error deleting shift: ${error.message}`];
			}
		}
	}

	function handleModalClose() {
		showShiftModal = false;
	}

	// Reactive calendar data
	let calendarData = $derived(calendarize({ targetDate: currentDate, view }));
	// Reactive fetching of shifts when `currentDate` or `view` changes
	run(() => {
		fetchShiftsForPeriod(currentDate, view);
	});
	// Reactive filtering of shifts based on search term
	let filteredShifts =
		$derived(searchTerm.trim() === ''
			? shifts
			: shifts.filter((shift) => {
					const user = users.find((u) => u.id === shift.userId);
					if (!user) return false;
					const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
					return fullName.includes(searchTerm.toLowerCase());
				}));
</script>

<div class="container p-4 mx-auto">
	<h1 class="mb-4 text-3xl font-bold text-gray-800">Shifts</h1>

	<!-- Navigation and Search Bar -->
	<div class="flex flex-col items-center justify-between mb-4 space-y-4 md:flex-row md:space-y-0">
		<!-- Navigation Arrows and Current Month/Year -->
		<span class="flex items-center justify-between w-full md:w-auto">
			<Arrow left on:click={navigatePrevious}></Arrow>
			<h2 class="mx-4 text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
			<Arrow on:click={navigateNext} class="btn btn-outline"></Arrow>
		</span>

		<!-- Search Bar -->
		<div class="w-full md:w-1/3">
			<input
				type="text"
				bind:value={searchTerm}
				placeholder="Search by user name..."
				class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
			/>
		</div>
	</div>

	<!-- Toggle View Button -->
	<!-- <div class="mb-4">
        <button on:click={toggleView} class="btn btn-primary">
            Switch to {view === 'month' ? 'Week' : 'Month'} View
        </button>
    </div> -->

	<!-- Calendar Views -->
	{#if view === 'month'}
		<MonthView {calendarData} shifts={filteredShifts} {users} on:openShiftModal={openShiftModal} />
	{:else}
		<WeekView {calendarData} shifts={filteredShifts} {users} on:openShiftModal={openShiftModal} />
	{/if}

	<!-- Shift Modal -->
	{#if showShiftModal}
		<ShiftModal
			bind:show={showShiftModal}
			date={selectedDate ?? new Date()}
			shift={currentShift}
			{errors}
			{users}
			on:save={handleShiftSave}
			on:delete={handleShiftDelete}
			on:close={handleModalClose}
		/>
	{/if}

	<!-- Display Errors -->
	{#if errors.length > 0}
		<div class="mt-4">
			{#each errors as error}
				<p class="text-sm text-red-600">{error}</p>
			{/each}
		</div>
	{/if}
</div>
