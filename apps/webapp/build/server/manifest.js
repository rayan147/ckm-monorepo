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
		client: {start:"_app/immutable/entry/start.B3VELEao.js",app:"_app/immutable/entry/app.B56hFwAS.js",imports:["_app/immutable/entry/start.B3VELEao.js","_app/immutable/chunks/BndGL0J1.js","_app/immutable/chunks/DvcIveBy.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Hzh4Sg0W.js","_app/immutable/entry/app.B56hFwAS.js","_app/immutable/chunks/JVvHUyin.js","_app/immutable/chunks/DvcIveBy.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DQ-vHSMf.js","_app/immutable/chunks/BxSPAumF.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/C9gZSgii.js","_app/immutable/chunks/CMRz7Jb7.js","_app/immutable/chunks/CYQL5dOT.js","_app/immutable/chunks/BhrPNHgp.js","_app/immutable/chunks/Hzh4Sg0W.js","_app/immutable/chunks/DO6X3Xh6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D4EV-cWB.js')),
			__memo(() => import('./chunks/1-BlyX8H5g.js')),
			__memo(() => import('./chunks/2-D8glGYFU.js')),
			__memo(() => import('./chunks/3-PazOGcNl.js')),
			__memo(() => import('./chunks/4-zdA6Fchf.js')),
			__memo(() => import('./chunks/5-WdWflD21.js')),
			__memo(() => import('./chunks/6-CYWPsM01.js')),
			__memo(() => import('./chunks/7-CqiDk21U.js')),
			__memo(() => import('./chunks/8-DuPxAMrZ.js')),
			__memo(() => import('./chunks/9-BqDas5q4.js')),
			__memo(() => import('./chunks/10-D_Q83Emq.js')),
			__memo(() => import('./chunks/11-BEKpwB7a.js')),
			__memo(() => import('./chunks/12-CHsOvhJx.js')),
			__memo(() => import('./chunks/13-DYNd8enc.js')),
			__memo(() => import('./chunks/14-D02t5JDa.js')),
			__memo(() => import('./chunks/15-C5jhMo38.js')),
			__memo(() => import('./chunks/16-BWPTtTWO.js')),
			__memo(() => import('./chunks/17-Ba_urRp0.js')),
			__memo(() => import('./chunks/18-CO_oPn5j.js')),
			__memo(() => import('./chunks/19-CxWlipfO.js'))
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
