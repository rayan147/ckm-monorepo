import { e as escape_html, p as pop, s as store_get, b as ensure_array_like, c as attr, u as unsubscribe_stores, f as spread_props, g as slot, a as push, h as sanitize_props } from './index-DVBDmo-L.js';
import { o as onDestroy } from './index-server-RG6-_s_N.js';
import { w as writable } from './index3-r_vjO9dq.js';
import { P as Plus } from './plus-C7nvMQR5.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';
import { a as Chevron_left, C as Chevron_right } from './chevron-right-CjrHxSZy.js';
import { S as Search } from './search-hR5CybgE.js';
import { S as Square_pen, T as Trash_2 } from './trash-2-q45MJ6J1.js';
import { D as Dollar_sign } from './dollar-sign-B9SbwHjR.js';
import { C as Chef_hat } from './chef-hat-DZ4hi1cU.js';

function Map_pin($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    [
      "circle",
      { "cx": "12", "cy": "10", "r": "3" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "map-pin" },
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
function Shopping_bag($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"
      }
    ],
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M16 10a4 4 0 0 1-8 0" }]
  ];
  Icon($$payload, spread_props([
    { name: "shopping-bag" },
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
function Trending_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polyline",
      { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }
    ],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  Icon($$payload, spread_props([
    { name: "trending-up" },
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
function createRestaurantStore() {
  const { subscribe, set, update } = writable({
    restaurants: [],
    loading: false,
    error: null
  });
  return {
    subscribe,
    fetchRestaurants: async () => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/restaurants");
        if (!response.ok)
          throw new Error("Failed to fetch restaurants");
        const data = await response.json();
        update((state) => ({ ...state, restaurants: data, loading: false }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    addRestaurant: async (newRestaurant) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newRestaurant)
        });
        if (!response.ok)
          throw new Error("Failed to add restaurant");
        const addedRestaurant = await response.json();
        update((state) => ({
          ...state,
          restaurants: [...state.restaurants, addedRestaurant],
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    updateRestaurant: async (updatedRestaurant) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch(`/api/restaurants/${updatedRestaurant.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedRestaurant)
        });
        if (!response.ok)
          throw new Error("Failed to update restaurant");
        const updated = await response.json();
        update((state) => ({
          ...state,
          restaurants: state.restaurants.map((r) => r.id === updated.id ? updated : r),
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    deleteRestaurant: async (id) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch(`/api/restaurants/${id}`, {
          method: "DELETE"
        });
        if (!response.ok)
          throw new Error("Failed to delete restaurant");
        update((state) => ({
          ...state,
          restaurants: state.restaurants.filter((r) => r.id !== id),
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    }
  };
}
const restaurantStore = createRestaurantStore();
function RestaurantList($$payload, $$props) {
  push();
  var $$store_subs;
  let currentPage = 1;
  let itemsPerPage = 5;
  let paginatedRestaurants = store_get($$store_subs ??= {}, "$restaurantStore", restaurantStore).restaurants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const each_array = ensure_array_like(paginatedRestaurants);
  $$payload.out += `<div class="mt-8"><div class="flex items-center justify-between"><h2 class="text-2xl font-semibold text-gray-900">Restaurants</h2> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Plus($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Add Restaurant</button></div> <div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md"><ul class="divide-y divide-gray-200"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let restaurant = each_array[$$index];
    $$payload.out += `<li><div class="flex items-center px-4 py-4 sm:px-6"><div class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between"><div><div class="flex text-sm"><p class="font-medium text-indigo-600 truncate">${escape_html(restaurant.name)}</p></div> <div class="flex mt-2"><div class="flex items-center text-sm text-gray-500">`;
    Map_pin($$payload, {
      class: "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
    });
    $$payload.out += `<!----> <p>${escape_html(restaurant.address)}</p></div></div></div> <div class="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5"><div class="flex overflow-hidden"><p class="text-sm font-medium text-gray-500">Manager: ${escape_html(restaurant.manager)}</p></div></div></div> <div class="flex-shrink-0 ml-5"><button class="mr-4 font-medium text-indigo-600 hover:text-indigo-500">View</button> <button class="font-medium text-indigo-600 hover:text-indigo-500">Edit</button></div></div></li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div class="flex justify-between mt-4"><button${attr("disabled", currentPage === 1, true)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">`;
  Chevron_left($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Previous</button> <button${attr("disabled", currentPage === Math.ceil(store_get($$store_subs ??= {}, "$restaurantStore", restaurantStore).restaurants.length / itemsPerPage), true)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next `;
  Chevron_right($$payload, { class: "w-5 h-5 ml-2" });
  $$payload.out += `<!----></button></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function createUserStore() {
  const { subscribe, set, update } = writable({
    users: [],
    loading: false,
    error: null
  });
  return {
    subscribe,
    fetchUsers: async () => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/users");
        if (!response.ok)
          throw new Error("Failed to fetch users");
        const data = await response.json();
        update((state) => ({ ...state, users: data, loading: false }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    addUser: async (newUser) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        });
        if (!response.ok)
          throw new Error("Failed to add user");
        const addedUser = await response.json();
        update((state) => ({
          ...state,
          users: [...state.users, addedUser],
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    updateUser: async (updatedUser) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch(`/api/users/${updatedUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedUser)
        });
        if (!response.ok)
          throw new Error("Failed to update user");
        const updated = await response.json();
        update((state) => ({
          ...state,
          users: state.users.map((u) => u.id === updated.id ? updated : u),
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    deleteUser: async (id) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE"
        });
        if (!response.ok)
          throw new Error("Failed to delete user");
        update((state) => ({
          ...state,
          users: state.users.filter((u) => u.id !== id),
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    }
  };
}
const userStore = createUserStore();
function UserList($$payload, $$props) {
  push();
  var $$store_subs;
  let searchTerm = "";
  let filteredUsers = store_get($$store_subs ??= {}, "$userStore", userStore).users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase()));
  const each_array = ensure_array_like(filteredUsers);
  $$payload.out += `<div class="mt-8"><div class="flex items-center justify-between"><h2 class="text-2xl font-semibold text-gray-900">Users</h2> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Plus($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Add User</button></div> <div class="mt-4"><div class="relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
  Search($$payload, { class: "w-5 h-5 text-gray-400" });
  $$payload.out += `<!----></div> <input type="text"${attr("value", searchTerm)} class="block w-full pl-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search users..."></div></div> <div class="flex flex-col mt-8"><div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"><div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th><th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th><th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let user = each_array[$$index];
    $$payload.out += `<tr><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 w-10 h-10"><img class="w-10 h-10 rounded-full"${attr("src", `https://ui-avatars.com/api/?name=${user.name.replace(" ", "+")}&background=random`)} alt=""></div> <div class="ml-4"><div class="text-sm font-medium text-gray-900">${escape_html(user.name)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${escape_html(user.email)}</div></td><td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">${escape_html(user.role)}</span></td><td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"><button class="mr-4 text-indigo-600 hover:text-indigo-900">`;
    Square_pen($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button> <button class="text-red-600 hover:text-red-900">`;
    Trash_2($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div></div></div></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function createOrganizationStore() {
  const { subscribe, set, update } = writable({
    organization: null,
    loading: false,
    error: null
  });
  return {
    subscribe,
    fetchOrganization: async () => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/organization");
        if (!response.ok)
          throw new Error("Failed to fetch organization data");
        const data = await response.json();
        update((state) => ({ ...state, organization: data, loading: false }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    updateOrganization: async (updatedOrganization) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/organization", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedOrganization)
        });
        if (!response.ok)
          throw new Error("Failed to update organization data");
        const data = await response.json();
        update((state) => ({ ...state, organization: data, loading: false }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    setError: (error) => {
      update((state) => ({ ...state, error }));
    },
    clearError: () => {
      update((state) => ({ ...state, error: null }));
    },
    reset: () => {
      set({ organization: null, loading: false, error: null });
    }
  };
}
const organizationStore = createOrganizationStore();
function createKPIStore() {
  const { subscribe, set, update } = writable({
    totalRevenue: 0,
    revenueGrowth: 0,
    totalOrders: 0,
    orderGrowth: 0,
    totalEmployees: 0,
    averageOrderValue: 0,
    loading: false,
    error: null
  });
  return {
    subscribe,
    fetchKPIs: async () => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await fetch("/api/kpis");
        if (!response.ok)
          throw new Error("Failed to fetch KPIs");
        const data = await response.json();
        update((state) => ({
          ...state,
          ...data,
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    }
  };
}
const kpiStore = createKPIStore();
function KPIDashboard($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div class="mt-8"><h2 class="text-2xl font-semibold text-gray-900">Organization KPIs</h2> <div class="grid grid-cols-1 gap-5 mt-4 sm:grid-cols-2 lg:grid-cols-4"><div class="overflow-hidden bg-white rounded-lg shadow"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0">`;
  Dollar_sign($$payload, { class: "w-6 h-6 text-gray-400" });
  $$payload.out += `<!----></div> <div class="flex-1 w-0 ml-5"><dl><dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt> <dd class="flex items-baseline"><div class="text-2xl font-semibold text-gray-900">$${escape_html(store_get($$store_subs ??= {}, "$kpiStore", kpiStore).totalRevenue.toLocaleString())}</div> <div class="flex items-baseline ml-2 text-sm font-semibold text-green-600">`;
  Trending_up($$payload, {
    class: "self-center flex-shrink-0 w-5 h-5 text-green-500"
  });
  $$payload.out += `<!----> <span class="sr-only">Increased by</span> ${escape_html(store_get($$store_subs ??= {}, "$kpiStore", kpiStore).revenueGrowth)}%</div></dd></dl></div></div></div></div> <div class="overflow-hidden bg-white rounded-lg shadow"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0">`;
  Shopping_bag($$payload, { class: "w-6 h-6 text-gray-400" });
  $$payload.out += `<!----></div> <div class="flex-1 w-0 ml-5"><dl><dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt> <dd class="flex items-baseline"><div class="text-2xl font-semibold text-gray-900">${escape_html(store_get($$store_subs ??= {}, "$kpiStore", kpiStore).totalOrders.toLocaleString())}</div> <div class="flex items-baseline ml-2 text-sm font-semibold text-green-600">`;
  Trending_up($$payload, {
    class: "self-center flex-shrink-0 w-5 h-5 text-green-500"
  });
  $$payload.out += `<!----> <span class="sr-only">Increased by</span> ${escape_html(store_get($$store_subs ??= {}, "$kpiStore", kpiStore).orderGrowth)}%</div></dd></dl></div></div></div></div> <div class="overflow-hidden bg-white rounded-lg shadow"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0">`;
  Chef_hat($$payload, { class: "w-6 h-6 text-gray-400" });
  $$payload.out += `<!----></div> <div class="flex-1 w-0 ml-5"><dl><dt class="text-sm font-medium text-gray-500 truncate">Total Employees</dt> <dd class="flex items-baseline"><div class="text-2xl font-semibold text-gray-900">${escape_html(store_get($$store_subs ??= {}, "$kpiStore", kpiStore).totalEmployees.toLocaleString())}</div></dd></dl></div></div></div></div> <div class="overflow-hidden bg-white rounded-lg shadow"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0">`;
  Dollar_sign($$payload, { class: "w-6 h-6 text-gray-400" });
  $$payload.out += `<!----></div> <div class="flex-1 w-0 ml-5"><dl><dt class="text-sm font-medium text-gray-500 truncate">Average Order Value</dt> <dd class="flex items-baseline"><div class="text-2xl font-semibold text-gray-900">$${escape_html(store_get($$store_subs ??= {}, "$kpiStore", kpiStore).averageOrderValue.toFixed(2))}</div></dd></dl></div></div></div></div></div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  let organization = void 0;
  let loading = void 0;
  let error = void 0;
  const unsubscribe = organizationStore.subscribe((state) => {
    organization = state.organization;
    loading = state.loading;
    error = state.error;
  });
  onDestroy(unsubscribe);
  $$payload.out += `<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"><div class="flex items-center justify-between"><h1 class="text-3xl font-semibold text-gray-900">Organization Management</h1> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">`;
  Square_pen($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Edit Organization</button></div> `;
  if (error) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="relative px-4 py-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded" role="alert"><strong class="font-bold">Error:</strong> <span class="block sm:inline">${escape_html(error)}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (loading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mt-8 text-center"><p>Loading organization information...</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (organization) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="mt-8 overflow-hidden bg-white shadow sm:rounded-lg"><div class="px-4 py-5 sm:px-6"><h3 class="text-lg font-medium leading-6 text-gray-900">Organization Information</h3></div> <div class="px-4 py-5 border-t border-gray-200 sm:px-6"><dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2"><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">Organization name</dt> <dd class="mt-1 text-sm text-gray-900">${escape_html(organization.name)}</dd></div> <div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">Description</dt> <dd class="mt-1 text-sm text-gray-900">${escape_html(organization.description)}</dd></div> <div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">Contact email</dt> <dd class="mt-1 text-sm text-gray-900">${escape_html(organization.contactEmail)}</dd></div> <div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">Contact phone</dt> <dd class="mt-1 text-sm text-gray-900">${escape_html(organization.contactPhone)}</dd></div> <div class="sm:col-span-2"><dt class="text-sm font-medium text-gray-500">Address</dt> <dd class="mt-1 text-sm text-gray-900">${escape_html(organization.address)}</dd></div></dl></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  KPIDashboard($$payload);
  $$payload.out += `<!----> `;
  RestaurantList($$payload);
  $$payload.out += `<!----> `;
  UserList($$payload);
  $$payload.out += `<!----></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-E6kHw290.js.map
