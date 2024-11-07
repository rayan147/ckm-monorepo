import { b as ensure_array_like, c as attr, e as escape_html, p as pop, f as spread_props, g as slot, a as push, h as sanitize_props } from './index-DVBDmo-L.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';

function Save($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    [
      "path",
      {
        "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
      }
    ],
    ["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
  ];
  Icon($$payload, spread_props([
    { name: "save" },
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
  let restaurantInfo = {
    name: "",
    address: "",
    phone: "",
    email: "",
    taxId: ""
  };
  let systemSettings = {
    currency: "USD",
    timeZone: "UTC",
    language: "en",
    allowOnlineOrders: false,
    automaticInventoryUpdates: true
  };
  let notificationSettings = {
    lowStockAlerts: true,
    newOrderNotifications: true,
    dailyReportEmail: true
  };
  let currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
  let timeZones = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney"
  ];
  let languages = ["en", "es", "fr", "de", "it", "ja"];
  const each_array = ensure_array_like(currencies);
  const each_array_1 = ensure_array_like(timeZones);
  const each_array_2 = ensure_array_like(languages);
  $$payload.out += `<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8"><div class="flex items-center justify-between"><h1 class="text-3xl font-bold text-gray-900">Settings</h1></div> <form class="mt-8 space-y-12"><div><h2 class="text-2xl font-semibold text-gray-900">Restaurant Information</h2> <div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-6 sm:grid-cols-6"><div class="sm:col-span-3"><label for="restaurant-name" class="block text-sm font-medium text-gray-700">Restaurant Name</label> <input type="text" name="restaurant-name" id="restaurant-name"${attr("value", restaurantInfo.name)} class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"></div> <div class="sm:col-span-3"><label for="address" class="block text-sm font-medium text-gray-700">Address</label> <input type="text" name="address" id="address"${attr("value", restaurantInfo.address)} class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"></div> <div class="sm:col-span-2"><label for="phone" class="block text-sm font-medium text-gray-700">Phone</label> <input type="tel" name="phone" id="phone"${attr("value", restaurantInfo.phone)} class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"></div> <div class="sm:col-span-2"><label for="email" class="block text-sm font-medium text-gray-700">Email</label> <input type="email" name="email" id="email"${attr("value", restaurantInfo.email)} class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"></div> <div class="sm:col-span-2"><label for="tax-id" class="block text-sm font-medium text-gray-700">Tax ID</label> <input type="text" name="tax-id" id="tax-id"${attr("value", restaurantInfo.taxId)} class="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"></div></div></div> <div><h2 class="text-2xl font-semibold text-gray-900">System Settings</h2> <div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-6 sm:grid-cols-6"><div class="sm:col-span-2"><label for="currency" class="block text-sm font-medium text-gray-700">Currency</label> <select id="currency" name="currency" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let currency = each_array[$$index];
    $$payload.out += `<option${attr("value", currency)}>${escape_html(currency)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div class="sm:col-span-2"><label for="timezone" class="block text-sm font-medium text-gray-700">Time Zone</label> <select id="timezone" name="timezone" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let tz = each_array_1[$$index_1];
    $$payload.out += `<option${attr("value", tz)}>${escape_html(tz)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div class="sm:col-span-2"><label for="language" class="block text-sm font-medium text-gray-700">Language</label> <select id="language" name="language" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let lang = each_array_2[$$index_2];
    $$payload.out += `<option${attr("value", lang)}>${escape_html(lang)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div class="sm:col-span-3"><div class="flex items-center mt-4"><input id="allow-online-orders" name="allow-online-orders" type="checkbox"${attr("checked", systemSettings.allowOnlineOrders, true)} class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"> <label for="allow-online-orders" class="block ml-2 text-sm text-gray-700">Allow Online Orders</label></div></div> <div class="sm:col-span-3"><div class="flex items-center mt-4"><input id="automatic-inventory-updates" name="automatic-inventory-updates" type="checkbox"${attr("checked", systemSettings.automaticInventoryUpdates, true)} class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"> <label for="automatic-inventory-updates" class="block ml-2 text-sm text-gray-700">Automatic Inventory Updates</label></div></div></div></div> <div><h2 class="text-2xl font-semibold text-gray-900">Notification Settings</h2> <div class="mt-6 space-y-4"><div class="flex items-center"><input id="low-stock-alerts" name="low-stock-alerts" type="checkbox"${attr("checked", notificationSettings.lowStockAlerts, true)} class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"> <label for="low-stock-alerts" class="block ml-2 text-sm text-gray-700">Low Stock Alerts</label></div> <div class="flex items-center"><input id="new-order-notifications" name="new-order-notifications" type="checkbox"${attr("checked", notificationSettings.newOrderNotifications, true)} class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"> <label for="new-order-notifications" class="block ml-2 text-sm text-gray-700">New Order Notifications</label></div> <div class="flex items-center"><input id="daily-report-email" name="daily-report-email" type="checkbox"${attr("checked", notificationSettings.dailyReportEmail, true)} class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"> <label for="daily-report-email" class="block ml-2 text-sm text-gray-700">Daily Report Email</label></div></div></div> <div class="pt-8"><div class="flex justify-end"><button type="submit" class="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Save($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Save Settings</button></div></div></form></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DVth4r2x.js.map
