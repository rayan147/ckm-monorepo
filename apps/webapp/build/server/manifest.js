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
		client: {start:"_app/immutable/entry/start.DXVHSXhM.js",app:"_app/immutable/entry/app.B9sU-RsI.js",imports:["_app/immutable/entry/start.DXVHSXhM.js","_app/immutable/chunks/BPIobk8A.js","_app/immutable/chunks/CYH0RKHD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BfbtqWii.js","_app/immutable/entry/app.B9sU-RsI.js","_app/immutable/chunks/BN47qgBQ.js","_app/immutable/chunks/CYH0RKHD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DbLt3Tit.js","_app/immutable/chunks/CuIOfsjH.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/DF-hwDfc.js","_app/immutable/chunks/BpkLHP8I.js","_app/immutable/chunks/DRzKVaDG.js","_app/immutable/chunks/DbyC7Uin.js","_app/immutable/chunks/BfbtqWii.js","_app/immutable/chunks/Du1wYa_y.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CEwPcrtY.js')),
			__memo(() => import('./chunks/1-CiwqRNle.js')),
			__memo(() => import('./chunks/2-DrO7vbjF.js')),
			__memo(() => import('./chunks/3-BNop539L.js')),
			__memo(() => import('./chunks/4-Drq74i8L.js')),
			__memo(() => import('./chunks/5-DZ9xmVZM.js')),
			__memo(() => import('./chunks/6-CgYqkl11.js')),
			__memo(() => import('./chunks/7-DMUltzE7.js')),
			__memo(() => import('./chunks/8-BEPTtPue.js')),
			__memo(() => import('./chunks/9-C7gwt0iL.js')),
			__memo(() => import('./chunks/10-FtghSuB-.js')),
			__memo(() => import('./chunks/11-B4wjd9nJ.js')),
			__memo(() => import('./chunks/12-i9rrdad9.js')),
			__memo(() => import('./chunks/13-1H7rKCT7.js')),
			__memo(() => import('./chunks/14-PFjpv2Bw.js')),
			__memo(() => import('./chunks/15-CoVtU5Ei.js')),
			__memo(() => import('./chunks/16-CozxzB5a.js')),
			__memo(() => import('./chunks/17-CEt1vqq4.js')),
			__memo(() => import('./chunks/18-DvJYhmE2.js')),
			__memo(() => import('./chunks/19-C0HHBdhi.js')),
			__memo(() => import('./chunks/20-CBBwfyr4.js'))
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
				page: { layouts: [0,], errors: [1,], leaf: 8 },
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
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/cookbooks",
				pattern: /^\/dashboard\/cookbooks\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/dashboard/inventory",
				pattern: /^\/dashboard\/inventory\/?$/,
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
				id: "/dashboard/kitchen/recipe/[id]",
				pattern: /^\/dashboard\/kitchen\/recipe\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
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
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
