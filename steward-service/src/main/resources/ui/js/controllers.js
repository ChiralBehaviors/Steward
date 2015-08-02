var stewardControllers = angular.module('stewardControllers',
		[ 'jsonFormatter' ]);

stewardControllers.controller('JourneysControl', [
		'$scope',
		'Journeys',
		'PhantasmRelative',
		function($scope, Journeys, PhantasmRelative) {
			Journeys.instances().get().then(
					function(data) {
						var instances = data.instances;
						for ( var key in instances) {
							instances[key]["@id"] = PhantasmRelative
									.instance(instances[key]["@id"]);
						}
						$scope.journeys = instances;
					});
		} ]);

stewardControllers.controller('JourneyDetailControl', [
		'$scope',
		'$routeParams',
		'Journeys',
		function($scope, $routeParams, Journeys) {
			Journeys.instance($routeParams.instance).get().then(
					function(journey) {
						$scope.journey = journey.plain();
					});
		} ]);