(function() {
	'use strict';

	angular
	.module('myApp.tagUpload', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.tagUpload', {
					url : "/tagUpload",
					views : {
						"sub" : {
							templateUrl : "templates/tagUpload/tagUpload.html",
							controller : "TagUploadController as vm"
						}
					}
				})
			});

})();