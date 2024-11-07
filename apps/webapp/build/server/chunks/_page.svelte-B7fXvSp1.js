import { b as ensure_array_like, c as attr, e as escape_html, p as pop, a as push } from './index-DVBDmo-L.js';
import { P as Plus } from './plus-C7nvMQR5.js';
import { S as Search } from './search-hR5CybgE.js';
import { S as Square_pen, T as Trash_2 } from './trash-2-q45MJ6J1.js';
import './Icon-CpfcK_Ck.js';

function _page($$payload, $$props) {
  push();
  let staff = [];
  let searchTerm = "";
  let filteredStaff = staff.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.role.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const each_array = ensure_array_like(filteredStaff);
  $$payload.out += `<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"><h1 class="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">Staff Management</h1> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Plus($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Add Staff Member</button></div> <div class="mt-6"><div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
  Search($$payload, { class: "w-5 h-5 text-gray-400" });
  $$payload.out += `<!----></div> <input type="text"${attr("value", searchTerm)} class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search staff..."></div></div> <div class="flex flex-col mt-8"><div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"><div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th><th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let member = each_array[$$index];
    $$payload.out += `<tr class="hover:bg-gray-50"><td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">${escape_html(member.name)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(member.role)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(member.email)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(member.phone)}</td><td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"><button class="mr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none" title="Edit">`;
    Square_pen($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button> <button class="text-red-600 hover:text-red-900 focus:outline-none" title="Delete">`;
    Trash_2($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button></td></tr>`;
  }
  $$payload.out += `<!--]-->`;
  if (filteredStaff.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<tr><td colspan="5" class="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap">No staff members found.</td></tr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></tbody></table></div></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B7fXvSp1.js.map
