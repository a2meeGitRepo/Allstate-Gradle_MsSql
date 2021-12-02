(function() {
	'use strict';

	angular
	.module('myApp.zoneDeviceMapped', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.zoneDeviceMapped', {
					url : "/zoneDeviceMapped",
					views : {
						"sub" : {
							templateUrl : "templates/zoneDeviceMapped/zoneDeviceMapped.html",
							controller : "ZoneDeviceMappedController as vm"
						}
					}
				})
			});

})();