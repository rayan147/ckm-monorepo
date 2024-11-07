import { c as attr, p as pop, a as push } from './index-DVBDmo-L.js';
import './index2-NJef63Gp.js';
import { P as Plus } from './plus-C7nvMQR5.js';
import { S as Search } from './search-hR5CybgE.js';
import 'zod';
import './Icon-CpfcK_Ck.js';

function _page($$payload, $$props) {
  push();
  let cookbooks = [];
  let searchTerm = "";
  cookbooks.filter((cookbook) => cookbook.name.toLowerCase().includes(searchTerm.toLowerCase()) || cookbook.category.toLowerCase().includes(searchTerm.toLowerCase()));
  $$payload.out += `<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"><h1 class="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">Cookbooks</h1> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Plus($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Add Cookbook</button></div> <div class="mt-6"><div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
  Search($$payload, { class: "w-5 h-5 text-gray-400" });
  $$payload.out += `<!----></div> <input type="text"${attr("value", searchTerm)} class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search cookbooks..."></div></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="mt-4 text-center text-gray-500">Loading cookbooks...</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BzBYVC6x.js.map
