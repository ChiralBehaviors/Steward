var myApp = angular.module('myApp', [ "phantasm" ]);

var stewardUri = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";

// Force AngularJS to call our JSON Web Service with a 'GET' rather than an
// 'OPTION'
// Taken from: http://better-inter.net/enabling-cors-in-angular-js/
myApp.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

myApp.service("Journeys", [
		'WorkspacePhantasm',
		'PhantasmRelative',
		function(WorkspacePhantasm, PhantasmRelative) {
			this.instances = function() {
				return WorkspacePhantasm.facetInstances(stewardUri, "Interval",
						"kernel|IsA", "Journey");
			};

			this.instance = function(journey) {
				var instance = PhantasmRelative.instance(journey);
				return WorkspacePhantasm.facetInstance(stewardUri, "Interval",
						"kernel|IsA", "Journey", instance);
			};
		} ]);

myApp.filter('sumByKey', function() {
	return function(data, key) {
		if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
			return 0;
		}
		var sum = 0;
		for (var i = data.length - 1; i >= 0; i--) {
			sum += parseInt(data[i][key]);
		}
		return sum;
	};
});

myApp.filter('customSum', function() {
	return function(listOfProducts, key) {
		// Count how many items are in this step
		var total = 0;
		angular.forEach(listOfProducts, function(product) {
			// alert(product + "." + key);
			total += eval("product." + key);
		});
		return total;
	};
});

myApp.filter('countItemsInStep', function() {
	return function(listOfItems) {
		// Count how many items are in this step
		var total = 0;
		angular.forEach(listOfItems, function(item) {
			total += item.quantity;
		});
		return total;
	};
});

myApp.filter('stepTotal', function() {
	return function(listOfItems) {
		// Calculate the total value of a particular Step
		var total = 0;
		angular.forEach(listOfItems, function(item) {
			total += item.quantity * item["unit price"];
		});
		return total;
	};
});

myApp.controller('MasterDetailCtrl', [ '$scope', 'Journeys',
		function($scope, Journeys) {
			$scope.listOfJourneys = null;
			$scope.selectedJourney = null;

			var selection = [ ";a=Journey Name" ];
			Journeys.instances().get({
				//select : selection
			}).then(function(data) {
				console.log(data);
				$scope.listOfJourneys = data.instances;

				if ($scope.listOfJourneys.length > 0) {
					console.log("list of journeys");
					$scope.selectedJourney = $scope.listOfJourneys[0]["@id"];
					$scope.loadSteps();
				}
			});

			$scope.selectJourney = function(val) {
				$scope.selectedJourney = val["@id"];
				$scope.loadSteps();
			};

			$scope.loadSteps = function() {
				$scope.listOfSteps = null;

				var selection = [ "steps;a=name" ];
				Journeys.instance($scope.selectedJourney).get({
					//select : selection
				}).then(function(data) {
					$scope.listOfSteps = data.steps;
					console.log($scope.listOfSteps);
				});
			};
		} ]);
