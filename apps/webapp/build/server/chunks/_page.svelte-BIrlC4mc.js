import { c as attr, Y as copy_payload, Z as assign_payload, p as pop, d as stringify, a as push, j as bind_props, b as ensure_array_like, e as escape_html, f as spread_props, g as slot, W as rest_props, i as fallback, V as spread_attributes, h as sanitize_props } from './index-DVBDmo-L.js';
import { r as run } from './legacy-server-aB_mYRX2.js';
import { a as api } from './index2-NJef63Gp.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';
import { S as Square_pen, T as Trash_2 } from './trash-2-q45MJ6J1.js';
import { C as Chevron_right, a as Chevron_left } from './chevron-right-CjrHxSZy.js';
import { o as onDestroy } from './index-server-RG6-_s_N.js';
import { P as Plus } from './plus-C7nvMQR5.js';
import { S as Search } from './search-hR5CybgE.js';
import { w as writable } from './index3-r_vjO9dq.js';
import 'zod';

function Printer($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
      }
    ],
    [
      "path",
      { "d": "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }
    ],
    [
      "rect",
      {
        "x": "6",
        "y": "14",
        "width": "12",
        "height": "8",
        "rx": "1"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "printer" },
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
function Refresh_cw($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
      }
    ],
    ["path", { "d": "M21 3v5h-5" }],
    [
      "path",
      {
        "d": "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
      }
    ],
    ["path", { "d": "M8 16H3v5" }]
  ];
  Icon($$payload, spread_props([
    { name: "refresh-cw" },
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
function Scale($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"
      }
    ],
    [
      "path",
      {
        "d": "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"
      }
    ],
    ["path", { "d": "M7 21h10" }],
    ["path", { "d": "M12 3v18" }],
    [
      "path",
      { "d": "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "scale" },
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
function RecipeDetailsView($$payload, $$props) {
  push();
  let {
    currentRecipe = void 0,
    restaurants,
    cookBooks,
    ingredientsList,
    isScaling = void 0,
    scaleFactor = void 0,
    isConvertingUnits = void 0,
    currentIngredientIndex = void 0,
    newUnit = void 0,
    convertedQuantity = void 0,
    allUnits,
    editRecipe,
    openUnitConversion,
    closeUnitConversion,
    convertUnit,
    applyUnitConversion,
    handleClickOutside,
    goBack,
    startStandardization,
    standardizeIngredients
  } = $$props;
  let desiredScaleFactor = 1;
  currentRecipe.servings;
  const each_array = ensure_array_like(currentRecipe.ingredients);
  const each_array_1 = ensure_array_like(currentRecipe.instructions);
  $$payload.out += `<div class="overflow-hidden bg-white rounded-lg shadow-xl svelte-7w8uam"><div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 svelte-7w8uam"><div class="px-6 py-4 border-b border-gray-200 bg-gray-50 print:hidden svelte-7w8uam"><div class="flex items-center justify-between"><h2 class="text-3xl font-bold text-gray-800 svelte-7w8uam">${escape_html(currentRecipe.name)}</h2> <div class="flex space-x-2"><button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">`;
  Scale($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> ${escape_html(isScaling ? "Cancel Scaling" : "Scale Recipe")}</button> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">`;
  Square_pen($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Edit</button> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">`;
  Printer($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Print</button> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Standardize Ingredients</button></div></div></div> <div class="px-6 py-6">`;
  if (isScaling) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="p-4 mb-6 rounded-md bg-blue-50"><h3 class="mb-2 text-lg font-medium text-blue-800 svelte-7w8uam">Scale Recipe</h3> <div class="flex items-center space-x-4"><input type="number"${attr("value", desiredScaleFactor)} min="0.1" step="0.1" class="w-24 px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 svelte-7w8uam"> <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Apply Scaling</button> <button class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Reset</button></div> <p class="mt-2 text-sm text-blue-600">Enter a number to scale the recipe. For example, 2 will double the recipe, 0.5 will
						halve it. You also able to scale based on ingredient constrain, just edit the
						ingredient's amount to adjust the recipe</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="grid grid-cols-1 gap-6 md:grid-cols-3"><div class="md:col-span-1">`;
  if (currentRecipe.imageUrl) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("src", currentRecipe.imageUrl)}${attr("alt", currentRecipe.name)} class="object-cover w-full h-64 mb-4 rounded-lg shadow-md svelte-7w8uam">`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="p-4 rounded-lg shadow-md bg-gray-50 svelte-7w8uam"><h3 class="mb-2 text-lg font-semibold text-gray-700 svelte-7w8uam">Recipe Details</h3> <p><strong>Servings:</strong> ${escape_html(currentRecipe.servings)}</p> <p><strong>Prep Time:</strong> ${escape_html(currentRecipe.prepTime)} mins</p> <p><strong>Cook Time:</strong> ${escape_html(currentRecipe.cookTime)} mins</p> `;
  if (currentRecipe.frequency !== null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p><strong>Frequency:</strong> ${escape_html(currentRecipe.frequency)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (currentRecipe.foodCost) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p><strong>Food Cost:</strong> $${escape_html(currentRecipe.foodCost)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <p><strong>Restaurant:</strong> ${escape_html(restaurants.find((r) => r.id === currentRecipe.restaurantId)?.name)}</p> <p><strong>Cookbook:</strong> ${escape_html(cookBooks.find((cb) => cb.id === currentRecipe.cookBookId)?.name)}</p></div></div> <div class="md:col-span-1"><h3 class="mb-4 text-xl font-semibold text-gray-800 svelte-7w8uam">Ingredients</h3> <ul class="space-y-2"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let ingredient = each_array[index];
    $$payload.out += `<li class="flex items-center justify-between p-3 bg-white rounded-md shadow svelte-7w8uam"><span><span class="font-medium">${escape_html(ingredientsList.find((ing) => ing.id === ingredient.ingredientId)?.name)}</span> <br> `;
    if (isScaling) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<input type="text"${attr("value", ingredient.quantity)} class="w-24 px-2 py-1 text-sm text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 svelte-7w8uam">`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-sm text-gray-600">${escape_html(ingredient.quantity.toFixed(2))}</span>`;
    }
    $$payload.out += `<!--]--> <span class="text-sm text-gray-600">${escape_html(ingredient.unit)}</span></span> <button class="p-1 text-indigo-600 rounded-full hover:bg-indigo-100 print:hidden svelte-7w8uam" title="Convert unit">`;
    Refresh_cw($$payload, { class: "w-5 h-5" });
    $$payload.out += `<!----></button> <button class="p-1 text-purple-600 rounded-full hover:bg-purple-100" title="Standardize ingredient">Standardize</button></li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div class="md:col-span-1"><h3 class="mb-4 text-xl font-semibold text-gray-800 svelte-7w8uam">Instructions</h3> <ol class="space-y-4 list-decimal list-inside"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let instruction = each_array_1[$$index_1];
    $$payload.out += `<li class="relative p-4 bg-white rounded-md shadow-md transition-all duration-300 hover:shadow-lg group svelte-7w8uam"><span class="ml-2 cursor-pointer">${escape_html(instruction.instruction)}</span> <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div> `;
    if (instruction.imageUrl) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      {
        $$payload.out += `<div class="absolute left-0 mt-2 w-64 h-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"><img${attr("src", instruction.imageUrl)}${attr("alt", instruction.instruction)} class="object-cover w-full h-full rounded-md shadow-lg"></div>`;
      }
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></li>`;
  }
  $$payload.out += `<!--]--></ol> `;
  if (currentRecipe.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mt-6"><h3 class="mb-2 text-xl font-semibold text-gray-800 svelte-7w8uam">Description</h3> <p class="text-gray-600">${escape_html(currentRecipe.description)}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  if (isConvertingUnits && currentIngredientIndex !== null) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(allUnits);
    $$payload.out += `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true"><div class="p-6 bg-white rounded-lg shadow-xl modal-content svelte-7w8uam"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 svelte-7w8uam">Convert Unit</h3> <div class="text-gray-400 hover:text-gray-500 focus:outline-none" aria-label="Close modal"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></div></div> <p class="mb-4">Current: ${escape_html(currentRecipe.ingredients[currentIngredientIndex].quantity.toFixed(2))}
							${escape_html(currentRecipe.ingredients[currentIngredientIndex].unit)}</p> <div class="flex mb-4 space-x-2"><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 svelte-7w8uam"><option value="">Select new unit</option><!--[-->`;
    for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
      let unit = each_array_2[index];
      $$payload.out += `<option${attr("value", unit)}>${escape_html(unit)}</option>`;
    }
    $$payload.out += `<!--]--></select> <button class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Convert</button></div> `;
    if (convertedQuantity !== null) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="mb-4">Converted: ${escape_html(convertedQuantity.toFixed(2))}
								${escape_html(newUnit)}</p> <div class="flex justify-end space-x-2"><button class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Apply</button> <button class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mt-8 print:hidden svelte-7w8uam"><button class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">`;
  Chevron_left($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Back to List</button></div></div></div></div>`;
  bind_props($$props, {
    currentRecipe,
    isScaling,
    scaleFactor,
    isConvertingUnits,
    currentIngredientIndex,
    newUnit,
    convertedQuantity
  });
  pop();
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var COMMON_MIME_TYPES = /* @__PURE__ */ new Map([
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  ["aac", "audio/aac"],
  ["abw", "application/x-abiword"],
  ["arc", "application/x-freearc"],
  ["avif", "image/avif"],
  ["avi", "video/x-msvideo"],
  ["azw", "application/vnd.amazon.ebook"],
  ["bin", "application/octet-stream"],
  ["bmp", "image/bmp"],
  ["bz", "application/x-bzip"],
  ["bz2", "application/x-bzip2"],
  ["cda", "application/x-cdf"],
  ["csh", "application/x-csh"],
  ["css", "text/css"],
  ["csv", "text/csv"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["eot", "application/vnd.ms-fontobject"],
  ["epub", "application/epub+zip"],
  ["gz", "application/gzip"],
  ["gif", "image/gif"],
  ["heic", "image/heic"],
  ["heif", "image/heif"],
  ["htm", "text/html"],
  ["html", "text/html"],
  ["ico", "image/vnd.microsoft.icon"],
  ["ics", "text/calendar"],
  ["jar", "application/java-archive"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["js", "text/javascript"],
  ["json", "application/json"],
  ["jsonld", "application/ld+json"],
  ["mid", "audio/midi"],
  ["midi", "audio/midi"],
  ["mjs", "text/javascript"],
  ["mp3", "audio/mpeg"],
  ["mp4", "video/mp4"],
  ["mpeg", "video/mpeg"],
  ["mpkg", "application/vnd.apple.installer+xml"],
  ["odp", "application/vnd.oasis.opendocument.presentation"],
  ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["oga", "audio/ogg"],
  ["ogv", "video/ogg"],
  ["ogx", "application/ogg"],
  ["opus", "audio/opus"],
  ["otf", "font/otf"],
  ["png", "image/png"],
  ["pdf", "application/pdf"],
  ["php", "application/x-httpd-php"],
  ["ppt", "application/vnd.ms-powerpoint"],
  ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  ["rar", "application/vnd.rar"],
  ["rtf", "application/rtf"],
  ["sh", "application/x-sh"],
  ["svg", "image/svg+xml"],
  ["swf", "application/x-shockwave-flash"],
  ["tar", "application/x-tar"],
  ["tif", "image/tiff"],
  ["tiff", "image/tiff"],
  ["ts", "video/mp2t"],
  ["ttf", "font/ttf"],
  ["txt", "text/plain"],
  ["vsd", "application/vnd.visio"],
  ["wav", "audio/wav"],
  ["weba", "audio/webm"],
  ["webm", "video/webm"],
  ["webp", "image/webp"],
  ["woff", "font/woff"],
  ["woff2", "font/woff2"],
  ["xhtml", "application/xhtml+xml"],
  ["xls", "application/vnd.ms-excel"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["xml", "application/xml"],
  ["xul", "application/vnd.mozilla.xul+xml"],
  ["zip", "application/zip"],
  ["7z", "application/x-7z-compressed"],
  // Others
  ["mkv", "video/x-matroska"],
  ["mov", "video/quicktime"],
  ["msg", "application/vnd.ms-outlook"]
]);
function toFileWithPath(file, path) {
  var f = withMimeType(file);
  if (typeof f.path !== "string") {
    var webkitRelativePath = file.webkitRelativePath;
    Object.defineProperty(f, "path", {
      value: typeof path === "string" ? path : typeof webkitRelativePath === "string" && webkitRelativePath.length > 0 ? webkitRelativePath : file.name,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }
  return f;
}
function withMimeType(file) {
  var name = file.name;
  var hasExtension = name && name.lastIndexOf(".") !== -1;
  if (hasExtension && !file.type) {
    var ext = name.split(".").pop().toLowerCase();
    var type = COMMON_MIME_TYPES.get(ext);
    if (type) {
      Object.defineProperty(file, "type", {
        value: type,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
  }
  return file;
}
var FILES_TO_IGNORE = [
  // Thumbnail cache files for macOS and Windows
  ".DS_Store",
  "Thumbs.db"
  // Windows
];
function fromEvent(evt) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      if (isObject(evt) && isDataTransfer(evt.dataTransfer)) {
        return [2, getDataTransferFiles(evt.dataTransfer, evt.type)];
      } else if (isChangeEvt(evt)) {
        return [2, getInputFiles(evt)];
      } else if (Array.isArray(evt) && evt.every(function(item) {
        return "getFile" in item && typeof item.getFile === "function";
      })) {
        return [2, getFsHandleFiles(evt)];
      }
      return [2, []];
    });
  });
}
function isDataTransfer(value) {
  return isObject(value);
}
function isChangeEvt(value) {
  return isObject(value) && isObject(value.target);
}
function isObject(v) {
  return typeof v === "object" && v !== null;
}
function getInputFiles(evt) {
  return fromList(evt.target.files).map(function(file) {
    return toFileWithPath(file);
  });
}
function getFsHandleFiles(handles) {
  return __awaiter(this, void 0, void 0, function() {
    var files;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, Promise.all(handles.map(function(h) {
            return h.getFile();
          }))];
        case 1:
          files = _a.sent();
          return [2, files.map(function(file) {
            return toFileWithPath(file);
          })];
      }
    });
  });
}
function getDataTransferFiles(dt, type) {
  return __awaiter(this, void 0, void 0, function() {
    var items, files;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!dt.items)
            return [3, 2];
          items = fromList(dt.items).filter(function(item) {
            return item.kind === "file";
          });
          if (type !== "drop") {
            return [2, items];
          }
          return [4, Promise.all(items.map(toFilePromises))];
        case 1:
          files = _a.sent();
          return [2, noIgnoredFiles(flatten(files))];
        case 2:
          return [2, noIgnoredFiles(fromList(dt.files).map(function(file) {
            return toFileWithPath(file);
          }))];
      }
    });
  });
}
function noIgnoredFiles(files) {
  return files.filter(function(file) {
    return FILES_TO_IGNORE.indexOf(file.name) === -1;
  });
}
function fromList(items) {
  if (items === null) {
    return [];
  }
  var files = [];
  for (var i = 0; i < items.length; i++) {
    var file = items[i];
    files.push(file);
  }
  return files;
}
function toFilePromises(item) {
  if (typeof item.webkitGetAsEntry !== "function") {
    return fromDataTransferItem(item);
  }
  var entry = item.webkitGetAsEntry();
  if (entry && entry.isDirectory) {
    return fromDirEntry(entry);
  }
  return fromDataTransferItem(item);
}
function flatten(items) {
  return items.reduce(function(acc, files) {
    return __spreadArray(__spreadArray([], __read(acc), false), __read(Array.isArray(files) ? flatten(files) : [files]), false);
  }, []);
}
function fromDataTransferItem(item) {
  var file = item.getAsFile();
  if (!file) {
    return Promise.reject("".concat(item, " is not a File"));
  }
  var fwp = toFileWithPath(file);
  return Promise.resolve(fwp);
}
function fromEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
    });
  });
}
function fromDirEntry(entry) {
  var reader = entry.createReader();
  return new Promise(function(resolve, reject) {
    var entries = [];
    function readEntries() {
      var _this = this;
      reader.readEntries(function(batch) {
        return __awaiter(_this, void 0, void 0, function() {
          var files, err_1, items;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!!batch.length)
                  return [3, 5];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Promise.all(entries)];
              case 2:
                files = _a.sent();
                resolve(files);
                return [3, 4];
              case 3:
                err_1 = _a.sent();
                reject(err_1);
                return [3, 4];
              case 4:
                return [3, 6];
              case 5:
                items = Promise.all(batch.map(fromEntry));
                entries.push(items);
                readEntries();
                _a.label = 6;
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, function(err) {
        reject(err);
      });
    }
    readEntries();
  });
}
function fromFileEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, new Promise(function(resolve, reject) {
        entry.file(function(file) {
          var fwp = toFileWithPath(file, entry.fullPath);
          resolve(fwp);
        }, function(err) {
          reject(err);
        });
      })];
    });
  });
}
function Dropzone($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "accept",
    "disabled",
    "getFilesFromEvent",
    "maxSize",
    "minSize",
    "multiple",
    "preventDropOnDocument",
    "noClick",
    "noKeyboard",
    "noDrag",
    "noDragEventsBubbling",
    "containerClasses",
    "containerStyles",
    "disableDefaultStyles",
    "name",
    "inputElement",
    "required"
  ]);
  push();
  let defaultPlaceholderString;
  let accept = fallback($$props["accept"], void 0);
  let disabled = fallback($$props["disabled"], false);
  let getFilesFromEvent = fallback($$props["getFilesFromEvent"], fromEvent);
  let maxSize = fallback($$props["maxSize"], Infinity);
  let minSize = fallback($$props["minSize"], 0);
  let multiple = fallback($$props["multiple"], true);
  let preventDropOnDocument = fallback($$props["preventDropOnDocument"], true);
  let noClick = fallback($$props["noClick"], false);
  let noKeyboard = fallback($$props["noKeyboard"], false);
  let noDrag = fallback($$props["noDrag"], false);
  let noDragEventsBubbling = fallback($$props["noDragEventsBubbling"], false);
  let containerClasses = fallback($$props["containerClasses"], "");
  let containerStyles = fallback($$props["containerStyles"], "");
  let disableDefaultStyles = fallback($$props["disableDefaultStyles"], false);
  let name = fallback($$props["name"], "");
  let inputElement = fallback($$props["inputElement"], void 0);
  let required = fallback($$props["required"], false);
  onDestroy(() => {
    inputElement = null;
  });
  defaultPlaceholderString = multiple ? "Drag 'n' drop some files here, or click to select files" : "Drag 'n' drop a file here, or click to select a file";
  $$payload.out += `<div${spread_attributes(
    {
      tabindex: "0",
      role: "button",
      class: `${stringify(disableDefaultStyles ? "" : "dropzone")} ${stringify(containerClasses)}`,
      style: containerStyles,
      ...$$restProps
    },
    { "svelte-817dg2": true }
  )}><input${attr("accept", accept?.toString())}${attr("multiple", multiple, true)}${attr("required", required, true)} type="file"${attr("name", name)} autocomplete="off" tabindex="-1" style="display: none;"> <!---->`;
  slot($$payload, $$props, "default", {}, () => {
    $$payload.out += `<p>${escape_html(defaultPlaceholderString)}</p>`;
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    accept,
    disabled,
    getFilesFromEvent,
    maxSize,
    minSize,
    multiple,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    containerClasses,
    containerStyles,
    disableDefaultStyles,
    name,
    inputElement,
    required
  });
  pop();
}
function RecipeForm($$payload, $$props) {
  push();
  let {
    currentView,
    currentRecipe = void 0,
    restaurants,
    cookBooks,
    ingredientsList,
    goBack,
    handleSubmit
  } = $$props;
  let errors = [];
  currentRecipe?.prepTime + currentRecipe?.cookTime || 0;
  let ingredientTotalCost = calculateTotalCost();
  let costPerServing = currentRecipe?.servings ? ingredientTotalCost / currentRecipe.servings : 0;
  function calculateTotalCost() {
    if (!currentRecipe?.ingredients)
      return 0;
    return currentRecipe.ingredients.reduce(
      (total, ingredient) => {
        const selectedIngredient = ingredientsList.find((ing) => ing.id === ingredient.ingredientId);
        return total + (selectedIngredient?.price || 0) * ingredient.quantity;
      },
      0
    );
  }
  $$payload.out += `<div class="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-semibold text-gray-800">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(currentView === "create" ? "Create New Recipe" : "Edit Recipe")}`;
  }
  $$payload.out += `<!--]--></h2> <button class="inline-flex items-center px-3 py-2 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300">`;
  Chevron_left($$payload, { class: "w-4 h-4 mr-1" });
  $$payload.out += `<!----> ${escape_html("Back")}</button></div> `;
  if (errors.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(errors);
    $$payload.out += `<div class="p-4 mb-6 bg-red-50 rounded-md"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-sm text-red-600">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form class="space-y-6">`;
  {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(restaurants);
    const each_array_2 = ensure_array_like(cookBooks);
    const each_array_3 = ensure_array_like(currentRecipe.ingredients);
    const each_array_5 = ensure_array_like(currentRecipe.instructions);
    $$payload.out += `<div class="space-y-6"><div class="grid gap-6 p-6 bg-gray-50 rounded-lg md:grid-cols-2"><div class="space-y-4"><div><label for="name" class="block text-sm font-medium text-gray-700">Recipe Name <span class="text-red-500">*</span></label> <input type="text" id="name"${attr("value", currentRecipe.name)} class="w-full mt-1 border-gray-300 rounded-md" placeholder="Enter recipe name"></div> <div><label for="servings" class="block text-sm font-medium text-gray-700">Servings <span class="text-red-500">*</span></label> <input type="number" id="servings"${attr("value", currentRecipe.servings)} min="1" class="w-full mt-1 border-gray-300 rounded-md"></div> <div><label for="description" class="block text-sm font-medium text-gray-700">Description</label> <textarea id="description" rows="3" class="w-full mt-1 border-gray-300 rounded-md" placeholder="Describe your recipe">`;
    const $$body = escape_html(currentRecipe.description);
    if ($$body) {
      $$payload.out += `${$$body}`;
    }
    $$payload.out += `</textarea></div></div> <div class="space-y-4"><label class="block text-sm font-medium text-gray-700">Recipe Image</label> `;
    Dropzone($$payload, {
      class: "h-40 border-2 border-dashed border-gray-300 rounded-md"
    });
    $$payload.out += `<!----> <div class="grid grid-cols-2 gap-4"><div><label for="restaurantId" class="block text-sm font-medium text-gray-700">Restaurant</label> <select id="restaurantId" class="w-full mt-1 border-gray-300 rounded-md"><option value="">Select restaurant</option><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let restaurant = each_array_1[$$index_1];
      $$payload.out += `<option${attr("value", restaurant.id)}>${escape_html(restaurant.name)}</option>`;
    }
    $$payload.out += `<!--]--></select></div> <div><label for="cookBookId" class="block text-sm font-medium text-gray-700">Cookbook</label> <select id="cookBookId" class="w-full mt-1 border-gray-300 rounded-md"><option value="">Select cookbook</option><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let cookbook = each_array_2[$$index_2];
      $$payload.out += `<option${attr("value", cookbook.id)}>${escape_html(cookbook.name)}</option>`;
    }
    $$payload.out += `<!--]--></select></div></div></div></div> <div class="p-6 bg-gray-50 rounded-lg"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-700">Ingredients <span class="text-red-500">*</span></h3> <button type="button" class="inline-flex items-center px-3 py-2 text-sm text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200">`;
    Plus($$payload, { class: "w-4 h-4 mr-1" });
    $$payload.out += `<!----> Add Ingredient</button></div> <div class="space-y-3"><!--[-->`;
    for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
      let ingredient = each_array_3[index];
      const each_array_4 = ensure_array_like(ingredientsList);
      $$payload.out += `<div class="flex items-center gap-4 p-3 bg-white rounded-md"><div class="flex-1"><select class="w-full border-gray-300 rounded-md"><option value="">Select ingredient</option><!--[-->`;
      for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
        let ing = each_array_4[$$index_3];
        $$payload.out += `<option${attr("value", ing.id)}>${escape_html(ing.name)}</option>`;
      }
      $$payload.out += `<!--]--></select></div> <input type="number"${attr("value", ingredient.quantity)} min="0" step="0.01" class="w-24 border-gray-300 rounded-md" placeholder="Qty"> <input type="text"${attr("value", ingredient.unit)} class="w-24 border-gray-300 rounded-md" placeholder="Unit"> `;
      if (ingredient.ingredientId) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-sm font-medium text-gray-900">${escape_html(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((ingredientsList.find((ing) => ing.id === ingredient.ingredientId)?.price || 0) * ingredient.quantity))}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <button type="button" class="p-1 text-red-600 hover:text-red-800">`;
      Trash_2($$payload, { class: "w-4 h-4" });
      $$payload.out += `<!----></button></div>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (currentRecipe.ingredients?.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="mt-4 text-sm text-gray-600">Total Cost: ${escape_html(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(ingredientTotalCost))}
							| Per Serving: ${escape_html(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(costPerServing))}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="p-6 bg-gray-50 rounded-lg"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-700">Instructions <span class="text-red-500">*</span></h3> <button type="button" class="inline-flex items-center px-3 py-2 text-sm text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200">`;
    Plus($$payload, { class: "w-4 h-4 mr-1" });
    $$payload.out += `<!----> Add Step</button></div> <div class="space-y-3"><!--[-->`;
    for (let index = 0, $$length = each_array_5.length; index < $$length; index++) {
      let instruction = each_array_5[index];
      $$payload.out += `<div class="flex items-start gap-4 p-3 bg-white rounded-md"><div class="flex items-center justify-center w-8 h-8 text-white bg-indigo-600 rounded-full shrink-0">${escape_html(index + 1)}</div> <div class="flex-1"><textarea rows="2" class="w-full border-gray-300 rounded-md" placeholder="Describe this step...">`;
      const $$body_1 = escape_html(instruction.instruction);
      if ($$body_1) {
        $$payload.out += `${$$body_1}`;
      }
      $$payload.out += `</textarea></div> <button type="button" class="p-1 mt-2 text-red-600 hover:text-red-800">`;
      Trash_2($$payload, { class: "w-4 h-4" });
      $$payload.out += `<!----></button></div>`;
    }
    $$payload.out += `<!--]--></div></div></div>`;
  }
  $$payload.out += `<!--]--> <div class="flex justify-end pt-6 mt-8 border-t">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button type="button" class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Review Recipe `;
    Chevron_left($$payload, { class: "w-4 h-4 ml-2 rotate-180" });
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]--></div></form></div>`;
  bind_props($$props, { currentRecipe });
  pop();
}
function RecipeHeader($$payload, $$props) {
  let { addRecipe, searchTerm = void 0 } = $$props;
  $$payload.out += `<div class="flex flex-col items-center justify-between mb-6 md:flex-row"><h1 class="mb-4 text-3xl font-bold text-gray-800 md:mb-0">Recipes</h1> <button class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">`;
  Plus($$payload, { class: "w-5 h-5 mr-2" });
  $$payload.out += `<!----> Add Recipe</button></div> <div class="mb-6"><div class="relative">`;
  Search($$payload, {
    class: "absolute w-5 h-5 text-gray-400 top-3 left-3"
  });
  $$payload.out += `<!----> <input type="text"${attr("value", searchTerm)} placeholder="Search by name or description..." class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></div></div>`;
  bind_props($$props, { searchTerm });
}
function createRecipeStore() {
  const { subscribe, set, update } = writable({
    recipes: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 10
  });
  let currentQuery = {};
  return {
    subscribe,
    fetchRecipes: async (query) => {
      currentQuery = query;
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await api.recipe.getRecipes({ query });
        if (response.status !== 200)
          throw new Error(`Failed to fetch recipes: ${response.status}`);
        const { recipes, totalCount } = response.body;
        update((state) => ({
          ...state,
          recipes,
          loading: false,
          totalCount,
          currentPage: Math.floor((query.skip ?? 0) / state.itemsPerPage) + 1
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
        console.error(error);
      }
    },
    setPage: (page) => {
      update((state) => ({ ...state, currentPage: page }));
    },
    setItemsPerPage: (items) => {
      update((state) => ({ ...state, itemsPerPage: items }));
    },
    deleteRecipe: async (id) => {
      update((state) => ({ ...state, loading: true, error: null }));
      if (confirm("Are you sure you want to delete this recipe?")) {
        try {
          await api.recipe.deleteRecipe({ params: { id } });
        } catch (error) {
          update((state) => ({ ...state, error: error.message, loading: false }));
          console.error(error);
        } finally {
          const response = await api.recipe.getRecipes(currentQuery);
          if (response.status !== 200)
            throw new Error(`Failed to fetch recipes: ${response.status}`);
          const { recipes, totalCount } = response.body;
          update((state) => ({
            ...state,
            recipes,
            loading: false,
            totalCount,
            currentPage: Math.floor((currentQuery.skip ?? 0) / state.itemsPerPage) + 1
          }));
        }
      }
    },
    createRecipe: async (data) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await api.recipe.createRecipe({ body: data });
        if (response.status !== 200)
          throw new Error(`Failed to create recipes: ${response.status}`);
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
        console.error(error);
      } finally {
        console.log(`currentQuery is ${currentQuery}`);
      }
    }
  };
}
const recipeStore = createRecipeStore();
function RecipeTable($$payload, $$props) {
  push();
  let { recipes, viewRecipe, editRecipe } = $$props;
  const each_array = ensure_array_like(recipes);
  $$payload.out += `<div class="overflow-x-auto"><table class="min-w-full bg-white border border-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th><th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Image</th><th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Prep Time</th><th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Cook Time</th><th class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Actions</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let recipe = each_array[$$index];
    $$payload.out += `<tr><td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">${escape_html(recipe.name)}</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">`;
    if (recipe.imageUrl && recipe.imageUrl.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", recipe.imageUrl[0])}${attr("alt", recipe.name)} class="object-cover w-10 h-10 rounded">`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(recipe.prepTime)} mins</td><td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${escape_html(recipe.cookTime)} mins</td><td class="px-6 py-4 text-sm text-center whitespace-nowrap"><button class="mr-2 text-indigo-600 hover:text-indigo-900" aria-label="View Recipe">`;
    Square_pen($$payload, { class: "inline-block w-4 h-4" });
    $$payload.out += `<!----> <span class="sr-only">View</span></button> <button class="mr-2 text-yellow-600 hover:text-yellow-900" aria-label="Edit Recipe">`;
    Square_pen($$payload, { class: "inline-block w-4 h-4" });
    $$payload.out += `<!----> <span class="sr-only">Edit</span></button> <button class="text-red-600 hover:text-red-900" aria-label="Delete Recipe">`;
    Trash_2($$payload, { class: "inline-block w-4 h-4" });
    $$payload.out += `<!----> <span class="sr-only">Delete</span></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  pop();
}
function Pagination($$payload, $$props) {
  push();
  let { currentPage = 1, totalPages = 1 } = $$props;
  const each_array = ensure_array_like(Array(totalPages));
  $$payload.out += `<div class="flex items-center justify-between mt-4"><button${attr("disabled", currentPage === 1, true)} class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`;
  Chevron_right($$payload, {
    class: "inline-block w-4 h-4 mr-1 transform rotate-180"
  });
  $$payload.out += `<!----> Previous</button> <div class="flex items-center space-x-2"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    each_array[index];
    $$payload.out += `<button${attr("class", `px-3 py-1 text-sm font-medium rounded-md focus:outline-none ${currentPage === index + 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`)}>${escape_html(index + 1)}</button>`;
  }
  $$payload.out += `<!--]--></div> <button${attr("disabled", currentPage === totalPages, true)} class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Next `;
  Chevron_right($$payload, { class: "inline-block w-4 h-4 ml-1" });
  $$payload.out += `<!----></button></div>`;
  pop();
}
const conversions = [
  // Volume conversions
  { fromUnit: "gallon", toUnit: "quart", factor: 4 },
  { fromUnit: "quart", toUnit: "pint", factor: 2 },
  { fromUnit: "pint", toUnit: "cup", factor: 2 },
  { fromUnit: "cup", toUnit: "fluidOunce", factor: 8 },
  { fromUnit: "fluidOunce", toUnit: "tablespoon", factor: 2 },
  { fromUnit: "tablespoon", toUnit: "teaspoon", factor: 3 },
  { fromUnit: "liter", toUnit: "milliliter", factor: 1e3 },
  { fromUnit: "fluidOunce", toUnit: "milliliter", factor: 29.5735 },
  { fromUnit: "cup", toUnit: "milliliter", factor: 236.588 },
  { fromUnit: "cup", toUnit: "liter", factor: 0.236588 },
  { fromUnit: "teaspoon", toUnit: "milliliter", factor: 4.92892 },
  { fromUnit: "tablespoon", toUnit: "milliliter", factor: 14.7868 },
  { fromUnit: "gallon", toUnit: "fluidOunce", factor: 128 },
  { fromUnit: "quart", toUnit: "fluidOunce", factor: 32 },
  { fromUnit: "pint", toUnit: "fluidOunce", factor: 16 },
  { fromUnit: "cup", toUnit: "tablespoon", factor: 16 },
  { fromUnit: "fluidOunce", toUnit: "cup", factor: 0.125 },
  // Weight conversions
  { fromUnit: "kilogram", toUnit: "gram", factor: 1e3 },
  { fromUnit: "gram", toUnit: "milligram", factor: 1e3 },
  { fromUnit: "milligram", toUnit: "gram", factor: 1e-3 },
  { fromUnit: "pound", toUnit: "ounce", factor: 16 },
  { fromUnit: "pound", toUnit: "gram", factor: 453.592 },
  { fromUnit: "pound", toUnit: "kilogram", factor: 0.453592 },
  { fromUnit: "pound", toUnit: "milligram", factor: 453592 },
  { fromUnit: "ounce", toUnit: "gram", factor: 28.3495 },
  { fromUnit: "ounce", toUnit: "milligram", factor: 28349.5 },
  { fromUnit: "gram", toUnit: "ounce", factor: 0.035274 },
  { fromUnit: "kilogram", toUnit: "pound", factor: 2.20462 },
  // Ingredient-specific conversions to weight
  // All-Purpose Flour
  { fromUnit: "cupFlour", toUnit: "gram", factor: 125 },
  { fromUnit: "tablespoonFlour", toUnit: "gram", factor: 7.8125 },
  // Granulated Sugar
  { fromUnit: "cupSugar", toUnit: "gram", factor: 200 },
  { fromUnit: "tablespoonSugar", toUnit: "gram", factor: 12.5 },
  // Brown Sugar (packed)
  { fromUnit: "cupBrownSugar", toUnit: "gram", factor: 220 },
  { fromUnit: "tablespoonBrownSugar", toUnit: "gram", factor: 13.75 },
  // Powdered Sugar (Confectioners' Sugar)
  { fromUnit: "cupPowderedSugar", toUnit: "gram", factor: 120 },
  { fromUnit: "tablespoonPowderedSugar", toUnit: "gram", factor: 7.5 },
  // Butter
  { fromUnit: "cupButter", toUnit: "gram", factor: 227 },
  { fromUnit: "tablespoonButter", toUnit: "gram", factor: 14.1875 },
  // Honey
  { fromUnit: "cupHoney", toUnit: "gram", factor: 340 },
  { fromUnit: "tablespoonHoney", toUnit: "gram", factor: 21.25 },
  // Milk
  { fromUnit: "cupMilk", toUnit: "gram", factor: 244 },
  { fromUnit: "tablespoonMilk", toUnit: "gram", factor: 15.25 },
  // Water
  { fromUnit: "cupWater", toUnit: "gram", factor: 240 },
  { fromUnit: "tablespoonWater", toUnit: "gram", factor: 15 },
  // Vegetable Oil
  { fromUnit: "cupOil", toUnit: "gram", factor: 218 },
  { fromUnit: "tablespoonOil", toUnit: "gram", factor: 13.625 },
  // Salt
  { fromUnit: "teaspoonSalt", toUnit: "gram", factor: 6 },
  { fromUnit: "tablespoonSalt", toUnit: "gram", factor: 18 },
  // Baking Powder
  { fromUnit: "teaspoonBakingPowder", toUnit: "gram", factor: 4 },
  // Baking Soda
  { fromUnit: "teaspoonBakingSoda", toUnit: "gram", factor: 4.6 },
  // Cocoa Powder
  { fromUnit: "cupCocoaPowder", toUnit: "gram", factor: 85 },
  { fromUnit: "tablespoonCocoaPowder", toUnit: "gram", factor: 5.3125 },
  // Rolled Oats
  { fromUnit: "cupOats", toUnit: "gram", factor: 90 },
  // Rice (uncooked)
  { fromUnit: "cupRice", toUnit: "gram", factor: 190 },
  // Almonds (sliced)
  { fromUnit: "cupAlmonds", toUnit: "gram", factor: 92 },
  // Peanut Butter
  { fromUnit: "cupPeanutButter", toUnit: "gram", factor: 270 },
  { fromUnit: "tablespoonPeanutButter", toUnit: "gram", factor: 16.875 },
  // Yogurt
  { fromUnit: "cupYogurt", toUnit: "gram", factor: 245 },
  // Cream Cheese
  { fromUnit: "cupCreamCheese", toUnit: "gram", factor: 225 },
  // Corn Syrup
  { fromUnit: "cupCornSyrup", toUnit: "gram", factor: 328 },
  // Maple Syrup
  { fromUnit: "cupMapleSyrup", toUnit: "gram", factor: 322 },
  // Margarine
  { fromUnit: "cupMargarine", toUnit: "gram", factor: 230 },
  // Heavy Cream
  { fromUnit: "cupHeavyCream", toUnit: "gram", factor: 238 },
  // Sour Cream
  { fromUnit: "cupSourCream", toUnit: "gram", factor: 230 },
  // Egg
  { fromUnit: "egg", toUnit: "gram", factor: 50 },
  // Average weight of a large egg
  // Stick of Butter
  { fromUnit: "stickButter", toUnit: "gram", factor: 113.4 },
  { fromUnit: "stickButter", toUnit: "cup", factor: 0.5 },
  // Less common but useful conversions
  { fromUnit: "gallon", toUnit: "liter", factor: 3.78541 },
  { fromUnit: "quart", toUnit: "liter", factor: 0.946353 },
  { fromUnit: "pint", toUnit: "milliliter", factor: 473.176 },
  { fromUnit: "liter", toUnit: "quart", factor: 1.05669 },
  { fromUnit: "milliliter", toUnit: "fluidOunce", factor: 0.033814 },
  // Metric to Imperial conversions
  { fromUnit: "liter", toUnit: "deciliter", factor: 10 },
  { fromUnit: "liter", toUnit: "centiliter", factor: 100 },
  { fromUnit: "liter", toUnit: "milliliter", factor: 1e3 },
  // International units (Imperial measurements)
  { fromUnit: "imperialPint", toUnit: "milliliter", factor: 568.261 },
  { fromUnit: "imperialGallon", toUnit: "liter", factor: 4.54609 }
];
function buildConversion(conversions2, customConversions) {
  const graph = /* @__PURE__ */ new Map();
  conversions2.forEach(({ fromUnit, toUnit, factor }) => {
    if (!graph.has(fromUnit))
      graph.set(fromUnit, /* @__PURE__ */ new Map());
    if (!graph.has(toUnit))
      graph.set(toUnit, /* @__PURE__ */ new Map());
    graph.get(fromUnit).set(toUnit, factor);
    graph.get(toUnit).set(fromUnit, 1 / factor);
  });
  if (customConversions) {
    customConversions.forEach(({ fromUnit, toUnit, factor }) => {
      graph.get(fromUnit)?.delete(toUnit);
      graph.get(toUnit)?.delete(fromUnit);
      if (!graph.has(fromUnit))
        graph.set(fromUnit, /* @__PURE__ */ new Map());
      if (!graph.has(toUnit))
        graph.set(toUnit, /* @__PURE__ */ new Map());
      graph.get(fromUnit).set(toUnit, factor);
      graph.get(toUnit).set(fromUnit, 1 / factor);
    });
  }
  return graph;
}
function findConversionFactor(graph, startUnit, endUnit, customConversions) {
  if (startUnit === endUnit)
    return 1;
  const queue = [
    { unit: startUnit, factor: 1, cost: 0 }
  ];
  const visited = /* @__PURE__ */ new Map();
  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const { unit, factor, cost } = queue.shift();
    if (visited.has(unit) && visited.get(unit) <= cost)
      continue;
    visited.set(unit, cost);
    if (unit === endUnit)
      return factor;
    const neighbors = graph.get(unit);
    if (neighbors) {
      for (const [neighborUnit, neighborFactor] of neighbors.entries()) {
        const edgeIsCustom = customConversions?.some(
          (conv) => conv.fromUnit === unit && conv.toUnit === neighborUnit || conv.fromUnit === neighborUnit && conv.toUnit === unit
        ) ?? false;
        const edgeCost = edgeIsCustom ? 1 : 2;
        queue.push({
          unit: neighborUnit,
          factor: factor * neighborFactor,
          cost: cost + edgeCost
        });
      }
    }
  }
  return null;
}
function isVolumeUnit(unit) {
  const volumeUnits = /* @__PURE__ */ new Set([
    "gallon",
    "quart",
    "pint",
    "cup",
    "fluidOunce",
    "tablespoon",
    "teaspoon",
    "milliliter",
    "liter",
    "cubicMeter",
    "cubicFoot",
    "cubicInch"
    // Include ingredient-specific volume units if necessary
  ]);
  return volumeUnits.has(unit);
}
function isWeightUnit(unit) {
  const weightUnits = /* @__PURE__ */ new Set([
    "ton",
    "kilogram",
    "gram",
    "milligram",
    "metricTon",
    "pound",
    "ounce",
    "stone"
    // Include ingredient-specific weight units if necessary
  ]);
  return weightUnits.has(unit);
}
function convertUnitsHelper(value, fromUnit, toUnit, density, customConversions) {
  const graph = buildConversion(conversions, customConversions);
  const factor = findConversionFactor(
    graph,
    fromUnit,
    toUnit,
    customConversions
  );
  if (factor !== null) {
    return value * factor;
  }
  isVolumeUnit(fromUnit);
  isVolumeUnit(toUnit);
  throw new Error("Conversion not possible without density");
}
try {
  const customConversions = [
    { fromUnit: "cupFlour", toUnit: "ounce", factor: 4.6 }
  ];
  const pounds = convertUnitsHelper(
    0.75,
    // value
    "cupFlour",
    // fromUnit
    "pound",
    // toUnit
    void 0,
    // density (not needed here)
    customConversions
    // customConversions
  );
  console.log(
    `0.75 cup of flour is approximately ${pounds.toFixed(6)} pounds`
  );
} catch (error) {
  console.error("Conversion error:", error.message);
}
function RecipeList($$payload, $$props) {
  push();
  let recipes = [];
  let searchTerm = "";
  let currentView = "list";
  let currentRecipe = null;
  let errors = [];
  let restaurants = [];
  let cookBooks = [];
  let ingredientsList = [];
  let currentStep = 1;
  const totalSteps = 4;
  let totalCount = 0;
  let currentPage = 1;
  let itemsPerPage = 10;
  let isStandardizing = false;
  let standardizingIngredientIndex = null;
  const allUnits = [
    .../* @__PURE__ */ new Set([
      ...conversions.map((conv) => conv.fromUnit),
      ...conversions.map((conv) => conv.toUnit)
    ])
  ].sort();
  function startStandardization(index) {
    standardizingIngredientIndex = index;
    isStandardizing = true;
  }
  let isConvertingUnits = false;
  let currentIngredientIndex = null;
  let newUnit = "";
  let convertedQuantity = null;
  let isScaling = false;
  let scaleFactor = 1;
  function fetchRecipes() {
    const skip = (currentPage - 1) * itemsPerPage;
    recipeStore.fetchRecipes({ skip, take: itemsPerPage, searchTerm });
  }
  function addRecipe() {
    currentRecipe = {
      name: "",
      imageUrl: "",
      description: "",
      servings: 0,
      cookTime: 0,
      prepTime: 0,
      frequency: null,
      foodCost: null,
      restaurantId: 0,
      cookBookId: 0,
      ingredients: [],
      instructions: []
    };
    currentView = "create";
    errors = [];
  }
  function editRecipe(recipe) {
    if (!recipe)
      return;
    currentRecipe = {
      id: recipe.id,
      name: recipe.name,
      imageUrl: recipe.imageUrl && recipe.imageUrl.length > 0 ? recipe.imageUrl[0] : "",
      description: recipe.description,
      servings: recipe.servings,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      frequency: recipe.frequency,
      foodCost: recipe.foodCost,
      restaurantId: recipe.restaurantId,
      cookBookId: recipe.cookBookId,
      ingredients: recipe.ingredients.map((ingredient) => ({
        id: ingredient.id,
        // RecipeIngredient ID
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredientId: ingredient.ingredientId
      })),
      instructions: recipe.instructions.map((instruction) => ({
        id: instruction.id,
        // RecipeInstruction ID
        stepNumber: instruction.stepNumber,
        instruction: instruction.instruction,
        imageUrl: instruction.imageUrl
      }))
    };
    currentView = "edit";
    errors = [];
  }
  function viewRecipe(recipe) {
    currentRecipe = {
      id: recipe.id,
      name: recipe.name,
      imageUrl: recipe.imageUrl && recipe.imageUrl.length > 0 ? recipe.imageUrl[0] : "",
      description: recipe.description,
      servings: recipe.servings,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      frequency: recipe.frequency,
      foodCost: recipe.foodCost,
      restaurantId: recipe.restaurantId,
      cookBookId: recipe.cookBookId,
      ingredients: recipe.ingredients.map((ingredient) => ({
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredientId: ingredient.ingredientId
      })),
      instructions: recipe.instructions.map((instruction) => ({
        stepNumber: instruction.stepNumber,
        instruction: instruction.instruction,
        imageUrl: instruction.imageUrl,
        id: instruction.id
      }))
    };
    currentView = "view";
    errors = [];
  }
  async function handleSubmit() {
    try {
      if (!currentRecipe || currentRecipe.ingredients.length === 0 || currentRecipe.instructions.length === 0) {
        throw new Error(`Recipe must have at least one ingredient and one instruction`);
      }
      let data;
      if (currentView === "create") {
        data = {
          name: currentRecipe.name,
          imageUrl: currentRecipe.imageUrl ? [currentRecipe.imageUrl] : [],
          description: currentRecipe.description,
          servings: currentRecipe.servings,
          cookTime: currentRecipe.cookTime,
          prepTime: currentRecipe.prepTime,
          frequency: currentRecipe.frequency,
          foodCost: currentRecipe.foodCost,
          restaurant: { connect: { id: currentRecipe.restaurantId } },
          cookBook: { connect: { id: currentRecipe.cookBookId } },
          ingredients: {
            create: currentRecipe.ingredients.map((ingredient) => ({
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              ingredient: { connect: { id: ingredient.ingredientId } }
            }))
          },
          instructions: {
            create: currentRecipe.instructions.map((instruction) => ({
              stepNumber: instruction.stepNumber,
              instruction: instruction.instruction,
              imageUrl: instruction.imageUrl
            }))
          }
        };
        recipeStore.createRecipe(data);
      } else if (currentView === "edit") {
        const originalRecipe = recipes.find((r) => r.id === currentRecipe.id);
        if (!originalRecipe)
          throw new Error("Original recipe not found");
        const deleteIngredientIds = originalRecipe.ingredients.filter((origIng) => !currentRecipe.ingredients.some((currIng) => currIng.id === origIng.id)).map((ing) => ing.id);
        const deleteInstructionIds = originalRecipe.instructions.filter((origInst) => !currentRecipe.instructions.some((currInst) => currInst.id === origInst.id)).map((inst) => inst.id);
        const deleteIds = {
          ingredientIds: deleteIngredientIds,
          instructionIds: deleteInstructionIds
        };
        data = {
          name: currentRecipe.name,
          imageUrl: currentRecipe.imageUrl ? [currentRecipe.imageUrl] : [],
          description: currentRecipe.description,
          servings: currentRecipe.servings,
          cookTime: currentRecipe.cookTime,
          prepTime: currentRecipe.prepTime,
          frequency: currentRecipe.frequency,
          foodCost: currentRecipe.foodCost,
          restaurant: { connect: { id: currentRecipe.restaurantId } },
          cookBook: { connect: { id: currentRecipe.cookBookId } },
          ingredients: {
            update: currentRecipe.ingredients.filter((ingredient) => ingredient.id).map((ingredient) => ({
              where: { id: ingredient.id },
              data: {
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                ingredient: { connect: { id: ingredient.ingredientId } }
              }
            })),
            create: currentRecipe.ingredients.filter((ingredient) => !ingredient.id).map((ingredient) => ({
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              ingredient: { connect: { id: ingredient.ingredientId } }
            }))
          },
          instructions: {
            update: currentRecipe.instructions.filter((instruction) => instruction.id).map((instruction) => ({
              where: { id: instruction.id },
              data: {
                stepNumber: instruction.stepNumber,
                instruction: instruction.instruction,
                imageUrl: instruction.imageUrl
              }
            })),
            create: currentRecipe.instructions.filter((instruction) => !instruction.id).map((instruction) => ({
              stepNumber: instruction.stepNumber,
              instruction: instruction.instruction,
              imageUrl: instruction.imageUrl
            }))
          }
        };
        if (!currentRecipe.id) {
          throw new Error("Recipe ID not found");
        }
        await api.recipe.updateRecipe({
          params: { id: +currentRecipe.id },
          body: { data, deleteIds }
        });
      }
      fetchRecipes();
      currentView = "list";
      currentRecipe = null;
      errors = [];
    } catch (error) {
      console.error("Failed to save recipe:", error);
      errors = [error.message || "Failed to save recipe"];
    }
  }
  function addIngredient() {
    if (!currentRecipe)
      return;
    currentRecipe.ingredients = [
      ...currentRecipe.ingredients,
      { ingredientId: 0, quantity: 0, unit: "" }
    ];
  }
  function removeIngredient(index) {
    if (!currentRecipe)
      return;
    currentRecipe.ingredients = currentRecipe.ingredients.filter((_, i) => i !== index);
  }
  function addInstruction() {
    if (!currentRecipe)
      return;
    currentRecipe.instructions = [
      ...currentRecipe.instructions,
      {
        stepNumber: currentRecipe.instructions.length + 1,
        instruction: "",
        id: 0
      }
    ];
  }
  function removeInstruction(index) {
    if (!currentRecipe)
      return;
    currentRecipe.instructions = currentRecipe.instructions.filter((_, i) => i !== index);
    currentRecipe.instructions = currentRecipe.instructions.map((instr, idx) => ({ ...instr, stepNumber: idx + 1 }));
  }
  function goBack() {
    currentView = "list";
    currentRecipe = null;
    errors = [];
  }
  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep += 1;
      if (currentStep === 4) {
        calculateIngredientTotalCost();
      }
    }
  }
  function prevStep() {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  }
  function calculateIngredientTotalCost() {
    if (!currentRecipe)
      return;
    ingredientTotalCost = currentRecipe.ingredients.reduce(
      (total, ingredient) => {
        const ing = ingredientsList.find((ing2) => ing2.id === ingredient.ingredientId);
        if (ing && ing.price) {
          return total + ing.price * ingredient.quantity;
        }
        return total;
      },
      0
    );
    currentRecipe.foodCost = ingredientTotalCost;
  }
  let totalPages = Math.ceil(totalCount / itemsPerPage);
  run(() => {
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }
  });
  run(() => {
    if (searchTerm !== "") {
      currentPage = 1;
      fetchRecipes();
    }
  });
  function openUnitConversion(index) {
    currentIngredientIndex = index;
    isConvertingUnits = true;
    newUnit = "";
    convertedQuantity = null;
  }
  function closeUnitConversion() {
    isConvertingUnits = false;
    currentIngredientIndex = null;
    newUnit = "";
    convertedQuantity = null;
  }
  function convertUnit() {
    if (currentIngredientIndex === null || !currentRecipe)
      return;
    const ingredient = currentRecipe.ingredients[currentIngredientIndex];
    try {
      const result = convertUnitsHelper(ingredient.quantity, ingredient.unit, newUnit);
      convertedQuantity = result;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  }
  function applyUnitConversion() {
    if (currentIngredientIndex === null || convertedQuantity === null || !currentRecipe)
      return;
    currentRecipe.ingredients[currentIngredientIndex].quantity = convertedQuantity;
    currentRecipe.ingredients[currentIngredientIndex].unit = newUnit;
    closeUnitConversion();
  }
  function scaleRecipe() {
    if (!currentRecipe)
      return;
    if (isNaN(scaleFactor) || scaleFactor <= 0) {
      alert("Please enter a valid positive number for scaling.");
      return;
    }
    currentRecipe.servings = Math.round(currentRecipe.servings * scaleFactor);
    currentRecipe.ingredients = currentRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * scaleFactor
    }));
    isScaling = false;
  }
  function resetScaling() {
    if (!currentRecipe)
      return;
    fetchRecipes();
    isScaling = false;
    scaleFactor = 1;
  }
  function handleClickOutside(event) {
    const modal = document.querySelector(".modal-content");
    if (modal && !modal.contains(event.target)) {
      closeUnitConversion();
    }
  }
  function standardizeIngredients() {
    if (!currentRecipe)
      return;
    const customConversions = [];
    currentRecipe.ingredients = currentRecipe.ingredients.map((ingredient) => {
      if (isWeightUnit(ingredient.unit)) {
        return ingredient;
      }
      try {
        const convertedQuantity2 = convertUnitsHelper(ingredient.quantity, ingredient.unit, "gram", void 0, customConversions);
        return {
          ...ingredient,
          quantity: convertedQuantity2,
          unit: "gram"
        };
      } catch (error) {
        console.error(`Failed to convert ${ingredient.quantity} ${ingredient.unit} of ingredient ID ${ingredient.ingredientId}`, error);
        return ingredient;
      }
    });
  }
  run(() => {
    if (currentRecipe) {
      ingredientTotalCost = currentRecipe.ingredients.reduce(
        (acc, ingredient) => {
          const ing = ingredientsList.find((i) => i.id === ingredient.ingredientId);
          return ing && ing.price ? acc + ing.price * ingredient.quantity : acc;
        },
        0
      );
    }
  });
  let ingredientTotalCost = 0;
  run(() => {
    if (currentView === "view") {
      isScaling = false;
      isConvertingUnits = false;
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="container p-4 mx-auto">`;
    if (currentView === "list") {
      $$payload2.out += "<!--[-->";
      RecipeHeader($$payload2, {
        get searchTerm() {
          return searchTerm;
        },
        set searchTerm($$value) {
          searchTerm = $$value;
          $$settled = false;
        },
        addRecipe
      });
      $$payload2.out += `<!----> `;
      RecipeTable($$payload2, { recipes, viewRecipe, editRecipe });
      $$payload2.out += `<!----> `;
      Pagination($$payload2, { currentPage, totalPages });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="container p-4 mx-auto">`;
    if (currentView === "create" || currentView === "edit") {
      $$payload2.out += "<!--[-->";
      RecipeForm($$payload2, {
        currentView,
        get currentRecipe() {
          return currentRecipe;
        },
        set currentRecipe($$value) {
          currentRecipe = $$value;
          $$settled = false;
        },
        restaurants,
        cookBooks,
        ingredientsList,
        errors,
        totalSteps,
        goBack,
        handleSubmit,
        prevStep,
        nextStep,
        addIngredient,
        removeIngredient,
        addInstruction,
        removeInstruction
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    if (currentView === "view" && currentRecipe) {
      $$payload2.out += "<!--[-->";
      RecipeDetailsView($$payload2, {
        currentRecipe,
        restaurants,
        cookBooks,
        ingredientsList,
        get isScaling() {
          return isScaling;
        },
        set isScaling($$value) {
          isScaling = $$value;
          $$settled = false;
        },
        get scaleFactor() {
          return scaleFactor;
        },
        set scaleFactor($$value) {
          scaleFactor = $$value;
          $$settled = false;
        },
        get isConvertingUnits() {
          return isConvertingUnits;
        },
        set isConvertingUnits($$value) {
          isConvertingUnits = $$value;
          $$settled = false;
        },
        get currentIngredientIndex() {
          return currentIngredientIndex;
        },
        set currentIngredientIndex($$value) {
          currentIngredientIndex = $$value;
          $$settled = false;
        },
        get newUnit() {
          return newUnit;
        },
        set newUnit($$value) {
          newUnit = $$value;
          $$settled = false;
        },
        get convertedQuantity() {
          return convertedQuantity;
        },
        set convertedQuantity($$value) {
          convertedQuantity = $$value;
          $$settled = false;
        },
        allUnits,
        editRecipe,
        scaleRecipe,
        resetScaling,
        openUnitConversion,
        closeUnitConversion,
        convertUnit,
        applyUnitConversion,
        handleClickOutside,
        goBack,
        standardizeIngredients,
        startStandardization
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (isStandardizing && standardizingIngredientIndex !== null) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"><div class="p-6 bg-white rounded-lg shadow-xl modal-content"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900">Standardize Ingredient</h3> <div class="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer" aria-label="Close modal"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></div></div> `;
      if (currentRecipe) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(allUnits);
        $$payload2.out += `<p class="mb-4">Current: ${escape_html(currentRecipe.ingredients[standardizingIngredientIndex].quantity.toFixed(2))}
						${escape_html(currentRecipe.ingredients[standardizingIngredientIndex].unit)}</p> <div class="flex flex-col mb-4 space-y-2"><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"><option value="">Select unit to convert to</option><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let unit = each_array[$$index];
          $$payload2.out += `<option${attr("value", unit)}>${escape_html(unit)}</option>`;
        }
        $$payload2.out += `<!--]--></select> <button class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Convert</button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div>`;
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
function _page($$payload) {
  $$payload.out += `<div class="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8"><h1 class="mb-6 text-3xl font-bold text-gray-900">Kitchen Management</h1> <div class="mb-6 border-b border-gray-200"><nav class="flex -mb-px space-x-8" aria-label="Tabs"><button${attr("class", `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${stringify("border-indigo-500 text-indigo-600")}`)}>Recipes</button> <button${attr("class", `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Prep Boards</button> <button${attr("class", `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Kitchen Unit Conversion</button></nav></div> `;
  {
    $$payload.out += "<!--[-->";
    RecipeList($$payload);
  }
  $$payload.out += `<!--]--></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BIrlC4mc.js.map
