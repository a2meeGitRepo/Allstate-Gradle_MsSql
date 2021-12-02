(function() {
	'use strict';

	angular.module('myApp.tagRegistation').controller('TagRegistationController', TagRegistationController);

	TagRegistationController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function TagRegistationController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var zonedeviceUrl=ApiEndpoint.url+"zonedevice"
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			add:add,
			tagRegistations:[],
			getAssetByType:getAssetByType,
			getAssetTags:getAssetTags,
			setAssetDetials:setAssetDetials,
			checkEpc:checkEpc,
			saveRegistration:saveRegistration,
			cancle:cancle
		});

		(function activate() {
			loadAssetRegistration();
			
		})();
		function loadAssetRegistration () {
		     var msg=""
			 var url =assetRegistationUrl+"/listAllAssetRegister";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.assetsRegistrations = response.data;
			console.log("assetsRegistrations: "+JSON.stringify(vm.assetsRegistrations))
			
			
		});
	}
		function add(){
			$scope.addNew=true;
		//	loadZones();
			$scope.tagRgistration={}
		//	$scope.tagRgistration.defaultZone={}
			
		}
		function loadZones(type) {
			console.log("ASSET TYPE "+type)
		     var msg=""
			 var url =zonedeviceUrl+"/getAllActiveZonesByTypes?type="+type
			
			
			genericFactory.getAll(msg,url).then(function(response) {
			vm.zones = response.data;
			console.log("zones: "+JSON.stringify(vm.zones))
			
			
		});
	}
		function cancle(){
			
			$scope.addNew=false;
			$scope.assetDetialTab=false;
			$scope.assetDetials={}
			$scope.tagRgistration={}
		}
		function getAssetByType(type){
			loadZones(type);
			var msg=""
				 var url =assetRegistationUrl+"/getActiveAssetListByAssetType?assetType="+type;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.assets = response.data;
				//console.log("assets: "+JSON.stringify(vm.assets))
				
				
			});
				//$scope.tagRgistration.defaultZone.id=1

		}
		function setAssetDetials(asset){
			
			$scope.assetDetials=asset;
			$scope.assetDetialTab=true;
			console.log("asset  "+JSON.stringify(asset))
		}
		function getAssetTags (quantity,assetType){

			if($scope.tagRgistration.defaultZone==undefined){
				alert("Select Zone ")
				$scope.tagRgistration.quantity=""
				return;
			}
			
			vm.tagRegistations=[]
			$scope.showTable=true;
			console.log("quantity  "+quantity)
				console.log("assetType  "+assetType)
			if(quantity!=null){
				for(var i=1;i<=quantity;i++){
					var tagReg={}
					tagReg.assetId=$scope.assetDetials.assetId;
					tagReg.epc="";
					vm.tagRegistations.push(tagReg)
					
				}
			}
			
		
			
			
			var msg=""
				 var url =assetRegistationUrl+"/getUnAssingedTagsByAssetTypeAndQuantity?assetType="+assetType+"&quantity="+quantity;
			console.log("url  "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.unAssingedTags = response.data;
				 console.log("unAssingedTags"+JSON.stringify(vm.unAssingedTags));
				 angular.forEach(vm.unAssingedTags, function(value, key){
					 vm.tagRegistations[key].epc=value.tagCode
					 var url =assetRegistationUrl+"/checkEpcByAsset?assetType="+assetType+"&epc="+value.tagCode;
						genericFactory.getAll(msg,url).then(function(response) {
						vm.status = response.data;
						console.log("STATUS :: "+JSON.stringify(vm.status))
						
							vm.tagRegistations[key].defaultZone={}
							vm.tagRegistations[key].defaultZone.id=$scope.tagRgistration.defaultZone.id;
						
						
						vm.tagRegistations[key].status=vm.status;
						vm.tagRegistations[key].addedBy=userDetail;
						})
				   })
				
				
			});
		}
		function checkEpc(ecp,type,index){
			/* console.log("ecp"+JSON.stringify(ecp));
			 console.log("type"+JSON.stringify(type));
			 console.log("index"+JSON.stringify(index));*/
			 	 var msg=""
				 var url =assetRegistationUrl+"/checkEpcByAsset?assetType="+type+"&epc="+ecp;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.status = response.data;
				 console.log("vm.status"+JSON.stringify(vm.status));
				vm.tagRegistations[index].status=vm.status
				 console.log("vm.tagRegistations "+JSON.stringify(vm.tagRegistations));
				});
		}
		
		function saveRegistration(){
			var msg="";
		console.log("TagRegistations"+JSON.stringify(vm.tagRegistations));
		if(vm.tagRegistations[0].defaultZone===undefined){
			console.log("SELECT DEFAUL ZONE ")
			return;
		}
	/*		
		$scope.validEpcs=true;
			angular.forEach(vm.tagRegistations, function(item) {
				 if(item.status.code=500){
					
					 $scope.validEpcs=false;
				 }
				});*/
		/*	console.log("VALID EPCS "+$scope.validEpcs)
			if($scope.validEpcs){*/
				var url =assetRegistationUrl+"/assetTagRegistations";
				genericFactory.add(msg,url,vm.tagRegistations).then(function(response) {
					vm.status = response.data;
					loadAssetRegistration();
					$scope.addNew=false;
					$scope.assetDetials={}
					$scope.tagRgistration.quantity=''
				});
				
		//	}else{ alert("Check EPC")}
			
		}
		
	}

	
})();
