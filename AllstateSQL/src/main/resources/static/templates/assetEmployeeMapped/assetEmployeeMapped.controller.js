(function() {
	'use strict';

	angular.module('myApp.assetEmployeeMapped').controller('AssetEmployeeMappedController', AssetEmployeeMappedController);

	AssetEmployeeMappedController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$http'];
	
	/* @ngInject */
	function AssetEmployeeMappedController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$http) {
	
		var assetEmpMappedUrl = ApiEndpoint.url+"assetEmpMapped";
		var assetUrl = ApiEndpoint.url+"asset";
		var employeeUrl = ApiEndpoint.url+"employee";
		var userDetails = localStorageService.get(ApiEndpoint.userKey);
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			pageno:1,
			serachText:"",
			perPage : 10,
			total_count:100,
			addNew:addNew,
			cancle:cancle,
			mappeAsset:mappeAsset,
			transafer:transafer,
			release:release,
			checkEmployee:checkEmployee,
			transfer:transfer
		});

		(function activate() {
			loadAssetsEmployeedMappeds();
		})();
		 function addNew(){
			 vm.mapped={}
			 $scope.addNew=true;
			 $scope.transTab=false;
			 loadEmployees();
			 loadAvailableAsset();
		 }
		 function cancle(){
			 $scope.addNew=false;
			 $scope.transTab=false;
			 vm.mapped={}
		 }
		 function transafer(assetsMappe){
			 $scope.transTab=true;
			 vm.assetsMappe=assetsMappe
			 loadEmployees();
			 $scope.addNew=false;
		 }
		 function transfer(assetsMappe){
			
				if(vm.mapped.newemployee.employeeId==vm.assetsMappe.employee.employeeId){
					$scope.sameEmpErr=true
					console.log("SAME :")
					return;
				}else{
					$scope.sameEmpErr=false
					console.log("DIFF:")
				}
			 
			 var newMapped={}
			 newMapped.newemployee=vm.mapped.newemployee
			 newMapped.assetEmployeeAssigned=vm.assetsMappe
			 
			 
			 console.log("newMapped "+JSON.stringify(newMapped))
				var msg=""
					 var url =assetEmpMappedUrl+"/transferAsset";
						genericFactory.add(msg,url,newMapped).then(function(response) {
							console.log("resp:"+JSON.stringify(response))
							console.log("data :"+JSON.stringify(response.data.code))
							loadAssetsEmployeedMappeds();
							$scope.transTab=false;
							vm.mapped={}
							if(response.data.code==200){
								toastr.success(response.data.message);
								
								
							}else{
								toastr.error(response.data.message);
								
							}
							
					});
			 
		 }
		 function checkEmployee(assetsMappe){
			 console.log("NEW :"+JSON.stringify(vm.mapped))
				console.log("OLD :"+JSON.stringify(vm.assetsMappe))
				if(vm.mapped.newemployee.employeeId==vm.assetsMappe.employee.employeeId){
					$scope.sameEmpErr=true
					console.log("SAME :")
				}else{
					$scope.sameEmpErr=false
					console.log("DIFF:")
				}
		 }
		 function release(assetsMappe){
			 var msg=""
				 var url =assetEmpMappedUrl+"/releaseMappedAsset";
					genericFactory.add(msg,url,assetsMappe).then(function(response) {
						console.log("resp:"+JSON.stringify(response))
						console.log("data :"+JSON.stringify(response.data.code))
						loadAssetsEmployeedMappeds();
						
					
						if(response.data.code==200){
							toastr.success(response.data.message);
							
							
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
		 }
		
		
			function loadEmployees(){
				var msg=""
					 var url =employeeUrl+"/getAllEmployees";
					genericFactory.getAll(msg,url).then(function(response) {
					vm.employees = response.data;
					//console.log("employees: "+JSON.stringify(vm.employees))
									
				});
			}
			
			function loadAvailableAsset(){
				var msg=""
					 var url =assetUrl+"/getAllAvailableTags";
					genericFactory.getAll(msg,url).then(function(response) {
					vm.availablesAssets = response.data;
					console.log("availablesAssets: "+JSON.stringify(vm.availablesAssets))
									
				});
			}
			
		
	//***********************Pagination Start*****************************//
		
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadAssetsEmployeedMappeds();
			
		}
		
		function loadAssetsEmployeedMappeds(){
			var url=""
			var urlCount=""
			var msg=""
			if(vm.serachText==""||vm.serachText==undefined){
				url=assetEmpMappedUrl+"/getAssetEmployeeAssignedByLimit/"+vm.pageno+"/"+vm.perPage;
				urlCount=assetEmpMappedUrl+"/getAssetEmployeeAssignedCount"
			}else{
				url=assetEmpMappedUrl+"/getAssetEmployeeAssignedByLimitAndSearch?searchText="+vm.serachText+"&pageNo="+vm.pageno+'&perPage='+vm.perPage;
				urlCount=assetEmpMappedUrl+"/getAssetEmployeeAssignedCountAndSearch"
			}
			genericFactory.getAll(msg,url).then(function(response) {
				vm.assetsMappes = response.data;
				
				console.log("assetsMappes : "+JSON.stringify(vm.assetsMappes))
								
			});
			
			genericFactory.getAll(msg,urlCount).then(function(response) {
				vm.total_count= response.data;
				console.log("assetCount: "+JSON.stringify(vm.assetCount))
								
			});
			
			
			
			
		}
		
		function mappeAsset(mapped){
			if(mapped==undefined||mapped.employee==undefined){
				$scope.empErr=true
				return;
			}else{
				$scope.empErr=false
			}
			if(mapped.asset==undefined){
				$scope.assetErr=true
				return;
			}else{
				$scope.assetErr=false
			}
			
			
			mapped.mappedBy=userDetails.firstName+" "+userDetails.lastName
			var msg=""
			 var url =assetEmpMappedUrl+"/mappedAsset";
				genericFactory.add(msg,url,mapped).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					console.log("data :"+JSON.stringify(response.data.code))
					loadAssetsEmployeedMappeds();
					$scope.addNew=false;
					vm.mapped={}
					if(response.data.code==200){
						toastr.success(response.data.message);
						
						
					}else{
						toastr.error(response.data.message);
						
					}
					
			});
		}
	
	
		
	}

	
})();
