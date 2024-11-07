import { Y as copy_payload, Z as assign_payload, a as push, c as attr, j as bind_props, p as pop } from './index-DVBDmo-L.js';
import { C as Chef } from './chef-CyxlMox2.js';
import './client-CQ5E_ugM.js';
import './exports-DuWZopOC.js';

function Step1($$payload, $$props) {
  push();
  let { registrationData = void 0 } = $$props;
  console.log({ registrationData });
  $$payload.out += `<form class="space-y-4"><div><input type="email"${attr("value", registrationData.email)} placeholder="Email address" required class="w-full px-3 py-2 border rounded-md"></div> <div><input type="password"${attr("value", registrationData.password)} placeholder="Password" required class="w-full px-3 py-2 border rounded-md"></div> <button type="submit" class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Next</button></form>`;
  bind_props($$props, { registrationData });
  pop();
}
function _page($$payload) {
  let registrationData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isOrganization: false,
    organizationName: "",
    restaurants: [
      {
        name: "",
        imageUrl: "",
        address: "",
        zipCode: "",
        state: "",
        city: "",
        owner: ""
      }
    ]
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex items-center justify-center min-h-screen bg-gray-100"><div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md"><div class="flex justify-center mb-6">`;
    Chef($$payload2, {});
    $$payload2.out += `<!----></div> <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Create Your Account</h2> `;
    {
      $$payload2.out += "<!--[-->";
      Step1($$payload2, {
        get registrationData() {
          return registrationData;
        },
        set registrationData($$value) {
          registrationData = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CqIusPy7.js.map
