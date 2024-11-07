import { p as pop, a as push } from './index-DVBDmo-L.js';
import { Q as QueryClient, a as QueryClientProvider } from './QueryClientProvider-DjpXPZ4o.js';
import './client-CQ5E_ugM.js';
import './index-server-RG6-_s_N.js';
import './exports-DuWZopOC.js';

function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  const queryClient = new QueryClient();
  QueryClientProvider($$payload, {
    client: queryClient,
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CCf6x1Bk.js.map
