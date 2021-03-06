(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["phantasm"] = factory();
	else
		root["phantasm"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Hal Hildebrand on 8/7/15.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _restfulJs = __webpack_require__(1);

	var _restfulJs2 = _interopRequireDefault(_restfulJs);

	var FacetResource = (function () {
	    function FacetResource(apiBase) {
	        _classCallCheck(this, FacetResource);

	        this.base = apiBase.one("facet");
	    }

	    _createClass(FacetResource, [{
	        key: "ruleforms",
	        value: function ruleforms() {
	            return this.base;
	        }
	    }, {
	        key: "facets",
	        value: (function (_facets) {
	            function facets(_x) {
	                return _facets.apply(this, arguments);
	            }

	            facets.toString = function () {
	                return _facets.toString();
	            };

	            return facets;
	        })(function (ruleform) {
	            var rfBase = this.base.one(ruleform);
	            rfBase.ruleform = ruleform;

	            rfBase.facet = function (classifier, classification) {
	                var facet = rfBase.one(classifier).one(classification);
	                facet.ruleform = facets.ruleform;
	                facet.classifier = classifier;
	                facet.classification = classification;

	                facet.instances = function () {
	                    return facet.one("instances");
	                };

	                facet.instance = function (instance) {
	                    var inst = facet.one(instance);
	                    inst.instance = instance;
	                    return inst;
	                };

	                return facet;
	            };

	            return rfBase;
	        })
	    }, {
	        key: "facet",
	        value: function facet(ruleform, classifier, classification) {
	            return facets(ruleform).facet(classifier, classification);
	        }
	    }]);

	    return FacetResource;
	})();

	var WorkspaceResource = (function () {
	    function WorkspaceResource(apiBase) {
	        _classCallCheck(this, WorkspaceResource);

	        this.base = apiBase.one("workspace");
	    }

	    _createClass(WorkspaceResource, [{
	        key: "workspace",
	        value: (function (_workspace) {
	            function workspace(_x2) {
	                return _workspace.apply(this, arguments);
	            }

	            workspace.toString = function () {
	                return _workspace.toString();
	            };

	            return workspace;
	        })(function (workspace) {
	            var resource = this.base.one(workspace);

	            resource.names = function () {
	                return resource;
	            };

	            resource.lookup = function (scopedName) {
	                return resource.one("lookup").one(scopedName);
	            };

	            return resource;
	        })
	    }, {
	        key: "lookup",
	        value: function lookup(wsp, scopedName) {
	            return workspace(wsp).lookup(scopedName);
	        }
	    }]);

	    return WorkspaceResource;
	})();

	var WspMediatedFacetResource = (function () {
	    function WspMediatedFacetResource(apiBase, workspace) {
	        _classCallCheck(this, WspMediatedFacetResource);

	        this.base = apiBase.one("workspace-mediated").one(workspace).one("facet");
	        this.workspace = workspace;
	        this.workspaceResource = new WorkspaceResource(apiBase).workspace(workspace);
	    }

	    _createClass(WspMediatedFacetResource, [{
	        key: "ruleforms",
	        value: function ruleforms() {
	            return this.base;
	        }
	    }, {
	        key: "facets",
	        value: (function (_facets2) {
	            function facets(_x3) {
	                return _facets2.apply(this, arguments);
	            }

	            facets.toString = function () {
	                return _facets2.toString();
	            };

	            return facets;
	        })(function (ruleform) {
	            var rfBase = base.one(ruleform);
	            rfBase.ruleform = ruleform;

	            rfBase.facet = function (classifier, classification) {
	                var facet = rfBase.one(classifier).one(classification);

	                facet.ruleform = facets.ruleform;
	                facet.classifierName = classifier;
	                facet.classificationName = classification;

	                facet.classifier = function () {
	                    // todo add caching
	                    return this.workspaceResource.lookup(classifier)["@id"];
	                };
	                facet.classification = function () {
	                    // todo add caching
	                    return this.workspaceResource.lookup(classification)["@id"];
	                };

	                facet.instances = function () {
	                    return facet.one("instances");
	                };

	                facet.instance = function (instance) {
	                    var inst = facet.one(instance);
	                    inst.instance = instance;
	                    return inst;
	                };

	                return facet;
	            };

	            return rfBase;
	        })
	    }, {
	        key: "facet",
	        value: function facet(ruleform, classifier, classification) {
	            return facets(ruleform).facet(classifier, classification);
	        }
	    }]);

	    return WspMediatedFacetResource;
	})();

	var Ultrastructure = (function () {
	    function Ultrastructure(base) {
	        _classCallCheck(this, Ultrastructure);

	        this.api = base.one("json-ld");
	        this.workspaceResource = new WorkspaceResource(this.api);
	        this.facets = new FacetResource(this.api);
	    }

	    _createClass(Ultrastructure, [{
	        key: "facetResource",
	        value: function facetResource() {
	            return this.facets;
	        }
	    }, {
	        key: "getWspMediatedFacetResource",
	        value: function getWspMediatedFacetResource(workspace) {
	            return new WspMediatedFacetResource(this.api, workspace);
	        }
	    }]);

	    return Ultrastructure;
	})();

	exports["default"] = Ultrastructure;
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):"object"==typeof exports?exports.restful=e():t.restful=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){var n={baseUrl:t,port:e||80,prefixUrl:"",protocol:"http"},r=function(){var t={_http:_["default"](v["default"]),headers:{},fullRequestInterceptors:[],fullResponseInterceptors:[],requestInterceptors:[],responseInterceptors:[]},e={url:function r(){var r=n.protocol+"://"+n.baseUrl;return 80!==n.port&&(r+=":"+n.port),""!==n.prefixUrl&&(r+="/"+n.prefixUrl),r}};return a["default"](e,t),i["default"](function(){return t._http},e)}(),o={_url:null,customUrl:function(t){return"undefined"==typeof t?this._url:(this._url=t,this)},url:function(){return r.url()},one:function(t,e){return p["default"](t,e,o)},oneUrl:function(t,e){return this.customUrl(e),this.one(t,null)},all:function(t){return f["default"](t,o)},allUrl:function(t,e){return this.customUrl(e),this.all(t)}};return o=i["default"](h["default"](r),o),a["default"](o,n),o}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u),s=n(2),a=r(s),c=n(3),f=r(c),l=n(8),p=r(l),d=n(9),h=r(d),m=n(10),v=r(m),y=n(30),_=r(y);t.exports=e["default"]},function(t,e){"use strict";function n(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function r(t){var e=Object.getOwnPropertyNames(t);return Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(t))),e.filter(function(e){return o.call(t,e)})}var o=Object.prototype.propertyIsEnumerable;t.exports=Object.assign||function(t,e){for(var o,u,i=n(t),s=1;s<arguments.length;s++){o=arguments[s],u=r(Object(o));for(var a=0;a<u.length;a++)i[u[a]]=o[u[a]]}return i}},function(t,e){"use strict";function n(t,e){function n(n){t[n]=function(r){return arguments.length?(e[n]=r,t):e[n]}}for(var r in e)e.hasOwnProperty(r)&&n(r)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n,t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){function n(t){var n=a["default"](o+"/"+t,e());return n.headers(u.headers()).responseInterceptors(u.responseInterceptors()).requestInterceptors(u.requestInterceptors()),n}function r(n){var r=p["default"](t,n,e);return r().headers(u.headers()).responseInterceptors(u.responseInterceptors()).requestInterceptors(u.requestInterceptors()),r}var o=e.customUrl&&e.customUrl()?e.customUrl():[e.url(),t].join("/"),u=a["default"](o,e()),s={get:function(t,e,o){return n(t).get(e,o).then(function(t){return f["default"](t,r)})},getAll:function(t,e){return u.getAll(t,e).then(function(t){return f["default"](t,r)})},post:function(t,e){return u.post(t,e).then(function(t){return f["default"](t)})},put:function(t,e,r){return n(t).put(e,r).then(function(t){return f["default"](t)})},patch:function(t,e,r){return n(t).patch(e,r).then(function(t){return f["default"](t)})},head:function(t,e,r){return n(t).head(e,r).then(function(t){return f["default"](t)})},"delete":function(t,e){return n(t)["delete"](e).then(function(t){return f["default"](t)})},url:function(){return o}};return i["default"](h["default"](u),s)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u),s=n(4),a=r(s),c=n(5),f=r(c),l=n(8),p=r(l),d=n(9),h=r(d);t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){function n(){for(var t=l,e=[];t;)e=e.concat(t.fullRequestInterceptors()),t=t._parent?t._parent():null;return e}function r(){for(var t=l,e=[];t;)e=e.concat(t.fullResponseInterceptors()),t=t._parent?t._parent():null;return e}function o(){for(var t=l,e=[];t;)e=e.concat(t.requestInterceptors()),t=t._parent?t._parent():null;return e}function u(){for(var t=l,e=[];t;)e=e.concat(t.responseInterceptors()),t=t._parent?t._parent():null;return e}function s(){for(var t=l,e={};t;)i["default"](e,t.headers()),t=t._parent?t._parent():null;return e}function c(t,e){var a=void 0===arguments[2]?{}:arguments[2],c=void 0===arguments[3]?{}:arguments[3],f=void 0===arguments[4]?null:arguments[4],l={method:t,url:e,params:a||{},headers:i["default"]({},s(),c||{}),responseInterceptors:u(),fullResponseInterceptors:r()};f&&(l.data=f,l.requestInterceptors=o());var p=n();for(var d in p){var h=p[d](a,c,f,t,e);h.method&&(l.method=h.method),h.url&&(l.url=h.url),h.params&&(l.params=h.params),h.headers&&(l.headers=h.headers),h.data&&(l.data=h.data)}return l}var f={_parent:e,headers:{},fullRequestInterceptors:[],fullResponseInterceptors:[],requestInterceptors:[],responseInterceptors:[]},l={get:function(e,n){var r=c("get",t,e,n);return f._parent().request(r.method,r)},getAll:function(e,n){var r=c("get",t,e,n);return f._parent().request(r.method,r)},post:function(e,n){n=n||{},n["Content-Type"]||(n["Content-Type"]="application/json;charset=UTF-8");var r=c("post",t,{},n,e);return f._parent().request(r.method,r)},put:function(e,n){n=n||{},n["Content-Type"]||(n["Content-Type"]="application/json;charset=UTF-8");var r=c("put",t,{},n,e);return f._parent().request(r.method,r)},patch:function(e,n){n=n||{},n["Content-Type"]||(n["Content-Type"]="application/json;charset=UTF-8");var r=c("patch",t,{},n,e);return f._parent().request(r.method,r)},"delete":function(e){var n=c("delete",t,{},e);return f._parent().request(n.method,n)},head:function(e){var n=c("head",t,{},e);return f._parent().request(n.method,n)}};return l=i["default"](function(){return f._parent()},l),a["default"](l,f),l}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u),s=n(2),a=r(s);t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),u=r(o);e["default"]=function(t,e){return new Promise(function(n,r){var o=t.status;return o>=200&&400>o?n(u["default"](t,e)):void r(u["default"](t))})},t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){var n={status:function(){return t.status},body:function(){var n=void 0===arguments[0]?!0:arguments[0];return n&&e?"[object Array]"===Object.prototype.toString.call(t.data)?t.data.map(function(t){return a["default"](t.id,t,e(t.id))}):a["default"](t.data.id,t.data,e(t.data.id)):t.data},headers:function(){return t.headers},config:function(){return t.config}};return i["default"](function(){return t},n)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u),s=n(7),a=r(s);t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e,n){var r={_url:null,customUrl:function(t){return"undefined"==typeof t?this._url:(this._url=t,this)},one:function(t,e){return n.one(t,e)},oneUrl:function(t,e){return this.customUrl(e),this.one(t,null)},all:function(t){return n.all(t)},allUrl:function(t,e){return this.customUrl(e),this.all(t)},save:function(t){return n.put(e,t)},remove:function(t){return n["delete"](t)},url:function(){return n.url()},id:function(){return t},data:function(){return e}};return i["default"](function(){return e},r)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u);t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e,n){var r=n.customUrl&&n.customUrl()?n.customUrl():[n.url(),t,e].join("/"),u=f["default"](r,n()),s={_url:null,customUrl:function(t){return"undefined"==typeof t?this._url:(this._url=t,this)},get:function(t,e){return u.get(t,e).then(function(t){return p["default"](t,function(){return s})})},put:function(t,e){return u.put(t,e).then(function(t){return p["default"](t)})},patch:function(t,e){return u.patch(t,e).then(function(t){return p["default"](t)})},head:function(t,e){return u.head(t,e).then(function(t){return p["default"](t)})},"delete":function(t){return u["delete"](t).then(function(t){return p["default"](t)})},one:function(t,e){return o(t,e,s)},oneUrl:function(t,e){return this.customUrl(e),this.one(t,null)},all:function(t){return a["default"](t,s)},allUrl:function(t,e){return this.customUrl(e),this.all(t)},url:function(){return r}};return s=i["default"](h["default"](u),s)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u),s=n(3),a=r(s),c=n(4),f=r(c),l=n(5),p=r(l),d=n(9),h=r(d);t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){function e(){return t}var n=i["default"](e,{addFullRequestInterceptor:function(e){return t.fullRequestInterceptors().push(e),n},fullRequestInterceptors:function(){return t.fullRequestInterceptors()},addFullResponseInterceptor:function(e){return t.fullResponseInterceptors().push(e),n},fullResponseInterceptors:function(){return t.fullResponseInterceptors()},addRequestInterceptor:function(e){return t.requestInterceptors().push(e),n},requestInterceptors:function(){return t.requestInterceptors()},addResponseInterceptor:function(e){return t.responseInterceptors().push(e),n},responseInterceptors:function(){return t.responseInterceptors()},header:function(e,r){return t.headers()[e]=r,n},headers:function(){return t.headers()}});return n}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o;var u=n(1),i=r(u);t.exports=e["default"]},function(t,e,n){t.exports=n(11)},function(t,e,n){"use strict";var r=n(12),o=n(13),u=n(14),i=n(15),s=n(23);!function(){var t=n(24);t&&"function"==typeof t.polyfill&&t.polyfill()}();var a=t.exports=function c(t){t=o.merge({method:"get",headers:{},transformRequest:r.transformRequest,transformResponse:r.transformResponse},t),t.withCredentials=t.withCredentials||r.withCredentials;var e=[i,void 0],n=Promise.resolve(t);for(c.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),c.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n.success=function(t){return u("success","then","https://github.com/mzabriskie/axios/blob/master/README.md#response-api"),n.then(function(e){t(e.data,e.status,e.headers,e.config)}),n},n.error=function(t){return u("error","catch","https://github.com/mzabriskie/axios/blob/master/README.md#response-api"),n.then(null,function(e){t(e.data,e.status,e.headers,e.config)}),n},n};a.defaults=r,a.all=function(t){return Promise.all(t)},a.spread=n(29),a.interceptors={request:new s,response:new s},function(){function t(){o.forEach(arguments,function(t){a[t]=function(e,n){return a(o.merge(n||{},{method:t,url:e}))}})}function e(){o.forEach(arguments,function(t){a[t]=function(e,n,r){return a(o.merge(r||{},{method:t,url:e,data:n}))}})}t("delete","get","head"),e("post","put","patch")}()},function(t,e,n){"use strict";var r=n(13),o=/^\)\]\}',?\n/,u={"Content-Type":"application/x-www-form-urlencoded"};t.exports={transformRequest:[function(t,e){return r.isFormData(t)?t:r.isArrayBuffer(t)?t:r.isArrayBufferView(t)?t.buffer:!r.isObject(t)||r.isFile(t)||r.isBlob(t)?t:(!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]="application/json;charset=utf-8"),JSON.stringify(t))}],transformResponse:[function(t){if("string"==typeof t){t=t.replace(o,"");try{t=JSON.parse(t)}catch(e){}}return t}],headers:{common:{Accept:"application/json, text/plain, */*"},patch:r.merge(u),post:r.merge(u),put:r.merge(u)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"}},function(t,e){"use strict";function n(t){return"[object Array]"===v.call(t)}function r(t){return"[object ArrayBuffer]"===v.call(t)}function o(t){return"[object FormData]"===v.call(t)}function u(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function i(t){return"string"==typeof t}function s(t){return"number"==typeof t}function a(t){return"undefined"==typeof t}function c(t){return null!==t&&"object"==typeof t}function f(t){return"[object Date]"===v.call(t)}function l(t){return"[object File]"===v.call(t)}function p(t){return"[object Blob]"===v.call(t)}function d(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function h(t,e){if(null!==t&&"undefined"!=typeof t){var r=n(t)||"object"==typeof t&&!isNaN(t.length);if("object"==typeof t||r||(t=[t]),r)for(var o=0,u=t.length;u>o;o++)e.call(null,t[o],o,t);else for(var i in t)t.hasOwnProperty(i)&&e.call(null,t[i],i,t)}}function m(){var t={};return h(arguments,function(e){h(e,function(e,n){t[n]=e})}),t}var v=Object.prototype.toString;t.exports={isArray:n,isArrayBuffer:r,isFormData:o,isArrayBufferView:u,isString:i,isNumber:s,isObject:c,isUndefined:a,isDate:f,isFile:l,isBlob:p,forEach:h,merge:m,trim:d}},function(t,e){"use strict";t.exports=function(t,e,n){try{console.warn("DEPRECATED method `"+t+"`."+(e?" Use `"+e+"` instead.":"")+" This method will be removed in a future release."),n&&console.warn("For more information about usage see "+n)}catch(r){}}},function(t,e,n){(function(e){"use strict";t.exports=function(t){return new Promise(function(r,o){try{"undefined"!=typeof window?n(17)(r,o,t):"undefined"!=typeof e&&n(17)(r,o,t)}catch(u){o(u)}})}}).call(e,n(16))},function(t,e){function n(){c=!1,i.length?a=i.concat(a):f=-1,a.length&&r()}function r(){if(!c){var t=setTimeout(n);c=!0;for(var e=a.length;e;){for(i=a,a=[];++f<e;)i[f].run();f=-1,e=a.length}i=null,c=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function u(){}var i,s=t.exports={},a=[],c=!1,f=-1;s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];a.push(new o(t,e)),1!==a.length||c||setTimeout(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=u,s.addListener=u,s.once=u,s.off=u,s.removeListener=u,s.removeAllListeners=u,s.emit=u,s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(t,e,n){"use strict";var r=n(12),o=n(13),u=n(18),i=n(19),s=n(20),a=n(21),c=n(22);t.exports=function(t,e,n){var f=a(n.data,n.headers,n.transformRequest),l=o.merge(r.headers.common,r.headers[n.method]||{},n.headers||{});o.isFormData(f)&&delete l["Content-Type"];var p=new(XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP");p.open(n.method.toUpperCase(),u(n.url,n.params),!0),p.onreadystatechange=function(){if(p&&4===p.readyState){var r=s(p.getAllResponseHeaders()),o=-1!==["text",""].indexOf(n.responseType||"")?p.responseText:p.response,u={data:a(o,r,n.transformResponse),status:p.status,statusText:p.statusText,headers:r,config:n};(p.status>=200&&p.status<300?t:e)(u),p=null}};var d=c(n.url)?i.read(n.xsrfCookieName||r.xsrfCookieName):void 0;if(d&&(l[n.xsrfHeaderName||r.xsrfHeaderName]=d),o.forEach(l,function(t,e){f||"content-type"!==e.toLowerCase()?p.setRequestHeader(e,t):delete l[e]}),n.withCredentials&&(p.withCredentials=!0),n.responseType)try{p.responseType=n.responseType}catch(h){if("json"!==p.responseType)throw h}o.isArrayBuffer(f)&&(f=new DataView(f)),p.send(f)}},function(t,e,n){"use strict";function r(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}var o=n(13);t.exports=function(t,e){if(!e)return t;var n=[];return o.forEach(e,function(t,e){null!==t&&"undefined"!=typeof t&&(o.isArray(t)||(t=[t]),o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),n.push(r(e)+"="+r(t))}))}),n.length>0&&(t+=(-1===t.indexOf("?")?"?":"&")+n.join("&")),t}},function(t,e,n){"use strict";var r=n(13);t.exports={write:function(t,e,n,o,u,i){var s=[];s.push(t+"="+encodeURIComponent(e)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(u)&&s.push("domain="+u),i===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}},function(t,e,n){"use strict";var r=n(13);t.exports=function(t){var e,n,o,u={};return t?(r.forEach(t.split("\n"),function(t){o=t.indexOf(":"),e=r.trim(t.substr(0,o)).toLowerCase(),n=r.trim(t.substr(o+1)),e&&(u[e]=u[e]?u[e]+", "+n:n)}),u):u}},function(t,e,n){"use strict";var r=n(13);t.exports=function(t,e,n){return r.forEach(n,function(n){t=n(t,e)}),t}},function(t,e,n){"use strict";function r(t){var e=t;return i&&(s.setAttribute("href",e),e=s.href),s.setAttribute("href",e),{href:s.href,protocol:s.protocol?s.protocol.replace(/:$/,""):"",host:s.host,search:s.search?s.search.replace(/^\?/,""):"",hash:s.hash?s.hash.replace(/^#/,""):"",hostname:s.hostname,port:s.port,pathname:"/"===s.pathname.charAt(0)?s.pathname:"/"+s.pathname}}var o,u=n(13),i=/(msie|trident)/i.test(navigator.userAgent),s=document.createElement("a");o=r(window.location.href),t.exports=function(t){var e=u.isString(t)?r(t):t;return e.protocol===o.protocol&&e.host===o.host}},function(t,e,n){"use strict";function r(){this.handlers=[]}var o=n(13);r.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},r.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},r.prototype.forEach=function(t){o.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=r},function(t,e,n){var r;(function(t,o,u,i){/*!
		 * @overview es6-promise - a tiny implementation of Promises/A+.
		 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
		 * @license   Licensed under MIT license
		 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
		 * @version   2.3.0
		 */
	(function(){"use strict";function s(t){return"function"==typeof t||"object"==typeof t&&null!==t}function a(t){return"function"==typeof t}function c(t){return"object"==typeof t&&null!==t}function f(t){Y=t}function l(t){Q=t}function p(){var e=t.nextTick,n=t.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(n)&&"0"===n[1]&&"10"===n[2]&&(e=o),function(){e(y)}}function d(){return function(){K(y)}}function h(){var t=0,e=new et(y),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function m(){var t=new MessageChannel;return t.port1.onmessage=y,function(){t.port2.postMessage(0)}}function v(){return function(){setTimeout(y,1)}}function y(){for(var t=0;W>t;t+=2){var e=ot[t],n=ot[t+1];e(n),ot[t]=void 0,ot[t+1]=void 0}W=0}function _(){try{var t=n(27);return K=t.runOnLoop||t.runOnContext,d()}catch(e){return v()}}function g(){}function b(){return new TypeError("You cannot resolve a promise with itself")}function w(){return new TypeError("A promises callback cannot return that same promise.")}function x(t){try{return t.then}catch(e){return at.error=e,at}}function I(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function j(t,e,n){Q(function(t){var r=!1,o=I(n,e,function(n){r||(r=!0,e!==n?O(t,n):R(t,n))},function(e){r||(r=!0,q(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,q(t,o))},t)}function T(t,e){e._state===it?R(t,e._result):e._state===st?q(t,e._result):U(e,void 0,function(e){O(t,e)},function(e){q(t,e)})}function A(t,e){if(e.constructor===t.constructor)T(t,e);else{var n=x(e);n===at?q(t,at.error):void 0===n?R(t,e):a(n)?j(t,e,n):R(t,e)}}function O(t,e){t===e?q(t,b()):s(e)?A(t,e):R(t,e)}function E(t){t._onerror&&t._onerror(t._result),C(t)}function R(t,e){t._state===ut&&(t._result=e,t._state=it,0!==t._subscribers.length&&Q(C,t))}function q(t,e){t._state===ut&&(t._state=st,t._result=e,Q(E,t))}function U(t,e,n,r){var o=t._subscribers,u=o.length;t._onerror=null,o[u]=e,o[u+it]=n,o[u+st]=r,0===u&&t._state&&Q(C,t)}function C(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,u=t._result,i=0;i<e.length;i+=3)r=e[i],o=e[i+n],r?S(n,r,o,u):o(u);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return ct.error=n,ct}}function S(t,e,n,r){var o,u,i,s,c=a(n);if(c){if(o=P(n,r),o===ct?(s=!0,u=o.error,o=null):i=!0,e===o)return void q(e,w())}else o=r,i=!0;e._state!==ut||(c&&i?O(e,o):s?q(e,u):t===it?R(e,o):t===st&&q(e,o))}function F(t,e){try{e(function(e){O(t,e)},function(e){q(t,e)})}catch(n){q(t,n)}}function k(t,e){var n=this;n._instanceConstructor=t,n.promise=new t(g),n._validateInput(e)?(n._input=e,n.length=e.length,n._remaining=e.length,n._init(),0===n.length?R(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&R(n.promise,n._result))):q(n.promise,n._validationError())}function N(t){return new ft(this,t).promise}function D(t){function e(t){O(o,t)}function n(t){q(o,t)}var r=this,o=new r(g);if(!G(t))return q(o,new TypeError("You must pass an array to race.")),o;for(var u=t.length,i=0;o._state===ut&&u>i;i++)U(r.resolve(t[i]),void 0,e,n);return o}function B(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(g);return O(n,t),n}function L(t){var e=this,n=new e(g);return q(n,t),n}function H(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function X(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function J(t){this._id=mt++,this._state=void 0,this._result=void 0,this._subscribers=[],g!==t&&(a(t)||H(),this instanceof J||X(),F(this,t))}function V(){var t;if("undefined"!=typeof u)t=u;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(t.Promise=vt)}var $;$=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var K,Y,z,G=$,W=0,Q=({}.toString,function(t,e){ot[W]=t,ot[W+1]=e,W+=2,2===W&&(Y?Y(y):z())}),Z="undefined"!=typeof window?window:void 0,tt=Z||{},et=tt.MutationObserver||tt.WebKitMutationObserver,nt="undefined"!=typeof t&&"[object process]"==={}.toString.call(t),rt="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ot=new Array(1e3);z=nt?p():et?h():rt?m():void 0===Z?_():v();var ut=void 0,it=1,st=2,at=new M,ct=new M;k.prototype._validateInput=function(t){return G(t)},k.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},k.prototype._init=function(){this._result=new Array(this.length)};var ft=k;k.prototype._enumerate=function(){for(var t=this,e=t.length,n=t.promise,r=t._input,o=0;n._state===ut&&e>o;o++)t._eachEntry(r[o],o)},k.prototype._eachEntry=function(t,e){var n=this,r=n._instanceConstructor;c(t)?t.constructor===r&&t._state!==ut?(t._onerror=null,n._settledAt(t._state,e,t._result)):n._willSettleAt(r.resolve(t),e):(n._remaining--,n._result[e]=t)},k.prototype._settledAt=function(t,e,n){var r=this,o=r.promise;o._state===ut&&(r._remaining--,t===st?q(o,n):r._result[e]=n),0===r._remaining&&R(o,r._result)},k.prototype._willSettleAt=function(t,e){var n=this;U(t,void 0,function(t){n._settledAt(it,e,t)},function(t){n._settledAt(st,e,t)})};var lt=N,pt=D,dt=B,ht=L,mt=0,vt=J;J.all=lt,J.race=pt,J.resolve=dt,J.reject=ht,J._setScheduler=f,J._setAsap=l,J._asap=Q,J.prototype={constructor:J,then:function(t,e){var n=this,r=n._state;if(r===it&&!t||r===st&&!e)return this;var o=new this.constructor(g),u=n._result;if(r){var i=arguments[r-1];Q(function(){S(r,o,i,u)})}else U(n,o,t,e);return o},"catch":function(t){return this.then(null,t)}};var yt=V,_t={Promise:vt,polyfill:yt};n(28).amd?(r=function(){return _t}.call(e,n,e,i),!(void 0!==r&&(i.exports=r))):"undefined"!=typeof i&&i.exports?i.exports=_t:"undefined"!=typeof this&&(this.ES6Promise=_t),yt()}).call(this)}).call(e,n(16),n(25).setImmediate,function(){return this}(),n(26)(t))},function(t,e,n){(function(t,r){function o(t,e){this._id=t,this._clearFn=e}var u=n(16).nextTick,i=Function.prototype.apply,s=Array.prototype.slice,a={},c=0;e.setTimeout=function(){return new o(i.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(i.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},e.setImmediate="function"==typeof t?t:function(t){var n=c++,r=arguments.length<2?!1:s.call(arguments,1);return a[n]=!0,u(function(){a[n]&&(r?t.apply(null,r):t.call(null),e.clearImmediate(n))}),n},e.clearImmediate="function"==typeof r?r:function(t){delete a[t]}}).call(e,n(25).setImmediate,n(25).clearImmediate)},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){},function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,e){"use strict";t.exports=function(t){return function(e){t.apply(null,e)}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e,n,r){return r=void 0!==r?!!r:!1,function(o,u){if(r)try{o=JSON.parse(o)}catch(i){}for(var s in t)o=t[s](o,u,e,n);if(!r)try{o=JSON.stringify(o)}catch(i){}return o}}function u(t){var e={backend:t,setBackend:function(t){return this.backend=t,s["default"](function(){return t},this)},request:function(t,e){return-1!==["post","put","patch"].indexOf(e.method)&&(e.transformRequest=[o(e.requestInterceptors||[],e.method,e.url)],delete e.requestInterceptors),e.transformResponse=[o(e.responseInterceptors||[],e.method,e.url,!0)],delete e.responseInterceptors,this.backend(e).then(function(t){var n=e.fullResponseInterceptors;for(var r in n){var o=n[r](t.data,t.headers,e.method,e.url);o.data&&(t.data=o.data),o.headers&&(t.headers=o.headers)}return t})}};return s["default"](function(){return t},e)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=u;var i=n(1),s=r(i);t.exports=e["default"]}])});

/***/ }
/******/ ])
});
;