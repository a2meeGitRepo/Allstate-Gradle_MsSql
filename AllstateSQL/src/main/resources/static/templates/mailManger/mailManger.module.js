(function() {
	'use strict';

	angular
	.module('myApp.mailManger', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.mailManger', {
					url : "/mailManger",
					views : {
						"sub" : {
							templateUrl : "templates/mailManger/mailManger.html",
							controller : "MailMangerController as vm"
						}
					}
				})
			});

})();