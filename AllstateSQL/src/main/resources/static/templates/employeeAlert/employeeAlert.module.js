(function() {
	'use strict';

	angular
	.module('myApp.employeeAlert', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.employeeAlert', {
					url : "/employeeAlert",
					views : {
						"sub" : {
							templateUrl : "templates/employeeAlert/employeeAlert.html",
							controller : "EmployeeAlertController as vm"
						}
					}
				})
			});

})();