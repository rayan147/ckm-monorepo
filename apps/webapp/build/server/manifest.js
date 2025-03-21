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
		client: {start:"_app/immutable/entry/start.qr_9ikkK.js",app:"_app/immutable/entry/app.CEQ2ilEd.js",imports:["_app/immutable/entry/start.qr_9ikkK.js","_app/immutable/chunks/2G3-cP0A.js","_app/immutable/chunks/D6GUojFs.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BTNl6hjc.js","_app/immutable/entry/app.CEQ2ilEd.js","_app/immutable/chunks/CG0L0HUv.js","_app/immutable/chunks/D6GUojFs.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/SBBnSZDA.js","_app/immutable/chunks/BMtT0H90.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/c2VXzntZ.js","_app/immutable/chunks/ByrHssHc.js","_app/immutable/chunks/CiPVbJNv.js","_app/immutable/chunks/D_3rvUew.js","_app/immutable/chunks/BTNl6hjc.js","_app/immutable/chunks/CzbG7iO9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BxE_ikyQ.js')),
			__memo(() => import('./chunks/1-DMI0DQC3.js')),
			__memo(() => import('./chunks/2-B75zYHrf.js')),
			__memo(() => import('./chunks/3-BHy6iQQ0.js')),
			__memo(() => import('./chunks/4-CJvD-JyV.js')),
			__memo(() => import('./chunks/5-Bz4562nM.js')),
			__memo(() => import('./chunks/6-BaiOrAuE.js')),
			__memo(() => import('./chunks/7-CmNNDcHL.js')),
			__memo(() => import('./chunks/8-DuPxAMrZ.js')),
			__memo(() => import('./chunks/9-CqfmPm7d.js')),
			__memo(() => import('./chunks/10-DEZQNfxi.js')),
			__memo(() => import('./chunks/11-CXOGZLu9.js')),
			__memo(() => import('./chunks/12-B9G2JBRI.js')),
			__memo(() => import('./chunks/13-i-orCizF.js')),
			__memo(() => import('./chunks/14-BlLoGkRR.js')),
			__memo(() => import('./chunks/15-CE6XcmOQ.js')),
			__memo(() => import('./chunks/16-COZkMGdp.js')),
			__memo(() => import('./chunks/17-O2NYvK0Q.js')),
			__memo(() => import('./chunks/18-BpAmOIHr.js')),
			__memo(() => import('./chunks/19-C4PoKtyd.js'))
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
