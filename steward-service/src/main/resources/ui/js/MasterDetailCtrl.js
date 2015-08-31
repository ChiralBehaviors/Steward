var myApp = angular.module('myApp', [ "restangular"]);

var stewardUri = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";


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

myApp
	.controller(
	'JourneyMasterDetailCtrl',
	[
		'$scope',
		'Restangular',
		function ($scope, Restangular) {
			var Steward = Restangular.one('/graphql').one('workspace').all(encodeURIComponent(stewardUri));
			var stepsQuery = '{ Journey( id: "$id") { steps {id name description} }';
			var journeysQuery = '{ InstancesOfJourney { name id description } }';

			$scope.listOfJourneys = null;
			$scope.selectedJourney = null;

			var request = {query: journeysQuery};
			Steward
				.post(request)
				.then(
				function (data) {
					$scope.listOfJourneys = data.InstancesOfJourney;

					if ($scope.listOfJourneys.length > 0) {
						$scope.selectedJourney = $scope.listOfJourneys[0].id;
						$scope.loadSteps();
					}
				});

			$scope.selectJourney = function (val) {
				$scope.selectedJourney = val.id;
				$scope.loadSteps();
			};

			$scope.loadSteps = function () {
				$scope.listOfSteps = null;
				var request = {query: stepsQuery.replace('$id', $scope.selectedJourney)};
				Steward.post(request).then(function (data) {
					$scope.listOfSteps = data.Journey.steps;
				});
			};

			$scope.createStep = function() {
				var createStepQuery = "mutation m ($name: String, $description: String, $journey: String) " +
                    "{ CreateStep (state: {setName: $name, setDescription: $description, addJourney: $journey}){ name }";
                //var createStepQuery = "mutation m ($name: String, $description: String) " +
                //    "{ CreateStep (state: {setName: $name, setDescription: $description}){ id }";

                var params = {'journey': $scope.selectedJourney,
                    'name': $scope.stepName,
                    'description': $scope.stepDescription
                };
				var request = {query: createStepQuery, variables: params};

				Steward.post(request).then(function (data) {
					$scope.loadSteps();
				});
			}
		}]);