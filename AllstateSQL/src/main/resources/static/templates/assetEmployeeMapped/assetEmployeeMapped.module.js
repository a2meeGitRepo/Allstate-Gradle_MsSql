(function() {
	'use strict';

	angular
	.module('myApp.assetEmployeeMapped', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.assetEmployeeMapped', {
					url : "/assetEmployeeMapped",
					views : {
						"sub" : {
							templateUrl : "templates/assetEmployeeMapped/assetEmployeeMapped.html",
							controller : "AssetEmployeeMappedController as vm"
						}
					}
				})
			});

})();