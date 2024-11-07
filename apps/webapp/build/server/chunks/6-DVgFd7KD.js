import { f as fail } from './_layout.server-DwrKR0Y-.js';
import { a as api } from './index2-NJef63Gp.js';
import 'zod';

const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const registrationDataString = formData.get("registrationData");
    if (!registrationDataString) {
      return fail(400, { message: "Registration data is missing" });
    }
    try {
      const registrationData = JSON.parse(registrationDataString);
      if (registrationData.isOrganization) {
        const organizationResponse = await api.orgs.createOrganization({
          body: {
            name: registrationData.organizationName,
            imageUrl: `https://images.unsplash.com/photo-1615915468538-0fbd857888ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3JnYW5pemF0aW9uJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D`
            // include other fields here
          }
        });
        const organizationId = organizationResponse.body.id;
        const restaurantPromises = registrationData.restaurants.map((restaurant) => {
          api.restaurant.createRestaurant({
            body: {
              name: restaurant.name,
              imageUrl: "https://images.unsplash.com/photo-1700530799809-bfe8221d0465?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
              address: restaurant.address,
              organization: { connect: { id: organizationId } },
              city: restaurant.city,
              state: restaurant.state,
              zipCode: restaurant.zipCode,
              owner: restaurant.owner
            }
          });
        });
        const restaurantResponses = await Promise.all(restaurantPromises);
        console.log({ restaurantResponses });
        const userResponse = await api.auth.register({
          body: {
            email: registrationData.email,
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            passwordHash: registrationData.password,
            role: "ADMIN",
            organizationId
          }
        });
        console.log("User created:", userResponse);
        return { success: true };
      } else {
        console.log({ registrationData });
        const restaurant = await api.restaurant.createRestaurant({
          body: {
            name: registrationData.restaurants[0].name,
            imageUrl: registrationData.restaurants[0].imageUrl,
            address: registrationData.restaurants[0].address,
            city: registrationData.restaurants[0].city,
            state: registrationData.restaurants[0].state,
            zipCode: registrationData.restaurants[0].zipCode,
            owner: registrationData.restaurants[0].owner
          }
        });
        console.log(restaurant.body.bodyResult);
        if (restaurant.status === 201) {
          const user = await api.auth.register({
            body: {
              email: registrationData.email,
              firstName: registrationData.firstName,
              lastName: registrationData.lastName,
              passwordHash: registrationData.password,
              role: "ADMIN",
              restaurantId: restaurant.body.id
            }
          });
        }
        return { success: true };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return fail(500, { message: "An error occurred during registration. Please try again." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CqIusPy7.js')).default;
const server_id = "src/routes/(auth)/register/+page.server.ts";
const imports = ["_app/immutable/nodes/6.40rVX8Tm.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/runtime.-IAcHVGa.js","_app/immutable/chunks/template.2JA4nrVh.js","_app/immutable/chunks/if.rhLWI7XC.js","_app/immutable/chunks/proxy.-EQ_3oAC.js","_app/immutable/chunks/chef.ReSWN0ob.js","_app/immutable/chunks/attributes.30sH_1mL.js","_app/immutable/chunks/render.b8-zIhki.js","_app/immutable/chunks/props.99304sWr.js","_app/immutable/chunks/store.AHA2i8fh.js","_app/immutable/chunks/utils.VMsLsyhi.js","_app/immutable/chunks/input.-wl6lriZ.js","_app/immutable/chunks/event-modifiers.159HUB1L.js","_app/immutable/chunks/index-client.CqCSz8ni.js","_app/immutable/chunks/each.O8IpT50x.js","_app/immutable/chunks/forms.Wo3Zfvcr.js","_app/immutable/chunks/entry.F0RumkfI.js","_app/immutable/chunks/index.AeigFpnP.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-DVgFd7KD.js.map
