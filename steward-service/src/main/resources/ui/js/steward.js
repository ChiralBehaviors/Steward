(function() {

	var steward = angular.module('steward', [ 'ngRoute',
			'stewardControllers', 'phantasm' ]);

	steward.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when("/journey/:instance", {
			templateUrl : 'partials/journey-detail.html',
			controller : 'JourneyDetailControl'
		});
		$routeProvider.when("/journeys", {
			templateUrl : 'partials/journeys.html',
			controller : 'JourneysControl'
		});
		$routeProvider.otherwise({
			redirectTo : "/journeys"
		});
	} ]);

	steward
			.service(
					"Journeys",
					[
							"WorkspacePhantasm",
							function(WorkspacePhantasm) {
								var stewardUri = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
								this.instances = function() {
									return WorkspacePhantasm.facetInstances(
											stewardUri, "Interval",
											"kernel|IsA", "Journey");
								};
								this.instance = function(ref) {
									return WorkspacePhantasm.facetInstance(
											stewardUri, "Interval",
											"kernel|IsA", "Journey", ref);
								};
							} ]);
})();