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
		client: {"start":"_app/immutable/entry/start.CHTNsPq5.js","app":"_app/immutable/entry/app.BTQrNu01.js","imports":["_app/immutable/entry/start.CHTNsPq5.js","_app/immutable/chunks/entry.CkrHRABC.js","_app/immutable/chunks/runtime.D5Eo_qK5.js","_app/immutable/chunks/index.BFqC5wTN.js","_app/immutable/chunks/index.D7Bi-O10.js","_app/immutable/chunks/utils.StPNKlDT.js","_app/immutable/entry/app.BTQrNu01.js","_app/immutable/chunks/legacy-client.C4n4vyWt.js","_app/immutable/chunks/runtime.D5Eo_qK5.js","_app/immutable/chunks/index.BFqC5wTN.js","_app/immutable/chunks/render.DvwA5x7Y.js","_app/immutable/chunks/template.crdunwoG.js","_app/immutable/chunks/disclose-version.Bg9kRutz.js","_app/immutable/chunks/if.CJDxwfmJ.js","_app/immutable/chunks/svelte-component.B6ZBFQpJ.js","_app/immutable/chunks/proxy.COwzr3C4.js","_app/immutable/chunks/this.D1O0NcWZ.js","_app/immutable/chunks/props.hcWm1i0A.js","_app/immutable/chunks/store.B2k5Mcgv.js","_app/immutable/chunks/utils.StPNKlDT.js","_app/immutable/chunks/index-client.h3VPn9dO.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-DpKvKUDG.js')),
			__memo(() => import('./chunks/1-CdmGWxDU.js')),
			__memo(() => import('./chunks/2-v9f-5jT2.js')),
			__memo(() => import('./chunks/3-BrgOv9l1.js')),
			__memo(() => import('./chunks/4-DDyzZNiR.js')),
			__memo(() => import('./chunks/5-L3jAFpEa.js')),
			__memo(() => import('./chunks/6-Cgxyoqmv.js')),
			__memo(() => import('./chunks/7-C0mHY1p-.js')),
			__memo(() => import('./chunks/8-3NSPP_h3.js')),
			__memo(() => import('./chunks/9-iCxyj4fs.js')),
			__memo(() => import('./chunks/10-CxTRkeQk.js')),
			__memo(() => import('./chunks/11-DkYylgWU.js')),
			__memo(() => import('./chunks/12-DL9_H32w.js')),
			__memo(() => import('./chunks/13-DozwabNM.js')),
			__memo(() => import('./chunks/14-CkgeptZQ.js')),
			__memo(() => import('./chunks/15-D_Y3XjPN.js')),
			__memo(() => import('./chunks/16-KB66GgXC.js')),
			__memo(() => import('./chunks/17-DzuKo9zM.js')),
			__memo(() => import('./chunks/18-S4p6bAaN.js')),
			__memo(() => import('./chunks/19-U98ELD2p.js')),
			__memo(() => import('./chunks/20-DYGcMB0R.js')),
			__memo(() => import('./chunks/21-C_Cicbgr.js'))
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
