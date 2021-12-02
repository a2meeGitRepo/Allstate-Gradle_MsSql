(function() {
	'use strict';

	angular.module('myApp.assetTagMapping').controller('AssetTagMappingController', AssetTagMappingController);

	AssetTagMappingController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$http'];
	
	/* @ngInject */
	function AssetTagMappingController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$http) {
		var assetUrl = ApiEndpoint.url+"asset";
		var tagUrl = ApiEndpoint.url+"tag";
		
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			
			
		});

		(function activate() {
		//	document.getElementById("assetId").focus();
		})();
		$scope.checkAssetId=function(assetId){
			console.log("checkAssetId "+assetId)
			var msg=""
				 var url =assetUrl+"/checkAssetId?assetId="+assetId;
					genericFactory.getAll(msg,url).then(function(response) {
						console.log("resp:"+JSON.stringify(response))
						var resData=response.data
						if(resData.code==200){
							$scope.assetIdErr=false;
							$scope.assetIdVrf=true;
							$scope.assetMan=false
							$scope.assetIdMsg=resData.message
							
							vm.mappAsset=resData.data
							console.log("mappAsset:"+JSON.stringify(vm.mappAsset))
							console.log("mappTag:"+JSON.stringify(vm.mappedTag))

							if(vm.mappedTag==undefined){
								$scope.tagMan=true
							}else{
								$scope.tagMan=false
								callMapping(vm.mappAsset,vm.mappedTag)
									
							}
							
						}else{
							$scope.assetIdMsg=resData.message
							$scope.assetIdErr=true;
							$scope.assetIdVrf=false;
							
							return;
						}
						console.log("data :"+JSON.stringify(response.data.code))
						
						
				});
		}
		
		$scope.checkRfidTag=function(rfidTag){
			console.log("rfidTag "+rfidTag)
			var msg=""
				 var url =tagUrl+"/checkrfidTag?rfidTag="+rfidTag;
					genericFactory.getAll(msg,url).then(function(response) {
						console.log("resp:"+JSON.stringify(response))
						var resData=response.data
						if(resData.code==200){
							$scope.rfidTagErr=false;
							$scope.rfidTagVrf=true;
							$scope.tagMan=false
							$scope.rfidTagMsg=resData.message
							vm.mappedTag=response.data.data
							vm.mappRFID=resData.data.data
							
							console.log("mappAsset:"+JSON.stringify(vm.mappAsset))
							console.log("mappTag:"+JSON.stringify(vm.mappedTag))
							
							
							if(vm.mappAsset==undefined){
								$scope.assetMan=true
							}else{
								$scope.assetMan=false
								
								callMapping(vm.mappAsset,vm.mappedTag)
								
								
								
							}
							
							
							
							
							
							
						}else{
							$scope.rfidTagMsg=resData.message
							$scope.rfidTagErr=true;
							$scope.rfidTagVrf=false;
							return;
						}
						console.log("data :"+JSON.stringify(response.data.code))
						
						
				});
		}
		function upateTags(){
			console.log("Asste "+JSON.stringify(vm.asset));
			console.log("selecteTag "+JSON.stringify(vm.selecteTag.tagCode));
			vm.asset.tagCode=vm.selecteTag.tagCode
			
			var msg=""
				 var url =assetUrl+"/assignedTag";
					genericFactory.add(msg,url,vm.asset).then(function(response) {
						console.log("resp:"+JSON.stringify(response))
						console.log("data :"+JSON.stringify(response.data.code))
						loadAssets();
						$scope.viewQRTab=false;
						$scope.asset={}
						if(response.data.code==200){
							toastr.success(response.data.message);
							
							
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
		}
		
		function callMapping(asset,tag){
			
			console.log("Asset : "+JSON.stringify(asset))
			console.log("Tag : "+JSON.stringify(tag))
			asset.tagCode=tag.tagCode
			var msg=""
				 var url =assetUrl+"/assignedTag";
					genericFactory.add(msg,url,asset).then(function(response) {
						console.log("resp:"+JSON.stringify(response))
						console.log("data :"+JSON.stringify(response.data.code))
					
						
						if(response.data.code==200){
							alert(response.data.message);
							vm.asset={}
							vm.mappedTag={}
							vm.mappRFID={}
							$scope.assetIdErr=false;
							$scope.assetIdVrf=false;
							$scope.assetMan=false
							$scope.rfidTagErr=false;
							$scope.rfidTagVrf=false;
							$scope.tagMan=false
						}else{
							toastr.error(response.data.message);
							
						}
						
				});
			
		}
  //***********************Pagination End *****************************//
		function loadAvailableTags(){
			var msg=""
				 var url =tagUrl+"/getAllAvailableTags";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.availableTags = response.data;
				console.log("availableTags: "+JSON.stringify(vm.availableTags))
								
			});
		}
		
		
		
		
		
		
		
		
	}

	
})();
