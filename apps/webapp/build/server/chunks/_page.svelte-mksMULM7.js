import { p as pop, s as store_get, e as escape_html, u as unsubscribe_stores, b as ensure_array_like, c as attr, d as stringify, a as push } from './index-DVBDmo-L.js';
import { C as Chef } from './chef-CyxlMox2.js';
import { w as writable } from './index3-r_vjO9dq.js';
import { g as goto } from './client-CQ5E_ugM.js';
import './exports-DuWZopOC.js';

function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function createAuth() {
  const { subscribe, set, update } = writable({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  return {
    subscribe,
    login: (user) => {
      update((n) => ({ ...n, user, isAuthenticated: true, isLoading: false }));
      localStorage.setItem("auth", JSON.stringify({ user, isAuthenticated: true }));
    },
    logout: async () => {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          update((n) => ({ ...n, user: null, isAuthenticated: false, isLoading: false }));
          localStorage.removeItem("auth");
          await goto("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
    init: async () => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const { user, isAuthenticated } = JSON.parse(stored);
        set({ user, isAuthenticated, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    }
  };
}
const auth = createAuth();
function Navbar($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<nav class="bg-white shadow-sm"><div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="flex items-center flex-shrink-0"><div class="w-auto h-10">`;
  Chef($$payload, {});
  $$payload.out += `<!----></div></div></div> <div class="flex items-center"><a href="#email-form" class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600">Product Demo</a> `;
  if (store_get($$store_subs ??= {}, "$auth", auth).isAuthenticated) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600">Welcome, ${escape_html(store_get($$store_subs ??= {}, "$auth", auth).user?.firstName)}</p> <button class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600">Logout</button>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a href="/login" class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600">Login</a>`;
  }
  $$payload.out += `<!--]--> <a href="/register" class="px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:text-gray-600">Sign up</a></div></div></div></nav>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function HeroSection($$payload) {
  $$payload.out += `<div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8"><div class="text-center"><h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"><span class="block">AI answers</span> <span class="block text-indigo-600">for your kitchen</span></h1> <p class="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Empower your kitchen with AI-driven efficiency. CKM streamlines operations, reduces costs, and
			enhances overall kitchen performance.</p> <div class="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8"><div class="rounded-md shadow"><a href="#email-form" class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Get started</a></div></div></div></div>`;
}
function FeatureGrid($$payload, $$props) {
  let { features } = $$props;
  const each_array = ensure_array_like(features);
  $$payload.out += `<div class="bg-gray-50"><div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8"><h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"><span class="block">Comprehensive kitchen management</span> <span class="block text-indigo-600">powered by AI</span></h2> <div class="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let feature = each_array[$$index];
    $$payload.out += `<div class="overflow-hidden bg-white rounded-lg shadow"><div class="px-4 py-5 sm:p-6"><h3 class="text-lg font-medium leading-6 text-gray-900">${escape_html(feature.title)}</h3> <p class="mt-2 text-sm text-gray-500">${escape_html(feature.description)}</p></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
}
function FeatureSection($$payload, $$props) {
  let {
    title,
    description,
    buttonText,
    features,
    reversed = false
  } = $$props;
  $$payload.out += `<div${attr("class", reversed ? "bg-gray-50" : "bg-white")}><div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8"><div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">`;
  if (reversed) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(features);
    $$payload.out += `<div class="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-2 lg:mt-0"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      $$payload.out += `<div class="flex justify-center col-span-1 px-8 py-8"><div class="text-center">${html(feature.icon)} <h3 class="mt-2 text-sm font-medium text-gray-900">${escape_html(feature.title)}</h3></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div${attr("class", reversed ? "mt-8 lg:mt-0" : "")}><h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">${escape_html(title)}</h2> <p class="mt-4 text-xl text-gray-500">${escape_html(description)}</p> <div class="mt-8"><a href="#email-form" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">${escape_html(buttonText)}</a></div></div> `;
  if (!reversed) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(features);
    $$payload.out += `<div class="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-2 lg:mt-0 lg:ml-8"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let feature = each_array_1[$$index_1];
      $$payload.out += `<div class="flex justify-center col-span-1 px-8 py-8"><div class="text-center">${html(feature.icon)} <h3 class="mt-2 text-sm font-medium text-gray-900">${escape_html(feature.title)}</h3></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
}
function CTASection($$payload, $$props) {
  push();
  let { form } = $$props;
  let isSuccess = form?.message && form.message.includes("registered");
  let submitting = false;
  $$payload.out += `<div class="bg-white"><div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8"><h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"><span class="block">Ready to revolutionize</span> <span class="block text-indigo-600">your kitchen management?</span></h2> <div class="mt-8 sm:flex"><div class="w-full sm:max-w-md"><form class="sm:flex" id="email-form" method="post"><input type="email" name="email" placeholder="Enter your email" required class="w-full px-5 py-3 placeholder-gray-500 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"> <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"><button type="submit" class="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"${attr("disabled", submitting, true)}>${escape_html("Get Early Access")}</button></div></form> `;
  if (form?.message) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div id="form-message"${attr("class", `mt-4 text-sm font-medium ${stringify(isSuccess ? "text-green-600" : "text-red-600")}`)}><p class="flex items-center">`;
    if (isSuccess) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`;
    }
    $$payload.out += `<!--]--> ${escape_html(form.message)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}
function Footer($$payload) {
  $$payload.out += `<footer class="bg-white"><div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8"><div class="flex justify-center space-x-6 md:order-2"><a href="#" class="text-gray-400 hover:text-gray-500"><span class="sr-only">Twitter</span> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a> <a href="#" class="text-gray-400 hover:text-gray-500"><span class="sr-only">GitHub</span> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg></a></div> <div class="mt-8 md:mt-0 md:order-1"><p class="text-base text-center text-gray-400">© 2024 CKM. All rights reserved.</p></div></div></footer>`;
}
function _page($$payload, $$props) {
  push();
  let { form } = $$props;
  const features = [
    {
      title: "Insights",
      description: "Get real-time insights into your kitchen operations and customer behavior."
    },
    {
      title: "Business Ops",
      description: "Streamline your kitchen operations with AI-powered recommendations."
    },
    {
      title: "People Ops & HR",
      description: "Manage your staff efficiently with smart scheduling and communication tools."
    }
  ];
  const recipeManagementFeatures = [
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>',
      title: "Recipe Scaling"
    },
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>',
      title: "Menu Optimization"
    }
  ];
  const laborCostFeatures = [
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: "Smart Scheduling"
    },
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
      title: "Productivity Analysis"
    }
  ];
  const profitabilityFeatures = [
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: "Food Cost Analysis"
    },
    {
      icon: '<svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      title: "Smart Pricing"
    }
  ];
  $$payload.out += `<main class="min-h-screen bg-white">`;
  Navbar($$payload);
  $$payload.out += `<!----> `;
  HeroSection($$payload);
  $$payload.out += `<!----> `;
  FeatureGrid($$payload, { features });
  $$payload.out += `<!----> `;
  FeatureSection($$payload, {
    title: "Recipe Management & Menu Engineering",
    description: "Take control of your menu with our advanced recipe management and menu engineering tools.",
    buttonText: "Learn more",
    features: recipeManagementFeatures
  });
  $$payload.out += `<!----> `;
  FeatureSection($$payload, {
    title: "Labor Cost Optimization",
    description: "Reduce labor costs with AI-driven scheduling, time tracking, and productivity analysis.",
    buttonText: "Learn more",
    features: laborCostFeatures,
    reversed: true
  });
  $$payload.out += `<!----> `;
  FeatureSection($$payload, {
    title: "Maximize Profitability",
    description: "Optimize your food costs and pricing strategy with our AI-driven analysis and recommendations.",
    buttonText: "Explore features",
    features: profitabilityFeatures
  });
  $$payload.out += `<!----> `;
  CTASection($$payload, { form });
  $$payload.out += `<!----> `;
  Footer($$payload);
  $$payload.out += `<!----></main>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-mksMULM7.js.map
