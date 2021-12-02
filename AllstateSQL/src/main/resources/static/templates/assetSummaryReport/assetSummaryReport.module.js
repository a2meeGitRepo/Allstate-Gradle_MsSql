(function() {
	'use strict';

	angular
	.module('myApp.assetSummaryReport', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.assetSummaryReport', {
					url : "/assetSummaryReport",
					views : {
						"sub" : {
							templateUrl : "templates/assetSummaryReport/assetSummaryReport.html",
							controller : "AssetSummaryReportController as vm"
						}
					}
				})
			});

})();