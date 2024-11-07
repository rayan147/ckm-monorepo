import { a as api } from './index2-NJef63Gp.js';
import 'zod';

const actions = {
  default: async ({ request }) => {
    try {
      const data = await request.formData();
      const emailFormDataValue = data.get("email");
      if (!emailFormDataValue) {
        return {
          message: "Please provide an email address."
        };
      }
      const email = emailFormDataValue.toString();
      const res = await api.earlyAccess.storeEmail({
        body: {
          email
        }
      });
      if (res.status !== 200) {
        return {
          message: `The email ${email} has already been registered.`
        };
      }
      return {
        message: "Your email has been successfully registered!"
      };
    } catch (error) {
      console.error(error);
      return {
        message: "An error occurred. Please try again later."
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-mksMULM7.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/3.sSkEXcgH.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.-IAcHVGa.js","_app/immutable/chunks/template.2JA4nrVh.js","_app/immutable/chunks/index-client.CqCSz8ni.js","_app/immutable/chunks/render.b8-zIhki.js","_app/immutable/chunks/if.rhLWI7XC.js","_app/immutable/chunks/lifecycle.y4eQvxQa.js","_app/immutable/chunks/store.AHA2i8fh.js","_app/immutable/chunks/utils.VMsLsyhi.js","_app/immutable/chunks/chef.ReSWN0ob.js","_app/immutable/chunks/attributes.30sH_1mL.js","_app/immutable/chunks/props.99304sWr.js","_app/immutable/chunks/proxy.-EQ_3oAC.js","_app/immutable/chunks/auth.DphgW5Gx.js","_app/immutable/chunks/index.AeigFpnP.js","_app/immutable/chunks/entry.1xPhGmJB.js","_app/immutable/chunks/each.O8IpT50x.js","_app/immutable/chunks/class.D8Divq4b.js","_app/immutable/chunks/forms.15kVtvZe.js","_app/immutable/chunks/this.N7eL1F-e.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-DqvpYCkA.js.map
