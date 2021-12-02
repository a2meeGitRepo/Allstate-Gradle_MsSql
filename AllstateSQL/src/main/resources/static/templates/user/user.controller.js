(function() {
	'use strict';

	angular.module('myApp.user').controller('UserController', UserController);

	UserController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function UserController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var userUrl = ApiEndpoint.url+"user";
		var departmentUrl = ApiEndpoint.url+"department";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user : userDetail,
			add:add,
			edit:edit,
			save:save,
			cancle:cancle,
			perPage : 10,
			total_count:0,
			pageno:1,
			changeStatus:changeStatus,
			checkUsername:checkUsername
		
		});

		(function activate() {
			$scope.disabledClick=false
			$window.scrollTo(0,0);
			$scope.viewPass=false;
			$scope.user={}
			$scope.user.user_name=''
			$scope.user.passward=''
			loadAllUsers();
			$scope.inptyp='password';
		
		})();

		
		
		
		vm.labels={fname: 'Fname Heder', lname: 'LName Header', user_name: 'Username Head'}
		// *************************  VALIDATION   *****************************
	
		$scope.capitalLname = function (lname){
			if(lname !='')
				$scope.user.lname=lname.substring(0, 1).toUpperCase()+lname.substring(1)
		}
		$scope.capitalfname = function (fname){
			console.log("First Name "+fname);
			if(fname !='')
				$scope.user.fname=fname.substring(0, 1).toUpperCase()+fname.substring(1)
		}
		
		$scope.viewHide = function(){
			if($scope.viewPass){
				$scope.viewPass=false;
			}else{
				$scope.viewPass=true;
			}
		}
		  
		 

		  $scope.exportExcel = function() {
			  $rootScope.loader=true;
			  var msg='';
			  
			  var url =userUrl+"/getAllUsers"
			  genericFactory.getAll(msg,url).then(function(response) {
				 vm.allUsers=response.data
				  
				
				//  $rootScope.loader=false;
				 setTimeout(function(){
					 $rootScope.loader=false;
					  document.getElementById('btnExport').click();
					  $rootScope.$digest();
					},1000);
				 
					
				});
			  
		    //2 execute the hidden button 
		    

		  }

      function checkUsername(user_name){
    	  var msg="";
    	  var  url =userUrl+"/checkUsername/"+user_name
			genericFactory.getAll(msg,url).then(function(usernameresponse) {
				vm.usernameresponse=usernameresponse
			})
      }
		
		// ******************************************************
		
		
		
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadAllUsers();
			
		}
		
		//list users by limit 
		function loadAllUsers() {
			var msg = null;
			loadTotalCount();// call load count of user by limit 
			var url;
			var subUrl;
			if(userDetail.role.role_id==1){
				subUrl = userUrl+"/listAllUserListByLimitData/";
			}else{
				subUrl = userUrl+"/listAllUserListByLimitDataByDepartment/"+userDetail.department.department_id+"/";
			}
			
			if(vm.perPage==null){
				 url =subUrl+vm.pageno+'/10'
			}else{
				 url =subUrl+vm.pageno+'/'+vm.perPage;
			}
			
			console.log("DAT URL"+url)
			
		/*	
			
			if(vm.perPage==null){
				 url =userUrl+"/listAllUserListByLimitData/"+vm.pageno+'/10'    // url  if perpage is undefine
			}else{
				 url =userUrl+"/listAllUserListByLimitData/"+vm.pageno+'/'+vm.perPage;   // url  if perpage is define
			}*/
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.users = response.data;
				
				
			});
		}
		
		// total users count by limit
		function loadTotalCount(){
			var msg = null;
			var url;
			var subUrl;
			if(userDetail.role.role_id==1){
				subUrl = userUrl+"/listAllUserListByLimitCout/";
			}else{
				subUrl = userUrl+"/listAllUserListByLimitCoutByDepartment/"+userDetail.department.department_id+"/";
			}
			
			if(vm.perPage==null){
				 url =subUrl+vm.pageno+'/10'
			}else{
				 url =subUrl+vm.pageno+'/'+vm.perPage;
			}
			console.log("Count  URL"+url)
			genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("Active"+JSON.stringify(vm.total_count))
				
			});
		}
		
		
		
		function cancle(user){
			
			loadAllUsers();
			
		
				$scope.addRow=false
		}
		function save(user){
			
			console.log("EXIT OL DUSER NAME "+$scope.exitsUname)
			var containt={};
			containt.title="Mandetory"
				
			if(!user.fname || user.fname== ''){
				containt.massage="First name is required"
					genericFactory.showAlert(containt);
				document.getElementById("firstName").focus();
				
				return;
			}
			if(!user.lname || user.lname== ''){
				containt.massage="Last name is required"
					genericFactory.showAlert(containt);
				document.getElementById("lastName").focus();
				
				return;
			}
			if(!user.user_name || user.user_name== ''){
				containt.massage="User name name is required"
					genericFactory.showAlert(containt);
				document.getElementById("uName").focus();
				
				return;
			}
			if(!user.password || user.password== ''){
				containt.massage="Password name is required"
					genericFactory.showAlert(containt);
				document.getElementById("pass").focus();
				
				return;
			}
			
			if(!user.role || user.role== undefined){
				containt.massage="Role name is required"
					genericFactory.showAlert(containt);
				return;
			}
			if(!user.userType || user.userType== undefined){
				containt.massage="User Type name is required"
					genericFactory.showAlert(containt);
				return;
			}
			/*if(!user.department|| user.department== undefined){
				containt.massage="Department name is required"
					genericFactory.showAlert(containt);
				return;
			}*/
			$scope.disabledClick=true
			var msg = null;
			if($scope.savetype=="new"){
				msg ="New User is added..... Successfully!!!"
			} else{
				msg =" User is edited ..... Successfully"
			}
			user.added_by_id=userDetail.user_id
			user.added_by_name=userDetail.fname+" "+userDetail.lname+" - "+userDetail.role.role_name;
			user.add_date=new Date();
			
			console.log("Login User "+JSON.stringify(userDetail))
		if(userDetail.role.role_id !=1){
			user.department= userDetail.department
			
		}else{
			user.active= 1;
		}			
			
			if($scope.savetype=="new"){
				if(vm.usernameresponse.data.code==500){
					containt.massage="User name is aleady exits"
						genericFactory.showAlert(containt);
				
					return;
				}else{	
					var url =userUrl+"/create";
					genericFactory.add(msg,url,user).then(function(response) {
						vm.roles= response.data;
						console.log("User ADDEA"+JSON.stringify(response))
						if(response.code=200){
							$scope.addRow=false
							$scope.user={};
							loadAllUsers();
							$scope.disabledClick=false
						}
					});
					
					}
					
			}else{
				if(user.user_name==$scope.exitsUname){
					var url =userUrl+"/create";
					genericFactory.add(msg,url,user).then(function(response) {
						vm.roles= response.data;
						console.log("User ADDEA"+JSON.stringify(response))
						if(response.code=200){
							$scope.addRow=false
							$scope.user={};
							loadAllUsers();
						}
					});
				}else{	
					if(vm.usernameresponse.data.code==500){
						containt.massage="User name is aleady exits"
							genericFactory.showAlert(containt);
					
						return;
					}else{	
						var url =userUrl+"/create";
						genericFactory.add(msg,url,user).then(function(response) {
							vm.roles= response.data;
							console.log("User ADDEA"+JSON.stringify(response))
							if(response.code=200){
								$scope.disabledClick=false
								$scope.addRow=false
								$scope.user={};
								loadAllUsers();
							}
						});
						
						}		
					
					}
					
			}
				
			
		
			
			
			
			
		}
		function add(){
			
			$scope.user={};
			$scope.savetype="new"
				$scope.user.user_name=''
				$scope.user.passward=''
				$scope.addRow=true
				loadAllRoles();
				loadAllUserTypess();
				loadAllDepartment();
		}
		function edit(user){
			$scope.savetype="edit"
			$scope.exitsUname=user.user_name
			$window.scrollTo(0,0);
			$scope.user=user
			$scope.addRow=true
			loadAllRoles();
			loadAllUserTypess();
			loadAllDepartment();
		}
		
		// load Roles
		function loadAllRoles() {
			var msg = null;
			
			var url =userUrl+"/listAllRoles";
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.roles= response.data;
				console.log("Role"+JSON.stringify(vm.roles))
				
			});
		}
		
		
		// load user type
		function loadAllUserTypess() {
			var msg = null;
			
			var url =userUrl+"/listAllUserType";
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.userTypes= response.data;
				console.log("UserTypes"+JSON.stringify(vm.userTypes))
				
			});
		}
		
		// Load Department 
		function loadAllDepartment() {
			var msg = null;
			
			var url =departmentUrl+"/listAllDepartment";
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.departments= response.data;
				console.log("Department"+JSON.stringify(vm.departments))
				
			});
		}
		//********************************************************
		function changeStatus(user){
			console.log("AVTIVE BEFORE"+user.active);
			var msg;
			if(user.active==0){
				user.active=1
				msg = "User Active successfully.....!!!!";
			}
			else{
				user.active=0;
				msg = "User InActive successfully.....!!!!";
			}
			
			
			var url =userUrl+"/updateUser";
			console.log("AVTIVE AFTER"+user.active);
			genericFactory.add(msg,url,user).then(function(response) {
								loadAllUsers();
			});
		}
		
	}

	
})();
