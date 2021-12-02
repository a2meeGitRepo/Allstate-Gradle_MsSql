(function() {
	'use strict';

	angular
	.module('myApp.tagRegistation', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.tagRegistation', {
					url : "/tagRegistation",
					views : {
						"sub" : {
							templateUrl : "templates/tagRegistation/tagRegistation.html",
							controller : "TagRegistationController as vm"
						}
					}
				})
			});

})();