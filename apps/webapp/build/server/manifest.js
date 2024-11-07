const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.3wLJM2sz.js","app":"_app/immutable/entry/app.oae_G4Nv.js","imports":["_app/immutable/entry/start.3wLJM2sz.js","_app/immutable/chunks/entry.F0RumkfI.js","_app/immutable/chunks/runtime.-IAcHVGa.js","_app/immutable/chunks/index.AeigFpnP.js","_app/immutable/chunks/utils.VMsLsyhi.js","_app/immutable/entry/app.oae_G4Nv.js","_app/immutable/chunks/legacy-client.JRc2EHbh.js","_app/immutable/chunks/runtime.-IAcHVGa.js","_app/immutable/chunks/render.b8-zIhki.js","_app/immutable/chunks/template.2JA4nrVh.js","_app/immutable/chunks/disclose-version.bJ1TNjgf.js","_app/immutable/chunks/if.rhLWI7XC.js","_app/immutable/chunks/svelte-component.su-nye_b.js","_app/immutable/chunks/proxy.-EQ_3oAC.js","_app/immutable/chunks/this.N7eL1F-e.js","_app/immutable/chunks/props.99304sWr.js","_app/immutable/chunks/store.AHA2i8fh.js","_app/immutable/chunks/utils.VMsLsyhi.js","_app/immutable/chunks/index-client.CqCSz8ni.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CALbZwyC.js')),
			__memo(() => import('./chunks/1-CpPXVmXf.js')),
			__memo(() => import('./chunks/2-sDwGf6LZ.js')),
			__memo(() => import('./chunks/3-DDbWscaA.js')),
			__memo(() => import('./chunks/4-D9QGfBAV.js')),
			__memo(() => import('./chunks/5-CS8m71e_.js')),
			__memo(() => import('./chunks/6-DVgFd7KD.js')),
			__memo(() => import('./chunks/7-CrnY1jub.js')),
			__memo(() => import('./chunks/8-D_qHW0e8.js')),
			__memo(() => import('./chunks/9-1AaTzKUR.js')),
			__memo(() => import('./chunks/10-B3HcU2nC.js')),
			__memo(() => import('./chunks/11-CFHRMPuK.js')),
			__memo(() => import('./chunks/12-CpvKKDql.js')),
			__memo(() => import('./chunks/13-B9fdIgsD.js')),
			__memo(() => import('./chunks/14-B_TMKoiJ.js')),
			__memo(() => import('./chunks/15-CDPfHeRl.js')),
			__memo(() => import('./chunks/16-BKgse1sl.js')),
			__memo(() => import('./chunks/17-Bagq1v86.js')),
			__memo(() => import('./chunks/18-Caal26SR.js')),
			__memo(() => import('./chunks/19-C-_s034c.js')),
			__memo(() => import('./chunks/20-4dkKsHLb.js')),
			__memo(() => import('./chunks/21-C8Kj6jxF.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: __memo(() => Promise.resolve().then(function () { return _server_ts; }))
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BAyYaZUb.js'))
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/cookbooks",
				pattern: /^\/dashboard\/cookbooks\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/inventory",
				pattern: /^\/dashboard\/inventory\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/dashboard/inventory/orders",
				pattern: /^\/dashboard\/inventory\/orders\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/dashboard/kitchen",
				pattern: /^\/dashboard\/kitchen\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/dashboard/kitchen/prep-boards",
				pattern: /^\/dashboard\/kitchen\/prep-boards\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/dashboard/kitchen/recipes",
				pattern: /^\/dashboard\/kitchen\/recipes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/menus",
				pattern: /^\/dashboard\/menus\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/organization",
				pattern: /^\/dashboard\/organization\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/dashboard/schedules",
				pattern: /^\/dashboard\/schedules\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/dashboard/staff",
				pattern: /^\/dashboard\/staff\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/docs/[...slug]",
				pattern: /^\/docs(?:\/(.*))?\/?$/,
				params: [{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(auth)/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

var _server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null
});

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
