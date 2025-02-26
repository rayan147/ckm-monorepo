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
		client: {start:"_app/immutable/entry/start.GQMw9in3.js",app:"_app/immutable/entry/app.BR0R2NGw.js",imports:["_app/immutable/entry/start.GQMw9in3.js","_app/immutable/chunks/BZStufSk.js","_app/immutable/chunks/QVhOFtx3.js","_app/immutable/chunks/BFqC5wTN.js","_app/immutable/chunks/BF8fzuhZ.js","_app/immutable/entry/app.BR0R2NGw.js","_app/immutable/chunks/YUCeb19p.js","_app/immutable/chunks/QVhOFtx3.js","_app/immutable/chunks/BFqC5wTN.js","_app/immutable/chunks/pZ_1hlpI.js","_app/immutable/chunks/DbEcWxDY.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/D4qc5GMp.js","_app/immutable/chunks/mgwE69oG.js","_app/immutable/chunks/BesO7yXd.js","_app/immutable/chunks/lhJE1U24.js","_app/immutable/chunks/BF8fzuhZ.js","_app/immutable/chunks/Dzvo0kDF.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D4_WCPWx.js')),
			__memo(() => import('./chunks/1-C8ul9-AR.js')),
			__memo(() => import('./chunks/2-BGvpuT6y.js')),
			__memo(() => import('./chunks/3-CQfstCni.js')),
			__memo(() => import('./chunks/4-Da2JAIKZ.js')),
			__memo(() => import('./chunks/5-D5PIWfE6.js')),
			__memo(() => import('./chunks/6-mi8ih8fS.js')),
			__memo(() => import('./chunks/7-BbGja7Hd.js')),
			__memo(() => import('./chunks/8-C95BKmKe.js')),
			__memo(() => import('./chunks/9-Dz-U6c84.js')),
			__memo(() => import('./chunks/10-Hgw7GG9j.js')),
			__memo(() => import('./chunks/11-TtsY5DCY.js')),
			__memo(() => import('./chunks/12-D1Q6Bu_m.js')),
			__memo(() => import('./chunks/13-Q9dwwvI8.js')),
			__memo(() => import('./chunks/14-DcuCHQ_x.js')),
			__memo(() => import('./chunks/15-Dc0AokPh.js')),
			__memo(() => import('./chunks/16-BEQ7rUz0.js')),
			__memo(() => import('./chunks/17-a-luO3h5.js')),
			__memo(() => import('./chunks/18-CaZchm20.js')),
			__memo(() => import('./chunks/19-CefyZ6G8.js'))
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
