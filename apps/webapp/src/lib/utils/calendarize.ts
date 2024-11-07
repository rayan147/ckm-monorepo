export interface CalendarOptions {
	targetDate?: Date | string;
	offset?: number;
	view?: 'month' | 'week';
}

export interface CalendarDay {
	date: Date;
	dayOfMonth: number;
	isCurrentMonth: boolean;
	isToday: boolean;
}

export type Week = CalendarDay[];

export default function calendarize(options: CalendarOptions): Week[] {
	const date = new Date(options.targetDate || new Date());
	const year = date.getFullYear();
	const month = date.getMonth();
	const today = new Date();

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const offset = options.offset || 0;
	const view = options.view || 'month';

	const weeks: Week[] = [];
	let currentDate = new Date(firstDay);
	currentDate.setDate(currentDate.getDate() - currentDate.getDay() + offset);

	while (view === 'month' ? currentDate <= lastDay : weeks.length < 1) {
		const week: Week = [];
		for (let i = 0; i < 7; i++) {
			week.push({
				date: new Date(currentDate),
				dayOfMonth: currentDate.getDate(),
				isCurrentMonth: currentDate.getMonth() === month,
				isToday: currentDate.toDateString() === today.toDateString()
			});
			currentDate.setDate(currentDate.getDate() + 1);
		}
		weeks.push(week);
	}

	return weeks;
}
