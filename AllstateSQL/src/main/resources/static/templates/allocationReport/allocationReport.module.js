(function() {
	'use strict';

	angular
	.module('myApp.allocationReport', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.allocationReport', {
					url : "/allocationReport",
					views : {
						"sub" : {
							templateUrl : "templates/allocationReport/allocationReport.html",
							controller : "AllocationReportController as vm"
						}
					}
				})
			});

})();