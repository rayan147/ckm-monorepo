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
		client: {start:"_app/immutable/entry/start.B1YjB9lO.js",app:"_app/immutable/entry/app.iliXxMNh.js",imports:["_app/immutable/entry/start.B1YjB9lO.js","_app/immutable/chunks/Dqd0Qusy.js","_app/immutable/chunks/B69j3p8y.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/uW3OwGCL.js","_app/immutable/entry/app.iliXxMNh.js","_app/immutable/chunks/BVx8lD0h.js","_app/immutable/chunks/B69j3p8y.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/D-HdG9Gd.js","_app/immutable/chunks/2fTbWK7B.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/MdynZ_wb.js","_app/immutable/chunks/C-8Sf0Dc.js","_app/immutable/chunks/Cz8Zxg3J.js","_app/immutable/chunks/vvBaM8P0.js","_app/immutable/chunks/uW3OwGCL.js","_app/immutable/chunks/C7SRLtrH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Ng-4Vbbx.js')),
			__memo(() => import('./chunks/1-BQHTAZ9d.js')),
			__memo(() => import('./chunks/2-BFxdcnXA.js')),
			__memo(() => import('./chunks/3-BpV6qNR5.js')),
			__memo(() => import('./chunks/4-GJljepYA.js')),
			__memo(() => import('./chunks/5-DEPYcZbQ.js')),
			__memo(() => import('./chunks/6-BreB4C3W.js')),
			__memo(() => import('./chunks/7-CREA_fsk.js')),
			__memo(() => import('./chunks/8-DQzmN2aa.js')),
			__memo(() => import('./chunks/9-B_yhpMeL.js')),
			__memo(() => import('./chunks/10-DeX2Kew3.js')),
			__memo(() => import('./chunks/11-BCZRNUFh.js')),
			__memo(() => import('./chunks/12-CWlHKxSM.js')),
			__memo(() => import('./chunks/13-DmIHeqB-.js')),
			__memo(() => import('./chunks/14-BFM_2IFB.js')),
			__memo(() => import('./chunks/15-dUyKiPvk.js')),
			__memo(() => import('./chunks/16-D4EvsxtH.js')),
			__memo(() => import('./chunks/17-BeMIz3vB.js')),
			__memo(() => import('./chunks/18-BAB9EmhB.js'))
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
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CX4B78R3.js'))
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/cookbooks",
				pattern: /^\/dashboard\/cookbooks\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/inventory",
				pattern: /^\/dashboard\/inventory\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/kitchen",
				pattern: /^\/dashboard\/kitchen\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/dashboard/kitchen/recipe/[id]",
				pattern: /^\/dashboard\/kitchen\/recipe\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/dashboard/menus",
				pattern: /^\/dashboard\/menus\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/dashboard/organization",
				pattern: /^\/dashboard\/organization\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/schedules",
				pattern: /^\/dashboard\/schedules\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/dashboard/staff",
				pattern: /^\/dashboard\/staff\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/docs/[...slug]",
				pattern: /^\/docs(?:\/(.*))?\/?$/,
				params: [{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(auth)/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(auth)/[authType=authType]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"authType","matcher":"authType","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			const { match: authType } = await import ('./chunks/authType-BsO0irlg.js');
			return { authType };
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
