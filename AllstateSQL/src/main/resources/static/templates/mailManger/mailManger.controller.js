(function() {
	'use strict';

	angular.module('myApp.mailManger').controller('MailMangerController', MailMangerController);

	MailMangerController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$http'];
	
	/* @ngInject */
	function MailMangerController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$http) {
		var emailUrl = ApiEndpoint.url+"email";
	
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			changeStatuts:changeStatuts,
			save:save,
			addNew:addNew,
			cancle:cancle,
			saveNewReciever:saveNewReciever,
			addNewReciever:addNewReciever,
			changeStatutsemailReceiver:changeStatutsemailReceiver,
			editEmailReceiver:editEmailReceiver,
			editEmailSender:editEmailSender
				
			
		});

		(function activate() {
			loadSenderMailList()
			loadRecieverMailList()
		})();
		function addNew(){
			$scope.addNewTab=true
		}
		function editEmailReceiver(emailReceiver){
			$scope.addNewRecieverTab=true
			vm.email=emailReceiver
			
			
		}
		function editEmailSender(emailSender){
			$scope.addNewTab=true
			vm.email=emailSender
			
			
		}
		function addNewReciever(){
			console.log("hoi")
			$scope.addNewRecieverTab=true
		}
		function cancle(){
			$scope.addNewTab=false
			$scope.addNewRecieverTab=false
		}
		function changeStatuts(emailSender){
			
			var msg=""
				 var url =emailUrl+"/changeStatusEmail";
					genericFactory.add(msg,url,emailSender).then(function(response) {
						console.log("resp:"+JSON.stringify(response))
						console.log("data :"+JSON.stringify(response.data.code))
						loadSenderMailList();
						$scope.addNew=false;
						$scope.asset={}
						if(response.data.code==200){
							toastr.success(response.data.message);
							
							
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
			
		}
		
		
		function save(email){
		
			console.log("email:"+JSON.stringify(email))
			if(email==undefined||email.host==""||email.host==undefined){
				$scope.hostErr=true
				return;
			}else{
				$scope.hostErr=false
			}
			
			if(email.port==""||email.port==undefined){
				$scope.portErr=true
				return;
			}else{
				$scope.portErr=false
			}
			if(email.userName==""||email.userName==undefined){
				$scope.userNameErr=true
				return;
			}else{
				$scope.userNameErr=false
			}
			if(email.fromMail==""||email.fromMail==undefined){
				$scope.fromMailErr=true
				return;
			}else{
				$scope.fromMailErr=false
			}
			
			if(email.password==""||email.password==undefined){
				$scope.passwordErr=true
				return;
			}else{
				$scope.passwordErr=false
			}
			
			var msg=""
				 var url =emailUrl+"/addEmailDetial";
					genericFactory.add(msg,url,email).then(function(response) {
						
						console.log("data :"+JSON.stringify(response.data.code))
						loadSenderMailList();
						$scope.addNewTab=false;
						vm.email={}
						if(response.data.code==200){
							toastr.success(response.data.message);
							
							
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
		}
		function changeStatutsemailReceiver(email){
			
			var msg=""
				 var url =emailUrl+"/changeStatusEmailReceiver";
					genericFactory.add(msg,url,email).then(function(response) {
						
						console.log("data :"+JSON.stringify(response.data.code))
						loadRecieverMailList();
						$scope.addNewTab=false;
						vm.email={}
						if(response.data.code==200){
							toastr.success(response.data.message);
							
							
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
			
		}
		function loadSenderMailList(){
			var msg=""
				 var url =emailUrl+"/getAllEmailSenderDetials";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.emailSenders = response.data;
				console.log("emailSenders: "+JSON.stringify(vm.emailSenders))
								
			});
		}
		
		function loadRecieverMailList(){
			var msg=""
				 var url =emailUrl+"/getAllEmailReceiver";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.emailReceivers = response.data;
				console.log("emailReceivers: "+JSON.stringify(vm.emailReceivers))
								
			});
		}
		
		function saveNewReciever(email){
			
			console.log("email:"+JSON.stringify(email))
			if(email==undefined||email.name==""||email.name==undefined){
				$scope.nameErr=true
				return;
			}else{
				$scope.nameErr=false
			}
			
		
			if(email.emailId==""||email.emailId==undefined){
				$scope.emailIdErr=true
				return;
			}else{
				$scope.emailIdErr=false
			}
			
			
			
			var msg=""
				 var url =emailUrl+"/addEmailReceiver";
					genericFactory.add(msg,url,email).then(function(response) {
						
						console.log("data :"+JSON.stringify(response.data.code))
						loadRecieverMailList();
						$scope.addNewRecieverTab=false;
						vm.email={}
						if(response.data.code==200){
							toastr.success(response.data.message);
							
							
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
		}
		
		
	}

	
})();
