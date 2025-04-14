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
		client: {start:"_app/immutable/entry/start.DpYtsRV8.js",app:"_app/immutable/entry/app.DFc9Ql0j.js",imports:["_app/immutable/entry/start.DpYtsRV8.js","_app/immutable/chunks/3DzXOUak.js","_app/immutable/chunks/Ewv0jNue.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DQlq6amS.js","_app/immutable/entry/app.DFc9Ql0j.js","_app/immutable/chunks/BlnwQd3k.js","_app/immutable/chunks/Ewv0jNue.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BzrS2bt7.js","_app/immutable/chunks/CEIIQnP9.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/iDSgM7kk.js","_app/immutable/chunks/DB_VzW39.js","_app/immutable/chunks/B0Pt9IqR.js","_app/immutable/chunks/D5aQs5AA.js","_app/immutable/chunks/DQlq6amS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BSusDSSS.js')),
			__memo(() => import('./chunks/1-Dy2g_7Wt.js')),
			__memo(() => import('./chunks/2-b7PKi7kh.js')),
			__memo(() => import('./chunks/3-DIdLC-sS.js')),
			__memo(() => import('./chunks/4-alqWmFjL.js')),
			__memo(() => import('./chunks/5-CcaUoVU7.js')),
			__memo(() => import('./chunks/6-Bbyu9Iew.js')),
			__memo(() => import('./chunks/7-CBQfvowu.js')),
			__memo(() => import('./chunks/8-DuPxAMrZ.js')),
			__memo(() => import('./chunks/9-DyMwBF5_.js')),
			__memo(() => import('./chunks/10-BLvyRziF.js')),
			__memo(() => import('./chunks/11-DZ9f9O05.js')),
			__memo(() => import('./chunks/12-DQ-p2cQo.js')),
			__memo(() => import('./chunks/13-BMGEuITm.js')),
			__memo(() => import('./chunks/14-BC_ChZIL.js')),
			__memo(() => import('./chunks/15-C8S5E-ni.js')),
			__memo(() => import('./chunks/16-CH1Y3PGg.js')),
			__memo(() => import('./chunks/17-DarwnuxV.js')),
			__memo(() => import('./chunks/18-CpaQWD_m.js')),
			__memo(() => import('./chunks/19-wFnkvFtO.js')),
			__memo(() => import('./chunks/20-GPqGPGzT.js'))
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
				endpoint: __memo(() => import('./chunks/_server.ts-DAGYYIMw.js'))
			},
			{
				id: "/api/auth/me",
				pattern: /^\/api\/auth\/me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BdK3UuKe.js'))
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
				id: "/dashboard/kitchen/recipe/new",
				pattern: /^\/dashboard\/kitchen\/recipe\/new\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
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
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/organization",
				pattern: /^\/dashboard\/organization\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/dashboard/schedules",
				pattern: /^\/dashboard\/schedules\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/dashboard/staff",
				pattern: /^\/dashboard\/staff\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/docs/[...slug]",
				pattern: /^\/docs(?:\/(.*))?\/?$/,
				params: [{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
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
				id: "/(auth)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
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
