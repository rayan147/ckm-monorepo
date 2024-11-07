import { s as store_get, e as escape_html, u as unsubscribe_stores, p as pop, a as push } from './index-DVBDmo-L.js';
import { p as page } from './stores-CCr8sjbV.js';
import './client-CQ5E_ugM.js';
import './exports-DuWZopOC.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  console.log(store_get($$store_subs ??= {}, "$page", page).params.slug);
  const slugArr = store_get($$store_subs ??= {}, "$page", page).params.slug.split("/");
  $$payload.out += `<a href="/" class="home">Home</a> `;
  if (slugArr.length === 1) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h1>Viewing docs for feature ${escape_html(slugArr[0])}</h1>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (slugArr.length === 2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<h1>Viewing docs for feature ${escape_html(slugArr[0])} and concept ${escape_html(slugArr[1])}</h1>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-4vVD5iFO.js.map
