import { f as forgotPassword } from './auth-C6JRQBrD.js';
import { f as fail } from './_layout.server-DwrKR0Y-.js';
import { match, P } from 'ts-pattern';
import './index2-NJef63Gp.js';
import 'zod';

const actions = {
  forgotPassword: async ({ request }) => {
    const data = await request.formData();
    const rawEmail = data.get("email")?.toString();
    return match(rawEmail).with(P.string.includes("@"), forgotPassword).with(P.string, () => fail(400, {
      message: "Invalid email format",
      type: "failure"
    })).otherwise(() => ({
      type: "success"
    }));
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CgQb1fZb.js')).default;
const server_id = "src/routes/(auth)/forgot-password/+page.server.ts";
const imports = ["_app/immutable/nodes/4.sdeK_KZP.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.-IAcHVGa.js","_app/immutable/chunks/render.b8-zIhki.js","_app/immutable/chunks/template.2JA4nrVh.js","_app/immutable/chunks/if.rhLWI7XC.js","_app/immutable/chunks/forms.15kVtvZe.js","_app/immutable/chunks/entry.1xPhGmJB.js","_app/immutable/chunks/index.AeigFpnP.js","_app/immutable/chunks/utils.VMsLsyhi.js","_app/immutable/chunks/attributes.30sH_1mL.js","_app/immutable/chunks/input.-wl6lriZ.js","_app/immutable/chunks/proxy.-EQ_3oAC.js","_app/immutable/chunks/chef.ReSWN0ob.js","_app/immutable/chunks/props.99304sWr.js","_app/immutable/chunks/store.AHA2i8fh.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BfNq-2Cu.js.map
