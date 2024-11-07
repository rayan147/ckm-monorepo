<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		format,
		parseISO,
		isSameDay,
		startOfWeek,
		endOfWeek,
		addDays,
		differenceInDays,
		max,
		min
	} from 'date-fns';
	import type { Shift, User } from '@ckm/types';
	import type { Week } from '$lib/utils/calendarize';

	interface Props {
		calendarData: Week[];
		shifts: Shift[];
		users?: Partial<User[]>;
	}

	let { calendarData, shifts, users = [] }: Props = $props();

	const dispatch = createEventDispatcher();
	const colors = [
		'bg-red-100',
		'bg-green-100',
		'bg-blue-100',
		'bg-yellow-100',
		'bg-purple-100',
		'bg-pink-100',
		'bg-indigo-100'
	];

	function getShiftColor(userId: number) {
		return colors[userId % colors.length];
	}

	function getShiftsForMonth(monthStart: Date, monthEnd: Date) {
		return shifts
			.filter((shift) => {
				const shiftStart = parseISO(String(shift.startTime));
				const shiftEnd = parseISO(String(shift.endTime));
				return shiftStart < monthEnd && shiftEnd > monthStart;
			})
			.sort(
				(a, b) => parseISO(String(a.startTime)).getTime() - parseISO(String(b.startTime)).getTime()
			);
	}

	function getShiftPosition(shift: Shift, monthStart: Date, monthEnd: Date) {
		const shiftStart = max([parseISO(String(shift.startTime)), monthStart]);
		const shiftEnd = min([parseISO(String(shift.endTime)), monthEnd]);
		const startDayDiff = differenceInDays(shiftStart, monthStart);
		const duration = differenceInDays(shiftEnd, shiftStart) + 1;
		return {
			start: startDayDiff + 1, // +1 because CSS grid is 1-indexed
			span: duration
		};
	}

	let monthStart = $derived(calendarData[0][0].date);
	let monthEnd = $derived(calendarData[calendarData.length - 1][6].date);
	let monthShifts = $derived(getShiftsForMonth(monthStart, monthEnd));

	function calculateShiftTopOffset(shift, overlappingShifts) {
		const index = overlappingShifts.findIndex((s) => s.id === shift.id);
		return index * 4; // Offset each shift vertically by 4rem to prevent overlap
	}

	function getOverlappingShifts(shift, shifts) {
		return shifts.filter((s) => {
			const sStart = parseISO(String(s.startTime));
			const sEnd = parseISO(String(s.endTime));
			return sStart < parseISO(String(shift.endTime)) && sEnd > parseISO(String(shift.startTime));
		});
	}

	let containerHeight = $derived(Math.max(monthShifts.length * 4, 10)); // Set a minimum height of 10rem, scale with number of shifts
</script>

<div class="overflow-hidden bg-white rounded-lg shadow">
	<!-- Weekday headers -->
	<div class="grid grid-cols-7 gap-px bg-gray-200">
		{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
			<div class="p-2 font-medium text-center text-gray-700 bg-gray-100">{day}</div>
		{/each}
	</div>

	<!-- Calendar grid -->
	{#each calendarData as week}
		<div class="grid grid-cols-7 gap-px bg-white">
			{#each week as day}
				<div class="relative h-32 p-2 bg-white border-t border-gray-200">
					<span
						class="text-sm font-semibold {isSameDay(day.date, new Date())
							? 'text-blue-600'
							: day.currentMonth
								? 'text-gray-700'
								: 'text-gray-400'}"
					>
						{format(day.date, 'd')}
					</span>

					<button
						class="absolute p-1 text-lg text-blue-600 z-1 bottom-1 right-1 hover:text-blue-800"
						onclick={() => dispatch('openShiftModal', { date: day.date })}
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
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							></path>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/each}

	<!-- Shifts layout with dynamic height -->
	<div class="relative" style="height: {containerHeight}rem;">
		{#each monthShifts as shift, index}
			{@const position = getShiftPosition(shift, monthStart, monthEnd)}
			{@const overlappingShifts = getOverlappingShifts(shift, monthShifts)}
			{@const topOffset = calculateShiftTopOffset(shift, overlappingShifts)}

			<button
				type="button"
				class="absolute p-1 text-xs text-gray-800 rounded-md cursor-pointer hover:opacity-80 text-left shadow-sm transition-all duration-200 ease-in-out hover:shadow-md {getShiftColor(
					shift.userId
				)}"
				style="
                    left: calc({((position.start - 1) / 7) * 100}%);
                    top: {topOffset}rem;
                    width: calc({(position.span / 7) * 100}% - 10px);
                    height: 3rem;
                    max-height: 3rem;
                    min-height: 3rem;
                    margin: 0.7rem;
                    padding: 0.8rem;
                    border-radius: 0.8rem;
                "
				onclick={() =>
					dispatch('openShiftModal', {
						date: parseISO(String(shift.startTime)).toISOString(),
						shift
					})}
			>
				{format(parseISO(shift.startTime.toString()), 'EE hh:mm a')} - {format(
					parseISO(shift.endTime.toString()),
					'EE hh:mm a'
				)}
				{users.find((user) => user.id === shift.userId)?.firstName}
				{users.find((user) => user.id === shift.userId)?.lastName}
			</button>
		{/each}
	</div>
</div>
