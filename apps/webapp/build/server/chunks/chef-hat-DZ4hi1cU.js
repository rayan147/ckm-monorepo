import { f as spread_props, g as slot, h as sanitize_props } from './index-DVBDmo-L.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';

function Chef_hat($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"
      }
    ],
    ["path", { "d": "M6 17h12" }]
  ];
  Icon($$payload, spread_props([
    { name: "chef-hat" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}

export { Chef_hat as C };
//# sourceMappingURL=chef-hat-DZ4hi1cU.js.map
