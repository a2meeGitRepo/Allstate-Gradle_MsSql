(function() {
	'use strict';

	angular
	.module('myApp.zone', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.zone', {
					url : "/zone",
					views : {
						"sub" : {
							templateUrl : "templates/zone/zone.html",
							controller : "ZoneController as vm"
						}
					}
				})
			});

})();