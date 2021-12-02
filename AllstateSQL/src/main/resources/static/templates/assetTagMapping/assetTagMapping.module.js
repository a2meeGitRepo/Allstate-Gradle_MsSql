(function() {
	'use strict';

	angular
	.module('myApp.assetTagMapping', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.assetTagMapping', {
					url : "/assetTagMapping",
					views : {
						"sub" : {
							templateUrl : "templates/assetTagMapping/assetTagMapping.html",
							controller : "AssetTagMappingController as vm"
						}
					}
				})
			});

})();