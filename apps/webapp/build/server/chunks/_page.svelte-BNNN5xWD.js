import { Y as copy_payload, Z as assign_payload, p as pop, b as ensure_array_like, c as attr, e as escape_html, f as spread_props, g as slot, a as push, s as store_get, d as stringify, u as unsubscribe_stores, j as bind_props, h as sanitize_props } from './index-DVBDmo-L.js';
import { w as writable, d as derived, g as get } from './index3-r_vjO9dq.js';
import { a as api } from './index2-NJef63Gp.js';
import { r as run } from './legacy-server-aB_mYRX2.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';
import { D as Dollar_sign } from './dollar-sign-B9SbwHjR.js';
import { P as Plus } from './plus-C7nvMQR5.js';
import { S as Search } from './search-hR5CybgE.js';
import { S as Square_pen, T as Trash_2 } from './trash-2-q45MJ6J1.js';
import 'zod';

function Arrow_left($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-left" },
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
function Arrow_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-right" },
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
function Chevron_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-down" },
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
function Chevron_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-up" },
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
function Percent($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "line",
      {
        "x1": "19",
        "x2": "5",
        "y1": "5",
        "y2": "19"
      }
    ],
    [
      "circle",
      { "cx": "6.5", "cy": "6.5", "r": "2.5" }
    ],
    [
      "circle",
      { "cx": "17.5", "cy": "17.5", "r": "2.5" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "percent" },
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
function X($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon($$payload, spread_props([
    { name: "x" },
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
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar) {
  var ctor, len;
  if (foo === bar)
    return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date)
      return foo.getTime() === bar.getTime();
    if (ctor === RegExp)
      return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len]))
          ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor))
          return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor]))
          return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}
function subscribeOnce(observable) {
  return new Promise((resolve) => {
    observable.subscribe(resolve)();
  });
}
function update(object, path, value) {
  object.update((o) => {
    set(o, path, value);
    return o;
  });
}
function cloneDeep(object) {
  return JSON.parse(JSON.stringify(object));
}
function isNullish(value) {
  return value === void 0 || value === null;
}
function isEmpty(object) {
  return isNullish(object) || Object.keys(object).length <= 0;
}
function getValues(object) {
  let results = [];
  for (const [, value] of Object.entries(object)) {
    const values = typeof value === "object" ? getValues(value) : [value];
    results = [...results, ...values];
  }
  return results;
}
function getErrorsFromSchema(initialValues, schema, errors = {}) {
  for (const key in schema) {
    switch (true) {
      case (schema[key].type === "object" && !isEmpty(schema[key].fields)): {
        errors[key] = getErrorsFromSchema(
          initialValues[key],
          schema[key].fields,
          { ...errors[key] }
        );
        break;
      }
      case schema[key].type === "array": {
        const values = initialValues && initialValues[key] ? initialValues[key] : [];
        errors[key] = values.map((value) => {
          const innerError = getErrorsFromSchema(
            value,
            schema[key].innerType.fields,
            { ...errors[key] }
          );
          return Object.keys(innerError).length > 0 ? innerError : "";
        });
        break;
      }
      default: {
        errors[key] = "";
      }
    }
  }
  return errors;
}
const deepEqual = dequal;
function assignDeep(object, value) {
  if (Array.isArray(object)) {
    return object.map((o) => assignDeep(o, value));
  }
  const copy = {};
  for (const key in object) {
    copy[key] = typeof object[key] === "object" && !isNullish(object[key]) ? assignDeep(object[key], value) : value;
  }
  return copy;
}
function set(object, path, value) {
  if (new Object(object) !== object)
    return object;
  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }
  const result = path.slice(0, -1).reduce(
    (accumulator, key, index) => new Object(accumulator[key]) === accumulator[key] ? accumulator[key] : accumulator[key] = Math.trunc(Math.abs(path[index + 1])) === +path[index + 1] ? [] : {},
    object
  );
  result[path[path.length - 1]] = value;
  return object;
}
const util = {
  assignDeep,
  cloneDeep,
  deepEqual,
  getErrorsFromSchema,
  getValues,
  isEmpty,
  isNullish,
  set,
  subscribeOnce,
  update
};
const NO_ERROR = "";
const IS_TOUCHED = true;
function isCheckbox(element) {
  return element.getAttribute && element.getAttribute("type") === "checkbox";
}
function isFileInput(element) {
  return element.getAttribute && element.getAttribute("type") === "file";
}
function resolveValue(element) {
  if (isFileInput(element)) {
    return element.files;
  } else if (isCheckbox(element)) {
    return element.checked;
  } else {
    return element.value;
  }
}
const createForm = (config) => {
  let initialValues = config.initialValues || {};
  const validationSchema = config.validationSchema;
  const validateFunction = config.validate;
  const onSubmit = config.onSubmit;
  const getInitial = {
    values: () => util.cloneDeep(initialValues),
    errors: () => validationSchema ? util.getErrorsFromSchema(initialValues, validationSchema.fields) : util.assignDeep(initialValues, NO_ERROR),
    touched: () => util.assignDeep(initialValues, !IS_TOUCHED)
  };
  const form = writable(getInitial.values());
  const errors = writable(getInitial.errors());
  const touched = writable(getInitial.touched());
  const isSubmitting = writable(false);
  const isValidating = writable(false);
  const isValid = derived(errors, ($errors) => {
    const noErrors = util.getValues($errors).every((field) => field === NO_ERROR);
    return noErrors;
  });
  const modified = derived(form, ($form) => {
    const object = util.assignDeep($form, false);
    for (let key in $form) {
      object[key] = !util.deepEqual($form[key], initialValues[key]);
    }
    return object;
  });
  const isModified = derived(modified, ($modified) => {
    return util.getValues($modified).includes(true);
  });
  function validateField(field) {
    return util.subscribeOnce(form).then((values) => validateFieldValue(field, values[field]));
  }
  function validateFieldValue(field, value) {
    updateTouched(field, true);
    if (validationSchema) {
      isValidating.set(true);
      return validationSchema.validateAt(field, get(form)).then(() => util.update(errors, field, "")).catch((error) => util.update(errors, field, error.message)).finally(() => {
        isValidating.set(false);
      });
    }
    if (validateFunction) {
      isValidating.set(true);
      return Promise.resolve().then(() => validateFunction({ [field]: value })).then(
        (errs) => util.update(errors, field, !util.isNullish(errs) ? errs[field] : "")
      ).finally(() => {
        isValidating.set(false);
      });
    }
    return Promise.resolve();
  }
  function updateValidateField(field, value) {
    updateField(field, value);
    return validateFieldValue(field, value);
  }
  function handleChange(event) {
    const element = event.target;
    const field = element.name || element.id;
    const value = resolveValue(element);
    return updateValidateField(field, value);
  }
  function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    isSubmitting.set(true);
    return util.subscribeOnce(form).then((values) => {
      if (typeof validateFunction === "function") {
        isValidating.set(true);
        return Promise.resolve().then(() => validateFunction(values)).then((error) => {
          if (util.isNullish(error) || util.getValues(error).length === 0) {
            return clearErrorsAndSubmit(values);
          } else {
            errors.set(error);
            isSubmitting.set(false);
          }
        }).finally(() => isValidating.set(false));
      }
      if (validationSchema) {
        isValidating.set(true);
        return validationSchema.validate(values, { abortEarly: false }).then(() => clearErrorsAndSubmit(values)).catch((yupErrors) => {
          if (yupErrors && yupErrors.inner) {
            const updatedErrors = getInitial.errors();
            yupErrors.inner.map(
              (error) => util.set(updatedErrors, error.path, error.message)
            );
            errors.set(updatedErrors);
          }
          isSubmitting.set(false);
        }).finally(() => isValidating.set(false));
      }
      return clearErrorsAndSubmit(values);
    });
  }
  function handleReset() {
    form.set(getInitial.values());
    errors.set(getInitial.errors());
    touched.set(getInitial.touched());
  }
  function clearErrorsAndSubmit(values) {
    return Promise.resolve().then(() => errors.set(getInitial.errors())).then(() => onSubmit(values, form, errors)).finally(() => isSubmitting.set(false));
  }
  function updateField(field, value) {
    util.update(form, field, value);
  }
  function updateTouched(field, value) {
    util.update(touched, field, value);
  }
  function updateInitialValues(newValues) {
    initialValues = newValues;
    handleReset();
  }
  return {
    form,
    errors,
    touched,
    modified,
    isValid,
    isSubmitting,
    isValidating,
    isModified,
    handleChange,
    handleSubmit,
    handleReset,
    updateField,
    updateValidateField,
    updateTouched,
    validateField,
    updateInitialValues,
    state: derived(
      [
        form,
        errors,
        touched,
        modified,
        isValid,
        isValidating,
        isSubmitting,
        isModified
      ],
      ([
        $form,
        $errors,
        $touched,
        $modified,
        $isValid,
        $isValidating,
        $isSubmitting,
        $isModified
      ]) => ({
        form: $form,
        errors: $errors,
        touched: $touched,
        modified: $modified,
        isValid: $isValid,
        isSubmitting: $isSubmitting,
        isValidating: $isValidating,
        isModified: $isModified
      })
    )
  };
};
function EditMenuItemModal($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    showModal = void 0,
    editingMenuItem,
    recipes = [],
    selectedMenu
  } = $$props;
  let foodCostValue = 0;
  let priceValue = 0;
  run(() => {
    console.log(editingMenuItem?.id);
  });
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    foodCost: 0,
    menuId: selectedMenu?.id || 0,
    recipeIds: [],
    // Multiple recipe IDs
    quantity: 1,
    allergens: [],
    nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
  };
  let currentStep = 1;
  const totalSteps = 4;
  const { form, handleSubmit } = createForm({
    initialValues,
    onSubmit: async (values) => {
      ({
        ...values,
        recipeIds: values.recipeIds.length ? values.recipeIds : [],
        nutritionalInfo: values.nutritionalInfo
      });
      closeModal();
    }
  });
  run(() => {
    if (editingMenuItem) {
      form.set({
        name: editingMenuItem.name || "",
        description: editingMenuItem.description || "",
        price: editingMenuItem.price || 0,
        foodCost: editingMenuItem.foodCost || 0,
        menuId: editingMenuItem.menuId || selectedMenu?.id || 0,
        recipeIds: editingMenuItem.menuItemRecipes?.map((r) => r.recipeId) || [],
        quantity: editingMenuItem.quantity || 1,
        allergens: editingMenuItem.allergens || [],
        nutritionalInfo: editingMenuItem.nutritionalInfo || { calories: 0, protein: 0, carbs: 0, fat: 0 }
      });
    }
  });
  function closeModal() {
    showModal = false;
    currentStep = 1;
    form.set({
      name: "",
      description: "",
      price: 0,
      foodCost: 0,
      menuId: selectedMenu?.id || 0,
      recipeIds: [],
      quantity: 1,
      allergens: [],
      nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    });
  }
  let foodCostPercentage = store_get($$store_subs ??= {}, "$form", form).price > 0 && store_get($$store_subs ??= {}, "$form", form).foodCost > 0 ? (store_get($$store_subs ??= {}, "$form", form).foodCost / store_get($$store_subs ??= {}, "$form", form).price * 100).toFixed(2) : "0.00";
  let suggestedPrice = store_get($$store_subs ??= {}, "$form", form).foodCost > 0 ? (store_get($$store_subs ??= {}, "$form", form).foodCost / 0.28).toFixed(2) : "0.00";
  run(() => {
    foodCostValue = store_get($$store_subs ??= {}, "$form", form).foodCost === 0 ? 2 : store_get($$store_subs ??= {}, "$form", form).foodCost;
  });
  run(() => {
    priceValue = store_get($$store_subs ??= {}, "$form", form).price === 0 ? 2 : store_get($$store_subs ??= {}, "$form", form).price;
  });
  let breakEvenPrice = store_get($$store_subs ??= {}, "$form", form).foodCost > 0 ? (store_get($$store_subs ??= {}, "$form", form).foodCost * 1.5).toFixed(2) : "0.00";
  let searchQuery = "";
  let filteredRecipes = recipes;
  let selectedRecipeIds = store_get($$store_subs ??= {}, "$form", form).recipeIds;
  run(() => {
    filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  if (showModal) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="relative w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl sm:mx-auto"><div class="flex items-center justify-between mb-4"><h3 class="text-xl font-semibold text-gray-900" id="modal-title">${escape_html(editingMenuItem ? "Edit Menu Item" : "Add New Menu Item")}</h3> <button class="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"><span class="sr-only">Close</span> `;
    X($$payload, { class: "w-6 h-6", "aria-hidden": "true" });
    $$payload.out += `<!----></button></div> <div class="mb-6"><div class="flex items-center justify-between text-sm font-medium text-gray-700"><span>Step ${escape_html(currentStep)} of ${escape_html(totalSteps)}</span> <span>${escape_html([
      "Basic Info",
      "Pricing",
      "Additional Details"
    ][currentStep - 1])}</span></div> <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div class="bg-indigo-600 h-2.5 rounded-full"${attr("style", `width: ${stringify(currentStep / totalSteps * 100)}%; transition: width 0.3s ease-in-out;`)}></div></div></div> <form class="space-y-6">`;
    if (currentStep === 1) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(filteredRecipes);
      $$payload.out += `<div><div><label for="name" class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label> <input type="text" id="name"${attr("value", store_get($$store_subs ??= {}, "$form", form).name)} class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required placeholder="Enter menu item name"></div> <div class="mt-4"><label for="description" class="block text-sm font-medium text-gray-700">Description</label> <textarea id="description" rows="3" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter description">`;
      const $$body = escape_html(store_get($$store_subs ??= {}, "$form", form).description);
      if ($$body) {
        $$payload.out += `${$$body}`;
      }
      $$payload.out += `</textarea></div> <div class="mt-4"><label for="recipe-search" class="block text-sm font-medium text-gray-700">Select Recipes <span class="text-red-500">*</span></label> <div class="mt-2"><input type="text"${attr("value", searchQuery)} class="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search recipes..."> <div class="overflow-y-auto border border-gray-300 rounded-md max-h-60"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let recipe = each_array[$$index];
        $$payload.out += `<label class="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"><input type="checkbox"${attr("value", recipe.id)}${attr("checked", selectedRecipeIds.includes(recipe.id), true)} class="w-4 h-4 text-indigo-600 border-gray-300 rounded form-checkbox"> <span class="ml-2 text-sm text-gray-700">${escape_html(recipe.name)}</span></label>`;
      }
      $$payload.out += `<!--]--> `;
      if (filteredRecipes.length === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="px-3 py-2 text-sm text-gray-500">No recipes found.</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (currentStep === 2) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><div class="grid grid-cols-2 gap-6"><div><label for="price" class="block text-sm font-medium text-gray-700">Price ($) <span class="text-red-500">*</span></label> <div class="relative mt-1 rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
        Dollar_sign($$payload, {
          class: "w-5 h-5 text-gray-400",
          "aria-hidden": "true"
        });
        $$payload.out += `<!----></div> <input type="number" id="price"${attr("value", priceValue)} step="0.01" min="0" class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required placeholder="0.00"></div></div> <div><label for="foodCost" class="block text-sm font-medium text-gray-700">Food Cost ($) <span class="text-red-500">*</span></label> <div class="relative mt-1 rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
        Dollar_sign($$payload, {
          class: "w-5 h-5 text-gray-400",
          "aria-hidden": "true"
        });
        $$payload.out += `<!----></div> <input${attr("value", foodCostValue)} id="foodCost" step="0.01" min="0" class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></div></div></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (currentStep === 3) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div><div class="grid grid-cols-2 gap-6"><div><label for="price" class="block text-sm font-medium text-gray-700">Price ($) <span class="text-red-500">*</span></label> <div class="relative mt-1 rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
          Dollar_sign($$payload, {
            class: "w-5 h-5 text-gray-400",
            "aria-hidden": "true"
          });
          $$payload.out += `<!----></div> <input type="number" id="price"${attr("value", store_get($$store_subs ??= {}, "$form", form).price)} step="0.01" min="0" class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required placeholder="0.00"></div></div> <div><label for="foodCost" class="block text-sm font-medium text-gray-700">Food Cost ($) <span class="text-red-500">*</span></label> <div class="relative mt-1 rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`;
          Dollar_sign($$payload, {
            class: "w-5 h-5 text-gray-400",
            "aria-hidden": "true"
          });
          $$payload.out += `<!----></div> <input type="number" id="foodCost"${attr("value", store_get($$store_subs ??= {}, "$form", form).foodCost)} step="0.01" min="0" class="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required placeholder="0.00"></div></div></div> <div class="p-4 mt-4 rounded-md bg-gray-50"><h4 class="mb-2 text-sm font-medium text-gray-700">Pricing Information</h4> <div class="flex items-center text-sm text-gray-600">`;
          Percent($$payload, { class: "w-5 h-5 mr-2 text-gray-400" });
          $$payload.out += `<!----> <span>Food Cost Percentage: ${escape_html(foodCostPercentage)}%</span></div> <div class="flex items-center mt-1 text-sm text-gray-600">`;
          Dollar_sign($$payload, { class: "w-5 h-5 mr-2 text-gray-400" });
          $$payload.out += `<!----> <span>Suggested Price: $${escape_html(suggestedPrice)}</span></div> <div class="flex items-center mt-1 text-sm text-gray-600">`;
          Dollar_sign($$payload, { class: "w-5 h-5 mr-2 text-gray-400" });
          $$payload.out += `<!----> <span>Break-even Price: $${escape_html(breakEvenPrice)}</span></div></div> <div class="mt-4"><label for="quantity" class="block text-sm font-medium text-gray-700">Quantity <span class="text-red-500">*</span></label> <input type="number" id="quantity"${attr("value", store_get($$store_subs ??= {}, "$form", form).quantity)} min="1" class="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required placeholder="1"></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (currentStep === 4) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div><div class="mb-4"><label for="allergens" class="block text-sm font-medium text-gray-700">Allergens</label> <input type="text" id="allergens"${attr("value", store_get($$store_subs ??= {}, "$form", form).allergens)} class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Nuts, Dairy"></div> <div><h4 class="block mb-2 text-sm font-medium text-gray-700">Nutritional Information</h4> <div class="grid grid-cols-2 gap-6"><div><label for="calories" class="block text-sm font-medium text-gray-700">Calories</label> <input type="number" id="calories"${attr("value", store_get($$store_subs ??= {}, "$form", form).nutritionalInfo.calories)} class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0"></div> <div><label for="protein" class="block text-sm font-medium text-gray-700">Protein (g)</label> <input type="number" id="protein"${attr("value", store_get($$store_subs ??= {}, "$form", form).nutritionalInfo.protein)} class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0"></div> <div><label for="carbs" class="block text-sm font-medium text-gray-700">Carbs (g)</label> <input type="number" id="carbs"${attr("value", store_get($$store_subs ??= {}, "$form", form).nutritionalInfo.carbs)} class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0"></div> <div><label for="fat" class="block text-sm font-medium text-gray-700">Fat (g)</label> <input type="number" id="fat"${attr("value", store_get($$store_subs ??= {}, "$form", form).nutritionalInfo.fat)} class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0"></div></div></div></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--> <div class="flex justify-between mt-6">`;
    if (currentStep > 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">`;
      Arrow_left($$payload, { class: "w-5 h-5 mr-2" });
      $$payload.out += `<!----> Previous</button>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div></div>`;
    }
    $$payload.out += `<!--]--> `;
    if (currentStep < totalSteps) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Next `;
      Arrow_right($$payload, { class: "w-5 h-5 ml-2" });
      $$payload.out += `<!----></button>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<button type="submit" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">${escape_html(editingMenuItem ? "Update Menu Item" : "Create Menu Item")}</button>`;
    }
    $$payload.out += `<!--]--></div></form></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { showModal });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let menus = [];
  let searchTerm = "";
  let showMenuModal = false;
  let showMenuItemModal = false;
  let editingMenu = null;
  let editingMenuItem = null;
  let selectedMenu = {
    id: 0,
    name: "",
    restaurantId: 0,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    menuItems: null,
    expanded: false
  };
  let recipes = [];
  let restaurants = [];
  let errors = [];
  const {
    form: menuForm,
    handleSubmit: handleMenuSubmit
  } = createForm({
    initialValues: {
      name: "",
      restaurantId: "",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    },
    onSubmit: async (values) => {
      try {
        if (editingMenu) {
          await updateMenu(editingMenu.id, values);
        } else {
          await createMenu(values);
        }
        showMenuModal = false;
        editingMenu = null;
        await fetchMenus();
      } catch (error) {
        console.error("Failed to save menu:", error);
        errors = [error.message || "Failed to save menu"];
      }
    }
  });
  async function fetchMenus() {
    try {
      const response = await api.menu.getMenus({});
      menus = response.body.map((menu) => ({ ...menu, expanded: false, menuItems: null }));
    } catch (error) {
      console.error("Error fetching menus:", error);
      errors = ["Failed to fetch menus"];
    }
  }
  async function createMenu(data) {
    try {
      await api.menu.createMenu({ body: data });
    } catch (error) {
      console.error("Error creating menu:", error);
      errors = ["Failed to create menu"];
      throw error;
    }
  }
  async function updateMenu(id, data) {
    try {
      await api.menu.updateMenu({ params: { id }, body: data });
    } catch (error) {
      console.error("Error updating menu:", error);
      errors = ["Failed to update menu"];
      throw error;
    }
  }
  let filteredMenus = menus.filter((menu) => menu.name.toLowerCase().includes(searchTerm.toLowerCase()));
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(filteredMenus);
    $$payload2.out += `<div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 svelte-sv01e3"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between svelte-sv01e3"><h1 class="text-3xl font-extrabold text-gray-900 svelte-sv01e3">Menu Management</h1> <button class="inline-flex items-center px-5 py-3 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0 svelte-sv01e3">`;
    Plus($$payload2, { class: "w-5 h-5 mr-2" });
    $$payload2.out += `<!----> Add Menu</button></div> <div class="mt-6 svelte-sv01e3"><div class="relative svelte-sv01e3"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none svelte-sv01e3">`;
    Search($$payload2, { class: "w-5 h-5 text-gray-400" });
    $$payload2.out += `<!----></div> <input type="text"${attr("value", searchTerm)} class="block w-full py-3 pl-10 pr-4 leading-5 text-gray-700 placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm svelte-sv01e3" placeholder="Search menus by name..."></div></div> <div class="grid items-start gap-8 mt-8 lg:grid-cols-2 xl:grid-cols-3 svelte-sv01e3"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let menu = each_array[$$index_1];
      $$payload2.out += `<div class="flex flex-col transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg svelte-sv01e3"><div class="flex items-center justify-between px-6 py-5 svelte-sv01e3"><div class="flex items-center svelte-sv01e3"><button class="text-gray-400 hover:text-gray-500 focus:outline-none svelte-sv01e3">`;
      if (menu.expanded) {
        $$payload2.out += "<!--[-->";
        Chevron_up($$payload2, { class: "w-6 h-6" });
      } else {
        $$payload2.out += "<!--[!-->";
        Chevron_down($$payload2, { class: "w-6 h-6" });
      }
      $$payload2.out += `<!--]--></button> <h2 class="ml-4 text-xl font-semibold text-indigo-600 truncate svelte-sv01e3">${escape_html(menu.name)}</h2></div> <div class="flex space-x-3 svelte-sv01e3"><button class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 svelte-sv01e3">`;
      Square_pen($$payload2, { class: "w-4 h-4 mr-2" });
      $$payload2.out += `<!----> Edit</button> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 svelte-sv01e3">`;
      Trash_2($$payload2, { class: "w-4 h-4 mr-2" });
      $$payload2.out += `<!----> Delete</button></div></div> <p class="px-6 pb-5 text-sm text-gray-500 svelte-sv01e3">Restaurant: ${escape_html(menu.name)}</p> `;
      if (menu.expanded) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="px-6 pb-6 bg-gray-50 svelte-sv01e3"><div class="flex items-center justify-between mb-4 svelte-sv01e3"><h3 class="text-lg font-medium text-gray-900 svelte-sv01e3">Menu Items</h3> <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 svelte-sv01e3">`;
        Plus($$payload2, { class: "w-4 h-4 mr-2" });
        $$payload2.out += `<!----> Add Item</button></div> `;
        if (menu.menuItems && menu.menuItems.length > 0) {
          $$payload2.out += "<!--[-->";
          const each_array_1 = ensure_array_like(menu.menuItems);
          $$payload2.out += `<ul class="space-y-4 svelte-sv01e3"><!--[-->`;
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let item = each_array_1[$$index];
            $$payload2.out += `<li class="flex flex-col p-4 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center sm:justify-between svelte-sv01e3"><div class="flex-1 svelte-sv01e3"><h4 class="font-semibold text-gray-800 text-md svelte-sv01e3">${escape_html(item.name)}</h4> <p class="mt-1 text-sm text-gray-600 svelte-sv01e3">Price: <span class="text-indigo-600 svelte-sv01e3">$${escape_html(item.price.toFixed(2))}</span> | Food
												Cost: <span class="text-red-600 svelte-sv01e3">$${escape_html(item.foodCost.toFixed(2))}</span></p> <p class="mt-1 text-sm text-gray-600 svelte-sv01e3">${escape_html(item.description || "No description provided.")}</p></div> <div class="flex mt-4 space-x-3 sm:mt-0 svelte-sv01e3"><button class="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 svelte-sv01e3">`;
            Square_pen($$payload2, { class: "w-4 h-4 mr-1" });
            $$payload2.out += `<!----> Edit</button> <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 svelte-sv01e3">`;
            Trash_2($$payload2, { class: "w-4 h-4 mr-1" });
            $$payload2.out += `<!----> Delete</button></div></li>`;
          }
          $$payload2.out += `<!--]--></ul>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<p class="mt-4 text-sm text-gray-500 svelte-sv01e3">No menu items found.</p>`;
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--></div></div> `;
    EditMenuItemModal($$payload2, {
      get showModal() {
        return showMenuItemModal;
      },
      set showModal($$value) {
        showMenuItemModal = $$value;
        $$settled = false;
      },
      get editingMenuItem() {
        return editingMenuItem;
      },
      set editingMenuItem($$value) {
        editingMenuItem = $$value;
        $$settled = false;
      },
      get recipes() {
        return recipes;
      },
      set recipes($$value) {
        recipes = $$value;
        $$settled = false;
      },
      get selectedMenu() {
        return selectedMenu;
      },
      set selectedMenu($$value) {
        selectedMenu = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (showMenuModal) {
      $$payload2.out += "<!--[-->";
      const each_array_3 = ensure_array_like(restaurants);
      $$payload2.out += `<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 svelte-sv01e3" role="dialog" aria-modal="true"><div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl sm:mx-auto svelte-sv01e3"><div class="flex items-center justify-between mb-6 svelte-sv01e3"><h3 class="text-xl font-semibold text-gray-900 svelte-sv01e3">${escape_html(editingMenu ? "Edit Menu" : "Add New Menu")}</h3> <button class="p-2 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 svelte-sv01e3">`;
      Trash_2($$payload2, { class: "w-6 h-6", "aria-hidden": "true" });
      $$payload2.out += `<!----></button></div> `;
      if (errors.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array_2 = ensure_array_like(errors);
        $$payload2.out += `<div class="mb-6 svelte-sv01e3"><!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let error = each_array_2[$$index_2];
          $$payload2.out += `<p class="text-sm text-red-600 svelte-sv01e3">${escape_html(error)}</p>`;
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <form class="space-y-6 svelte-sv01e3"><div class="svelte-sv01e3"><label for="name" class="block text-sm font-medium text-gray-700 svelte-sv01e3">Menu Name</label> <input type="text" id="name"${attr("value", store_get($$store_subs ??= {}, "$menuForm", menuForm).name)} required class="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 svelte-sv01e3" placeholder="Enter menu name"></div> <div class="svelte-sv01e3"><label for="restaurantId" class="block text-sm font-medium text-gray-700 svelte-sv01e3">Restaurant</label> <select id="restaurantId" required class="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 svelte-sv01e3"><option value="" class="svelte-sv01e3">Select a restaurant</option><!--[-->`;
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let restaurant = each_array_3[$$index_3];
        $$payload2.out += `<option${attr("value", restaurant.id)} class="svelte-sv01e3">${escape_html(restaurant.name)}</option>`;
      }
      $$payload2.out += `<!--]--></select></div> <div class="flex justify-end space-x-4 svelte-sv01e3"><button type="button" class="px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 svelte-sv01e3">Cancel</button> <button type="submit" class="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 svelte-sv01e3">${escape_html(editingMenu ? "Update Menu" : "Create Menu")}</button></div></form></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BNNN5xWD.js.map
