(function() {
	'use strict';

	angular
	.module('myApp.employeeAssetAssign', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.employeeAssetAssign', {
					url : "/employeeAssetAssign",
					views : {
						"sub" : {
							templateUrl : "templates/employeeAssetAssign/employeeAssetAssign.html",
							controller : "EmployeeAssetAssignController as vm"
						}
					}
				})
			});

})();