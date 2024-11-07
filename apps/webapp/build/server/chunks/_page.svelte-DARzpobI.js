import { b as ensure_array_like, e as escape_html, c as attr, p as pop, f as spread_props, g as slot, a as push, h as sanitize_props } from './index-DVBDmo-L.js';
import { P as Plus } from './plus-C7nvMQR5.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';
import { S as Search } from './search-hR5CybgE.js';
import { S as Square_pen, T as Trash_2 } from './trash-2-q45MJ6J1.js';

function Triangle_alert($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
      }
    ],
    ["path", { "d": "M12 9v4" }],
    ["path", { "d": "M12 17h.01" }]
  ];
  Icon($$payload, spread_props([
    { name: "triangle-alert" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$payload, $$props) {
  push();
  let inventoryItems = [];
  let categories = [];
  let searchTerm = "";
  let filteredInventoryItems = inventoryItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  let lowStockItems = inventoryItems.filter((item) => item.quantity <= item.reorderPoint);
  const each_array = ensure_array_like(categories);
  const each_array_1 = ensure_array_like(filteredInventoryItems);
  $$payload.out += `<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"><h1 class="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">Inventory Management</h1> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Plus($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Add Inventory Item</button></div> `;
  if (lowStockItems.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mt-6"><div class="p-4 rounded-md bg-yellow-50"><div class="flex"><div class="flex-shrink-0">`;
    Triangle_alert($$payload, { class: "w-5 h-5 text-yellow-400" });
    $$payload.out += `<!----></div> <div class="ml-3"><h3 class="text-sm font-medium text-yellow-800">Low Stock Alert</h3> <div class="mt-2 text-sm text-yellow-700">There are ${escape_html(lowStockItems.length)} items below the reorder point. <a href="#low-stock" class="font-medium text-yellow-800 underline hover:text-yellow-600">View items</a></div></div></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2"><div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
  Search($$payload, { class: "w-5 h-5 text-gray-400" });
  $$payload.out += `<!----></div> <input type="text"${attr("value", searchTerm)} class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search inventory items..."></div> <div><select class="block w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let category = each_array[$$index];
    $$payload.out += `<option${attr("value", category)}>${escape_html(category)}</option>`;
  }
  $$payload.out += `<!--]--></select></div></div> <div class="mt-8"><div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"><div class="overflow-hidden border border-gray-200 rounded-lg shadow-sm"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-100"><tr><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Category</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Quantity</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reorder Point</th><th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let item = each_array_1[$$index_1];
    $$payload.out += `<tr${attr("class", item.quantity <= item.reorderPoint ? "bg-red-50" : "hover:bg-gray-50")}><td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">${escape_html(item.name)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(item.category)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(item.quantity)}
										${escape_html(item.unit)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(item.reorderPoint)}
										${escape_html(item.unit)}</td><td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"><button class="mr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none" title="Edit">`;
    Square_pen($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button> <button class="text-red-600 hover:text-red-900 focus:outline-none" title="Delete">`;
    Trash_2($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button></td></tr>`;
  }
  $$payload.out += `<!--]-->`;
  if (filteredInventoryItems.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<tr><td colspan="5" class="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap">No inventory items found.</td></tr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></tbody></table></div></div></div></div> `;
  if (lowStockItems.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(lowStockItems);
    $$payload.out += `<div id="low-stock" class="mt-12"><h2 class="mb-4 text-2xl font-bold text-gray-900">Low Stock Items</h2> <div class="overflow-hidden bg-white shadow sm:rounded-md"><ul class="divide-y divide-gray-200"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$payload.out += `<li class="hover:bg-gray-50"><div class="flex items-center px-4 py-4 sm:px-6"><div class="flex-1 min-w-0"><div class="flex items-center"><p class="text-sm font-medium text-indigo-600 truncate">${escape_html(item.name)}</p> <p class="ml-2 text-sm text-gray-500">in ${escape_html(item.category)}</p></div> <div class="flex mt-2"><p class="text-sm text-gray-500">Current: ${escape_html(item.quantity)}
											${escape_html(item.unit)}</p> <p class="ml-4 text-sm text-gray-500">Reorder Point: ${escape_html(item.reorderPoint)}
											${escape_html(item.unit)}</p></div></div> <div class="flex-shrink-0 ml-5"><button class="text-sm font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none">Restock</button></div></div></li>`;
    }
    $$payload.out += `<!--]--></ul></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DARzpobI.js.map
