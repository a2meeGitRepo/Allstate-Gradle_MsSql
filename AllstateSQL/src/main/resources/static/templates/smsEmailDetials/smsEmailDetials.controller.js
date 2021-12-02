(function() {
	'use strict';

	angular.module('myApp.smsEmailDetials').controller('SmsEmailDetialsController', SmsEmailDetialsController);

	SmsEmailDetialsController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function SmsEmailDetialsController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var smsEmailUrl = ApiEndpoint.url+"smsEmail";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			addSMS:addSMS,
			saveSMS:saveSMS,
			cancle:cancle,
			changeStatusSMS:changeStatusSMS,
			editSMS:editSMS,
			deletSMS:deletSMS,
			addEmail:addEmail,
			editEmail:editEmail,
			saveEmail:saveEmail,
			changeStatusEmail:changeStatusEmail,
			deletEmail:deletEmail
			
		});

		(function activate() {
			loadSmsDetials();
			loadEmailDetials();
			
		})();
		
		function cancle(){
			
			$scope.addNewSMS=false;
			$scope.addNewEmail=false;
		
		}
		//******************* ************** SMS Details  Start *************************************************//
		function loadSmsDetials() {
		     var msg=""
			 var url =smsEmailUrl+"/getAllSmsSenders";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.smsDetials = response.data;
			console.log("smsDetials: "+JSON.stringify(vm.smsDetials))
			
			
		});
	}
		
		function loadEmailDetials() {
		     var msg=""
			 var url =smsEmailUrl+"/getAllEmailSenderDetials";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.emailDetials = response.data;
			console.log("emailDetials: "+JSON.stringify(vm.emailDetials))
			
			
		});
	}
		function editSMS(smsDetial){
			window.scrollTo(0, 0);
			$scope.addNewSMS=true;
			$scope.smsDetial=smsDetial;
		}
		function addSMS(){
			$scope.addNewSMS=true;
			
		}

		
		function changeStatusSMS(smsDetial){
			var msg=""
				 var url =smsEmailUrl+"/changeStatusSMS";
				genericFactory.add(msg,url,smsDetial).then(function(response) {
				
				if(response.data.code==200){
					toastr.success(response.data.message);
				}else{
					toastr.error(response.data.message);

				}
				loadSmsDetials();
				
			});
		}
		function deletSMS(smsDetial){
			var msg=""
				 var url =smsEmailUrl+"/deletSmsDetial";
				genericFactory.add(msg,url,smsDetial).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
				}else{
					toastr.error(response.data.message);

				}
				loadSmsDetials();
				
			});
		}
		function saveSMS(smsDetial){
				
			if(smsDetial==undefined||smsDetial.url==""){
				$scope.urlErr=true
				return;
			}else{
				$scope.urlErr=false	
			}
			if(smsDetial.useName==""||smsDetial.useName==undefined){
				$scope.userNameErr=true
				return;
			}else{
				$scope.userNameErr=false	
			}
			
			
			if(smsDetial.password==""||smsDetial.password==undefined){
				$scope.passwordErr=true
				return;
			}else{
				$scope.passwordErr=false	
			}
			
			
			if(smsDetial.senderId==""||smsDetial.senderId==undefined){
				$scope.senderIdErr=true
				return;
			}else{
				$scope.senderIdErr=false	
			}
			
			
			
			
			
			console.log("device: "+JSON.stringify(smsDetial))

			smsDetial.addedBy=	userDetail.firstName+" "+userDetail.lastName;
			smsDetial.addedDate=new Date();
			smsDetial.active=1
			
			var msg=""
				 var url =smsEmailUrl+"/addSmsDetial";
				genericFactory.add(msg,url,smsDetial).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
					$scope.addNew=false;

				}else{
					toastr.error(response.data.message);

				}
				loadSmsDetials();
			});
			
		}
			
		//******************* ************** SMS Details  END *************************************************//
		function addEmail(){
			$scope.addNewEmail=true;
		}
		function editEmail(emailSender){
			window.scrollTo(0, 0);
			$scope.addNewEmail=true;
			$scope.emailSender=emailSender
		}
		
		 function saveEmail(emailSender){
			 if(emailSender==undefined||emailSender.fromMail==""){
					$scope.fromMailErr=true
					return;
				}else{
					$scope.fromMailErr=false	
				}
				if(emailSender.password==""||emailSender.password==undefined){
					$scope.passwordErr=true
					return;
				}else{
					$scope.passwordErr=false	
				}
				
				
				if(emailSender.host==""||emailSender.host==undefined){
					$scope.hostErr=true
					return;
				}else{
					$scope.hostErr=false	
				}
				
				
				if(emailSender.userName==""||emailSender.userName==undefined){
					$scope.userNameErr=true
					return;
				}else{
					$scope.userNameErr=false	
				}
				
				
				
				if(emailSender.port==""||emailSender.port==undefined){
					$scope.portErr=true
					return;
				}else{
					$scope.portErr=false	
				}
				
				if(emailSender.signiture==""||emailSender.signiture==undefined){
					$scope.signitureErr=true
					return;
				}else{
					$scope.signitureErr=false	
				}
				
				
				

				emailSender.addedBy=	userDetail.firstName+" "+userDetail.lastName;
				emailSender.addedDate=new Date();
				emailSender.active=1
				
				var msg=""
					 var url =smsEmailUrl+"/addEmailDetial";
					genericFactory.add(msg,url,emailSender).then(function(response) {
					
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						toastr.success(response.data.message);
						$scope.addNewEmail=false;
						loadEmailDetials();
						$scope.emailSender={}
					}else{
						toastr.error(response.data.message);

					}
					loadEmailDetials();
				});

		 }
		 
		 
		 function changeStatusEmail(emailSender){
				var msg=""
					 var url =smsEmailUrl+"/changeStatusEmail";
					genericFactory.add(msg,url,emailSender).then(function(response) {
					
					if(response.data.code==200){
						toastr.success(response.data.message);
					}else{
						toastr.error(response.data.message);

					}
					loadEmailDetials();
					
				});
			}
			function deletEmail(emailSender){
				var msg=""
					 var url =smsEmailUrl+"/deletEmailDetial";
					genericFactory.add(msg,url,emailSender).then(function(response) {
					
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						toastr.success(response.data.message);
					}else{
						toastr.error(response.data.message);

					}
					loadEmailDetials();
					
				});
			}
	}

	
})();
