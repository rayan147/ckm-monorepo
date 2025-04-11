<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { format, isSameDay, parseISO } from 'date-fns';
	import type { Shift, User } from '@ckm/types';
	import type { Week } from '$lib/utils/calendarize';

	interface Props {
		calendarData: Week[];
		shifts: Shift[];
		users?: User[];
	}

	let { calendarData, shifts, users = [] }: Props = $props();

	const dispatch = createEventDispatcher();
	const colors = ['bg-blue-100', 'bg-green-100', 'bg-red-100', 'bg-yellow-100', 'bg-purple-100'];

	// Function to get a color for the shift based on userId
	function getShiftColor(userId: number) {
		return colors[userId % colors.length];
	}

	// Function to get shifts for a specific day
	function getShiftsForDay(date: Date) {
		return shifts.filter((shift) => isSameDay(parseISO(shift.startTime), date));
	}
</script>

<!-- Calendar Layout -->
<div class="grid grid-cols-7 gap-px bg-gray-200">
	<!-- Weekday Headers -->
	{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
		<div class="p-2 font-medium text-center text-gray-700 bg-gray-100">{day}</div>
	{/each}

	<!-- Calendar Data for Each Week in the Month -->
	{#each calendarData as week}
		{#each week as day}
			<div
				class="bg-white p-2 h-32 overflow-y-auto relative {day.isCurrentMonth ? '' : 'opacity-50'}"
			>
				<!-- Day Number -->
				<span class="text-sm font-semibold {day.isToday ? 'text-blue-600' : 'text-gray-700'}">
					{format(day.date, 'd')}
				</span>

				<!-- Shifts for That Day -->
				{#each getShiftsForDay(day.date) as shift}
					<button
						type="button"
						class="p-1 mt-1 text-xs text-gray-700 rounded cursor-pointer hover:opacity-80 w-full text-left border-1 {getShiftColor(
							shift.userId
						)}"
						style="border-color: {getShiftColor(shift.userId)}"
						onclick={() => dispatch('openShiftModal', { date: day.date, shift })}
					>
						{users.find((user) => user.id === shift.userId)?.firstName}
						{users.find((user) => user.id === shift.userId)?.lastName}
						<br />
						{format(parseISO(shift.startTime), 'HH:mm')} - {format(
							parseISO(shift.endTime),
							'HH:mm'
						)}
					</button>
				{/each}

				<!-- Add New Shift Button -->
				<button
					class="absolute p-1 text-blue-600 bottom-1 right-1 hover:text-blue-800 focus:outline-none"
					onclick={() => dispatch('openShiftModal', { date: day.date })}
					aria-label={`Add shift on ${format(day.date, 'MMMM d, yyyy')}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6v12m6-6H6"
						/>
					</svg>
				</button>
			</div>
		{/each}
	{/each}
</div>

<style>
	/* Custom styles can be added here if needed */
</style>
