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
		client: {start:"_app/immutable/entry/start.DOZW33M_.js",app:"_app/immutable/entry/app.CQbv8eOW.js",imports:["_app/immutable/entry/start.DOZW33M_.js","_app/immutable/chunks/CdzvoWJP.js","_app/immutable/chunks/0XNjcOGh.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/0gT94Vac.js","_app/immutable/entry/app.CQbv8eOW.js","_app/immutable/chunks/CFtA-SMq.js","_app/immutable/chunks/0XNjcOGh.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BjK7BjC1.js","_app/immutable/chunks/DyHrH9qZ.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/BQIhlly5.js","_app/immutable/chunks/C0_CzAew.js","_app/immutable/chunks/CllRQy8F.js","_app/immutable/chunks/CePiyIUN.js","_app/immutable/chunks/0gT94Vac.js","_app/immutable/chunks/C-RGwL6e.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Bg2Mv7nP.js')),
			__memo(() => import('./chunks/1-B2HP-4ku.js')),
			__memo(() => import('./chunks/2-zccxLeki.js')),
			__memo(() => import('./chunks/3-BUSlp9L4.js')),
			__memo(() => import('./chunks/4-B_I_51Vx.js')),
			__memo(() => import('./chunks/5-BQ05QbuQ.js')),
			__memo(() => import('./chunks/6-DgE4tPGs.js')),
			__memo(() => import('./chunks/7-D9hk0yqW.js')),
			__memo(() => import('./chunks/8-DuPxAMrZ.js')),
			__memo(() => import('./chunks/9-B0Z4lEt9.js')),
			__memo(() => import('./chunks/10-BN91gJKL.js')),
			__memo(() => import('./chunks/11-Czi6RUO6.js')),
			__memo(() => import('./chunks/12-CbQgQx-q.js')),
			__memo(() => import('./chunks/13-Dm-HDmmI.js')),
			__memo(() => import('./chunks/14-BhLeC_jl.js')),
			__memo(() => import('./chunks/15-CpzeNv9z.js')),
			__memo(() => import('./chunks/16-DEZMV0gh.js')),
			__memo(() => import('./chunks/17-B_4TZ2ij.js')),
			__memo(() => import('./chunks/18-B3oqUgj8.js')),
			__memo(() => import('./chunks/19-DqAyyxjJ.js'))
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
				endpoint: __memo(() => import('./chunks/_server.ts-BRTHZLWU.js'))
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
				id: "/dashboard/kitchen",
				pattern: /^\/dashboard\/kitchen\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/dashboard/kitchen/recipe/[id]",
				pattern: /^\/dashboard\/kitchen\/recipe\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/dashboard/menus",
				pattern: /^\/dashboard\/menus\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/dashboard/organization",
				pattern: /^\/dashboard\/organization\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/schedules",
				pattern: /^\/dashboard\/schedules\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/dashboard/staff",
				pattern: /^\/dashboard\/staff\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/docs/[...slug]",
				pattern: /^\/docs(?:\/(.*))?\/?$/,
				params: [{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
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
		prerendered_routes: new Set([]),
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
