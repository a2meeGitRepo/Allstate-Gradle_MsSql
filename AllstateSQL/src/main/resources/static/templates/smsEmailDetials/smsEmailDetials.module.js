(function() {
	'use strict';

	angular
	.module('myApp.smsEmailDetials', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.smsEmailDetials', {
					url : "/smsEmailDetials",
					views : {
						"sub" : {
							templateUrl : "templates/smsEmailDetials/smsEmail.html",
							controller : "SmsEmailDetialsController as vm"
						}
					}
				})
			});

})();