function isObject(t){return t===Object(t)}function relativize(t){for(var e in t){var n=t[e];if(isObject(n))relativize(n);else if(r.test(n)){var o=document.createElement("a");o.href=n,t[e]=o.pathname}}}var northwindControllers=angular.module("northwindControllers",[]),r=new RegExp("^(?:[a-z]+:)?//","i");northwindControllers.controller("FacetInstancesListCtrl",["$scope","$http","$routeParams",function(t,e,r){e.get("/json-ld/facet/"+r.ruleform+"/"+r.classifier+"/"+r.classification).success(function(e){for(var r in e)relativize(e[r]);t.facetInstances=e})}]),northwindControllers.controller("FacetListCtrl",["$scope","$http","$routeParams",function(t,e,r){e.get("/json-ld/facet/"+r.ruleform).success(function(e){t.facets=e["@graph"]})}]),northwindControllers.controller("FacetRuleformsListCtrl",["$scope","$http",function(t,e){e.get("/json-ld/facet").success(function(e){relativize(e),t.facetRuleforms=e})}]),northwindControllers.controller("FacetDetailCtrl",["$scope","$http","$routeParams",function(t,e,r){e.get("/json-ld/facet/"+r.ruleform+"/"+r.classifier+"/"+r.classification).success(function(e){t.facet=e})}]),northwindControllers.controller("FacetInstanceDetailCtrl",["$scope","$http","$routeParams",function(t,e,r){e.get("/json-ld/facet/"+r.ruleform+"/"+r.classifier+"/"+r.classification+"/"+r.instance).success(function(e){relativize(e),t.facetInstance=e})}]);