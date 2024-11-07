import { l as login, r as resendCode, v as verifyLoginCode } from './auth-C6JRQBrD.js';
import { f as fail } from './_layout.server-DwrKR0Y-.js';
import { match, P } from 'ts-pattern';
import './index2-NJef63Gp.js';
import 'zod';

const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    return match({ email, password }).with(
      { email: P.nullish, password: P.nullish },
      () => fail(400, {
        step: 1,
        message: "Email and password are required"
      })
    ).with(
      { email: P.string.includes("@"), password: P.string.length(10) },
      () => fail(400, {
        step: 1,
        message: "Needs to be a valid email or password needs to be 10 chars long"
      })
    ).otherwise(async ({ email: email2, password: password2 }) => {
      try {
        const response = await login(email2, password2);
        return match(response).with(
          null,
          () => fail(401, {
            step: 1,
            message: "Invalid email or password"
          })
        ).otherwise(() => {
          cookies.set("email", email2, {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
            // 1 week
          });
          return {
            step: 2,
            email: email2
          };
        });
      } catch (error) {
        console.error(error);
        return fail(500, {
          step: 1,
          message: "An error occurred. Please try again."
        });
      }
    });
  },
  resendCode: async ({ request, cookies }) => {
    const email = cookies.get("email");
    console.log({ email });
    return match(email).with(P.string.includes("@"), async (email2) => {
      try {
        await resendCode(email2);
        return {
          actionType: "resendCode",
          type: "success",
          message: "Verification code has been resent to your email.",
          step: 2
        };
      } catch (error) {
        console.error(error);
        return fail(500, {
          step: 2,
          message: "An error occurred while resending the code. Please try again."
        });
      }
    }).with(
      P.nullish,
      () => fail(400, {
        step: 2,
        message: "Email not found"
      })
    ).otherwise(
      () => fail(401, {
        step: 2,
        message: "Not Authorized"
      })
    );
  },
  verify: async ({ request, cookies }) => {
    try {
      const data = await request.formData();
      const codeRaw = data.get("code")?.toString();
      return match(codeRaw).with(P.string.length(6), async (code) => {
        const res = await verifyLoginCode(codeRaw);
        console.log(res);
        return match(res).with(
          P.nullish,
          () => fail(401, {
            step: 2,
            message: "Invalid verification code"
          })
        ).otherwise(({ user, accessToken }) => {
          cookies.set("session", accessToken, {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
            // 1 week
          });
          return {
            actionType: "verify",
            type: "success",
            location: "/dashboard",
            status: 200,
            user
          };
        });
      }).otherwise(
        () => fail(400, {
          step: 2,
          message: "Code cannot be null or invalid length"
        })
      );
    } catch (error) {
      console.error(error);
      const errorMessage = error.message;
      return fail(500, {
        step: 2,
        message: `An error occurred: ${errorMessage}. Please try again.`
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D_s4-Vjb.js')).default;
const server_id = "src/routes/(auth)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/5.iuor2u2Y.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.-IAcHVGa.js","_app/immutable/chunks/template.2JA4nrVh.js","_app/immutable/chunks/render.b8-zIhki.js","_app/immutable/chunks/if.rhLWI7XC.js","_app/immutable/chunks/forms.15kVtvZe.js","_app/immutable/chunks/entry.1xPhGmJB.js","_app/immutable/chunks/index.AeigFpnP.js","_app/immutable/chunks/utils.VMsLsyhi.js","_app/immutable/chunks/attributes.30sH_1mL.js","_app/immutable/chunks/input.-wl6lriZ.js","_app/immutable/chunks/proxy.-EQ_3oAC.js","_app/immutable/chunks/legacy-client.JRc2EHbh.js","_app/immutable/chunks/auth.DphgW5Gx.js","_app/immutable/chunks/RestaurantForm.5W2s5SDh.js","_app/immutable/chunks/event-modifiers.159HUB1L.js","_app/immutable/chunks/props.99304sWr.js","_app/immutable/chunks/store.AHA2i8fh.js","_app/immutable/chunks/index-client.CqCSz8ni.js","_app/immutable/chunks/chef.ReSWN0ob.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-CxkQTQYD.js.map
