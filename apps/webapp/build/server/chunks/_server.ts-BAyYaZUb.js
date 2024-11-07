import { j as json } from './_layout.server-DwrKR0Y-.js';

const POST = async ({ cookies }) => {
  cookies.set("session", "", {
    path: "/",
    expires: /* @__PURE__ */ new Date(0)
  });
  return json({ success: true });
};

export { POST };
//# sourceMappingURL=_server.ts-BAyYaZUb.js.map
