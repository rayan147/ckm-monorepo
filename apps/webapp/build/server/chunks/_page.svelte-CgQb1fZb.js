import { c as attr, e as escape_html } from './index-DVBDmo-L.js';
import './client-CQ5E_ugM.js';
import { C as Chef } from './chef-CyxlMox2.js';
import './exports-DuWZopOC.js';

function _page($$payload) {
  let email = "";
  let submitting = false;
  $$payload.out += `<div class="flex items-center justify-center min-h-screen bg-gray-100"><div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md"><div class="flex justify-center mb-6">`;
  Chef($$payload, {});
  $$payload.out += `<!----></div> <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Forgot Password</h2> `;
  {
    $$payload.out += "<!--[!-->";
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <form method="POST" action="?/forgotPassword" class="space-y-4"><div><input type="email" name="email"${attr("value", email)} placeholder="Enter your email address" required class="w-full px-3 py-2 border rounded-md"></div> <button type="submit" class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"${attr("disabled", submitting, true)}>${escape_html("Send Reset Instructions")}</button></form> <p class="mt-4 text-sm text-center">Remember your password? <a href="/login" class="text-indigo-600 hover:underline">Sign in</a></p>`;
  }
  $$payload.out += `<!--]--></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CgQb1fZb.js.map
