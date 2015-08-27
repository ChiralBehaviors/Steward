(function() {

	var steward = angular.module('steward', [ 'ngRoute', 'myApp']);


	steward.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/journey', {
			templateUrl : 'MasterDetailDemo.html',
			controller : 'JourneyMasterDetailCtrl'
		}).otherwise({
			redirectTo : '/journey'
		});
	} ]);

})();