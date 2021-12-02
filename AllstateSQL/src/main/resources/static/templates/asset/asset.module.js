(function() {
	'use strict';

	angular
	.module('myApp.asset', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.asset', {
					url : "/asset",
					views : {
						"sub" : {
							templateUrl : "templates/asset/asset.html",
							controller : "AssetController as vm"
						}
					}
				})
			});

})();