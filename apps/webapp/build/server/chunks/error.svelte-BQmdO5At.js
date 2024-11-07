import { e as escape_html, s as store_get, u as unsubscribe_stores, p as pop, a as push } from './index-DVBDmo-L.js';
import { p as page } from './stores-CCr8sjbV.js';
import './client-CQ5E_ugM.js';
import './exports-DuWZopOC.js';

function Error($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<h1>${escape_html(store_get($$store_subs ??= {}, "$page", page).status)}</h1> <p>${escape_html(store_get($$store_subs ??= {}, "$page", page).error?.message)}</p>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}

export { Error as default };
//# sourceMappingURL=error.svelte-BQmdO5At.js.map
