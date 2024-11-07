import { Y as copy_payload, Z as assign_payload, p as pop, e as escape_html, c as attr, b as ensure_array_like, a as push, d as stringify } from './index-DVBDmo-L.js';
import { r as run } from './legacy-server-aB_mYRX2.js';
import { format, parseISO, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { a as api } from './index2-NJef63Gp.js';
import 'zod';

function calendarize(options) {
  const date = new Date(options.targetDate || /* @__PURE__ */ new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = /* @__PURE__ */ new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const offset = options.offset || 0;
  const view = options.view || "month";
  const weeks = [];
  let currentDate = new Date(firstDay);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay() + offset);
  while (view === "month" ? currentDate <= lastDay : weeks.length < 1) {
    const week = [];
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
function MonthView($$payload, $$props) {
  push();
  let { calendarData, shifts, users = [] } = $$props;
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-red-100",
    "bg-yellow-100",
    "bg-purple-100"
  ];
  function getShiftColor(userId) {
    return colors[userId % colors.length];
  }
  function getShiftsForDay(date) {
    return shifts.filter((shift) => isSameDay(parseISO(shift.startTime), date));
  }
  const each_array = ensure_array_like([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]);
  const each_array_1 = ensure_array_like(calendarData);
  $$payload.out += `<div class="grid grid-cols-7 gap-px bg-gray-200"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let day = each_array[$$index];
    $$payload.out += `<div class="p-2 font-medium text-center text-gray-700 bg-gray-100">${escape_html(day)}</div>`;
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_1.length; $$index_3 < $$length; $$index_3++) {
    let week = each_array_1[$$index_3];
    const each_array_2 = ensure_array_like(week);
    $$payload.out += `<!--[-->`;
    for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
      let day = each_array_2[$$index_2];
      const each_array_3 = ensure_array_like(getShiftsForDay(day.date));
      $$payload.out += `<div${attr("class", `bg-white p-2 h-32 overflow-y-auto relative ${stringify(day.isCurrentMonth ? "" : "opacity-50")}`)}><span${attr("class", `text-sm font-semibold ${stringify(day.isToday ? "text-blue-600" : "text-gray-700")}`)}>${escape_html(format(day.date, "d"))}</span> <!--[-->`;
      for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
        let shift = each_array_3[$$index_1];
        $$payload.out += `<button type="button"${attr("class", `p-1 mt-1 text-xs text-gray-700 rounded cursor-pointer hover:opacity-80 w-full text-left border-1 ${stringify(getShiftColor(shift.userId))}`)}${attr("style", `border-color: ${stringify(getShiftColor(shift.userId))}`)}>${escape_html(users.find((user) => user.id === shift.userId)?.firstName)}
						${escape_html(users.find((user) => user.id === shift.userId)?.lastName)} <br> ${escape_html(format(parseISO(shift.startTime), "HH:mm"))} - ${escape_html(format(parseISO(shift.endTime), "HH:mm"))}</button>`;
      }
      $$payload.out += `<!--]--> <button class="absolute p-1 text-blue-600 bottom-1 right-1 hover:text-blue-800 focus:outline-none"${attr("aria-label", `Add shift on ${format(day.date, "MMMM d, yyyy")}`)}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path></svg></button></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Arrow($$payload, $$props) {
  push();
  let { left = false } = $$props;
  $$payload.out += `<svg tabindex="0" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"${attr("class", `svelte-1w6jh7v ${stringify([left ? "left" : ""].filter(Boolean).join(" "))}`)}><path fill="#c4d9fd" d="M0 256c0 141.2 114.8 256 256 256V0A256.3 256.3 0 000 256z"></path><path fill="#c4d9fd" d="M256 0v512c141.2 0 256-114.8 256-256S397.2 0 256 0z"></path><path fill="#5286fa" d="M226 115.4a23.3 23.3 0 00-33 33L300.7 256 193 363.7a23.3 23.3 0 1033 32.9l124-124.1a23.3 23.3 0 000-33l-124-124z"></path></svg>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let currentDate = /* @__PURE__ */ new Date();
  let view = "month";
  let shifts = [];
  let users = [];
  let errors = [];
  let searchTerm = "";
  async function fetchShiftsForPeriod(date, viewType) {
    let start, end;
    {
      start = startOfMonth(date);
      end = endOfMonth(date);
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
        errors = [];
      } else {
        console.error(`Error fetching shifts: ${response.status}`);
        errors = [`Error fetching shifts: ${response.status}`];
        shifts = [];
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
      errors = [`Error fetching shifts: ${error.message}`];
      shifts = [];
    }
  }
  let calendarData = calendarize({ targetDate: currentDate, view });
  run(() => {
    fetchShiftsForPeriod(currentDate, view);
  });
  let filteredShifts = searchTerm.trim() === "" ? shifts : shifts.filter((shift) => {
    const user = users.find((u) => u.id === shift.userId);
    if (!user)
      return false;
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="container p-4 mx-auto"><h1 class="mb-4 text-3xl font-bold text-gray-800">Shifts</h1> <div class="flex flex-col items-center justify-between mb-4 space-y-4 md:flex-row md:space-y-0"><span class="flex items-center justify-between w-full md:w-auto">`;
    Arrow($$payload2, { left: true });
    $$payload2.out += `<!----> <h2 class="mx-4 text-xl font-semibold">${escape_html(format(currentDate, "MMMM yyyy"))}</h2> `;
    Arrow($$payload2, { class: "btn btn-outline" });
    $$payload2.out += `<!----></span> <div class="w-full md:w-1/3"><input type="text"${attr("value", searchTerm)} placeholder="Search by user name..." class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></div></div>  `;
    {
      $$payload2.out += "<!--[-->";
      MonthView($$payload2, { calendarData, shifts: filteredShifts, users });
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (errors.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(errors);
      $$payload2.out += `<div class="mt-4"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let error = each_array[$$index];
        $$payload2.out += `<p class="text-sm text-red-600">${escape_html(error)}</p>`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cf1hPmin.js.map
