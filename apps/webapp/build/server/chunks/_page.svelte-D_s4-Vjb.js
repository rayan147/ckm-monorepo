import { e as escape_html, c as attr, p as pop, a as push } from './index-DVBDmo-L.js';
import { r as run } from './legacy-server-aB_mYRX2.js';
import './client-CQ5E_ugM.js';
import 'ts-pattern';
import { C as Chef } from './chef-CyxlMox2.js';
import './exports-DuWZopOC.js';

function Login($$payload, $$props) {
  push();
  let { form } = $$props;
  let step = 1;
  let email = "";
  let password = "";
  let code = "";
  let submitting = false;
  run(() => {
    if (form?.step) {
      step = form.step;
    }
  });
  $$payload.out += `<h2 class="mb-6 text-2xl font-bold text-center text-gray-900">${escape_html(step === 1 ? "Sign in to your account" : "Enter Verification Code")}</h2> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (step === 1) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<form method="POST" action="?/login" class="space-y-4"><div><input type="email" name="email"${attr("value", email)} placeholder="Email address" required class="w-full px-3 py-2 border rounded-md"></div> <div><input type="password" name="password"${attr("value", password)} placeholder="Password" required class="w-full px-3 py-2 border rounded-md"></div> <div class="flex items-center justify-between text-sm"><label class="flex items-center"><input type="checkbox" name="remember-me" class="mr-2"> Remember me</label> <a href="/forgot-password" class="text-indigo-600 hover:underline">Forgot password?</a></div> <button type="submit" class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"${attr("disabled", submitting, true)}>${escape_html("Sign in")}</button></form> <p class="mt-4 text-sm text-center">Don't have an account? <a href="/register" class="text-indigo-600 hover:underline">Create one</a></p>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (step === 2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<form method="POST" action="?/verify" class="space-y-4"><input type="text" name="code"${attr("value", code)} placeholder="Enter verification code" class="w-full px-3 py-2 border rounded-md"> <input type="hidden" name="email"${attr("value", email)}> <button type="submit" class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"${attr("disabled", submitting, true)}>${escape_html("Verify Code")}</button></form> <form method="POST" action="?/resendCode" class="mt-4"><input type="hidden" name="email"${attr("value", email)}> <button type="submit" class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"${attr("disabled", submitting, true)}>Resend Code</button></form>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  let { form } = $$props;
  $$payload.out += `<div class="flex items-center justify-center min-h-screen bg-gray-100"><div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md"><div class="flex justify-center mb-6">`;
  Chef($$payload, {});
  $$payload.out += `<!----></div> `;
  Login($$payload, { form });
  $$payload.out += `<!----></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D_s4-Vjb.js.map
