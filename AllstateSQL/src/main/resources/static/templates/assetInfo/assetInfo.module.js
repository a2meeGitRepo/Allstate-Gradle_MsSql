(function() {
	'use strict';

	angular
	.module('myApp.assetInfo', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.assetInfo/:id', {
					url : "/assetInfo/:id",
					views : {
						"sub" : {
							templateUrl : "templates/assetInfo/assetInfo.html",
							controller : "AssetInfoController as vm"
						}
					}
				})
			});

})();