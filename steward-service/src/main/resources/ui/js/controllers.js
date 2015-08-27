var stewardControllers = angular.module('stewardControllers',
		[ 'jsonFormatter' ]);

stewardControllers.controller('JourneysControl', [
		'$scope',
		'Journeys']);

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