(function() {
	'use strict';

	angular
	.module('myApp.device', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.device', {
					url : "/device",
					views : {
						"sub" : {
							templateUrl : "templates/device/device.html",
							controller : "DeviceController as vm"
						}
					}
				})
			});

})();