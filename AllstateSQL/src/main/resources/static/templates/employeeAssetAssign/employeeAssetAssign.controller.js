(function() {
	'use strict';

	angular.module('myApp.employeeAssetAssign').controller('EmployeeAssetAssignController', EmployeeAssetAssignController);

	EmployeeAssetAssignController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function EmployeeAssetAssignController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var employeeUrl = ApiEndpoint.url+"employee";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			empAssets:[],
			add:add,
			getAvailableAssetByassetType:getAvailableAssetByassetType,
			addAsset:addAsset,
			saveAll:saveAll,
			remove:remove
		});

		(function activate() {
			$scope.alertType=false;
			getEmployeeAssetAssign();
		
		})();
		
		function loadEmployees(){
				var msg=""
				 var url =employeeUrl+"/getActiveEmployeesList";
				console.log("URL "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.employees = response.data;
				console.log("Employeee ::"+JSON.stringify(vm.employees))
						
			});
		}
		function getAvailableAssetByassetType(assetType){
			var msg=""
				 var url =assetRegistationUrl+"/getAvailableAssetByassetType?assetType="+assetType;
				console.log("URL "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.assets = response.data;
				console.log("assets ::"+JSON.stringify(vm.assets))
						
			});
		}
		function getEmployeeAssetAssign(){
			var msg=""
				 var url =employeeUrl+"/listEmployeeAssetAssign";
				console.log("URL "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.empAssetsAssigns = response.data;
				console.log("empAssetsAssign ::"+JSON.stringify(vm.empAssetsAssigns))
						
			});
		}
		
		 function add (){
			 $scope.addNew=true
			 $scope.showTable=true
				loadEmployees();
		 }
		 
		 function addAsset(){
			 
			 if($scope.employee==undefined){
				 $scope.emp=true;
				 return
			 }else{
				 $scope.emp=false;
			 }
			 if($scope.assetType==undefined){
				 $scope.assetTypealert=true;
				 return
			 }else{
				 $scope.assetTypealert=false;
			 }
			 if($scope.assetReg==undefined){
				 $scope.asset=true;
				 return
			 }else{
				 $scope.asset=false;
			 }
		
			if(vm.empAssets.length!==0){
				 angular.forEach(vm.empAssets, function(item) {
						if( item.assetRegistation.assetTagRegistationId==$scope.assetReg.assetTagRegistationId ){
							alert("AlreadyExit")
						}
						else{
							 var empAsset={};
							 empAsset.employee=$scope.employee;
							 empAsset.assetRegistation=$scope.assetReg;
							 empAsset.assignBy=userDetail
							 empAsset.dateOfAssign=new Date();
							 empAsset.updDatetime=new Date();
							 empAsset.statusBit=1
							 vm.empAssets.push(empAsset);
						}
						});
			}else{
				 var empAsset={};
				 empAsset.employee=$scope.employee;
				 empAsset.assetRegistation=$scope.assetReg;
				 empAsset.assignBy=userDetail
				 empAsset.dateOfAssign=new Date();
				 empAsset.updDatetime=new Date();
				 empAsset.statusBit=1
				 vm.empAssets.push(empAsset);
			}
			$scope.assetReg="";
			getAvailableAssetByassetType($scope.assetType);
			
		 
		 }
		 function remove(index){
			 vm.empAssets.splice(index,1)
		 }
		 function saveAll(){
			 
			 
			 var msg="Asset assign sucessfully to employee"
				 var url =employeeUrl+"/assetEmployeeAssign";
				console.log("URL "+url)
				genericFactory.add(msg,url,vm.empAssets).then(function(response) {
					 vm.empAssets=[]
					 $scope.addNew=false
					 $scope.showTable=false
					 getEmployeeAssetAssign();
						
			});		
		 }
	}

	
})();
