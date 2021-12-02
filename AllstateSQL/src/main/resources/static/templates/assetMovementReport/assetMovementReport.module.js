(function() {
	'use strict';

	angular
	.module('myApp.assetMovementReport', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.assetMovementReport', {
					url : "/assetMovementReport",
					views : {
						"sub" : {
							templateUrl : "templates/assetMovementReport/assetMovementReport.html",
							controller : "AssetMovementReportController as vm"
						}
					}
				})
			});

})();