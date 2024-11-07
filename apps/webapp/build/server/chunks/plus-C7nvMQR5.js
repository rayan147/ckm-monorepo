import { f as spread_props, g as slot, h as sanitize_props } from './index-DVBDmo-L.js';
import { I as Icon } from './Icon-CpfcK_Ck.js';

function Plus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "M12 5v14" }]
  ];
  Icon($$payload, spread_props([
    { name: "plus" },
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

export { Plus as P };
//# sourceMappingURL=plus-C7nvMQR5.js.map
