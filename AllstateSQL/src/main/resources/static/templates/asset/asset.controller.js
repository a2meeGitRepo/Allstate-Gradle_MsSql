(function() {
	'use strict';

	angular.module('myApp.asset').controller('AssetController', AssetController);

	AssetController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$http'];
	
	/* @ngInject */
	function AssetController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$http) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var commonUrl = ApiEndpoint.url+"common";
		var tagUrl = ApiEndpoint.url+"tag";
		var assetUrl = ApiEndpoint.url+"asset";
		var userDetails = localStorageService.get(ApiEndpoint.userKey);
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			addNew:addNew,
			upload:upload,
			uploadSave:uploadSave,
			cancle:cancle,
			save:save,
			edit:edit,
			assingeTag:assingeTag,
			print:print,
			loadAssets:loadAssets,
			perPage : 10,
			total_count:100,
			pageno:1,
			serachText:"",
			upateTags:upateTags,
			selectAllChk: false,
			print:print,
		});

		(function activate() {
			$scope.alertType=false;
			console.log("pageno: "+vm.pageno)
			console.log("perPage: "+vm.perPage)
			console.log("total_count: "+vm.total_count)
			loadAssets();
			$scope.dataQR="";
		})();
		
		$scope.selectQR = function (index) {
			vm.assets[index].check = !vm.assets[index].check;

			if (vm.assets[index].check == true) {
				$scope.selectedDataCounter++;
			} else
				$scope.selectedDataCounter--;

			if ($scope.selectedDataCounter == vm.assets.length)
				vm.selectAllChk = true;
			else {
				vm.selectAllChk = false;
			}

			
		}
		$scope.selectAllTable = function () {
			for (var index in vm.assets) {
				vm.assets[index].check = vm.selectAllChk;
				console.log("SEL "+JSON.stringify(vm.assets[index]))
			}
		
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
		function addNew(){
			$scope.addNew=true;
			$scope.uploadTab=false;
			$scope.viewQRTab=false;
			loadBranch()
			
		}
		function assingeTag(asset){
			vm.asset=asset
			$scope.addNew=false;
			$scope.uploadTab=false;
			$scope.viewQRTab=true;
			loadAvailableTags();
		}
		function cancle(){
			$scope.addNew=false;
			$scope.uploadTab=false;
			$scope.viewQRTab=false;
			vm.asset={};
		
		}
		function upload(){
			$scope.addNew=false;
			$scope.uploadTab=true;
		}
		function edit(asset){
			loadBranch()
			$scope.addNew=true;
			$scope.viewQRTab=false;
			$scope.uploadTab=false;
			vm.asset=asset;
			vm.asset.invoiceDate= new Date(asset.invoiceDate);
			
		}
	//***********************Pagination Start*****************************//
		$scope.searchByPagination=function (search){
			loadAssets();
			
		}
		
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadAssets();
			
		}
		
		function loadAssets(){
			var url=""
			var urlCount=""
			var msg=""
			if(vm.serachText==""||vm.serachText==undefined){
				url=assetUrl+"/getAssetsByLimit/"+vm.pageno+"/"+vm.perPage;
				urlCount=assetUrl+"/getAssetCount"
			}else{
				url=assetUrl+"/getAssetsByLimitAndSearch?searchText="+vm.serachText+"&pageNo="+vm.pageno+'&perPage='+vm.perPage;
				urlCount=assetUrl+"/getAssetCountAndSearch"
			}
			genericFactory.getAll(msg,url).then(function(response) {
				vm.assets = response.data;
				
				console.log("assets: "+JSON.stringify(vm.assets))
								
			});
			
			genericFactory.getAll(msg,urlCount).then(function(response) {
				vm.assetCount = response.data;
				vm.total_count= response.data;
				console.log("assetCount: "+JSON.stringify(vm.assetCount))
								
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
		
		
		function loadBranch(){
			var msg=""
				 var url =commonUrl+"/getAllBranches";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.branches = response.data;
				console.log("branches: "+JSON.stringify(vm.branches))
								
			});
		}
		
		
		
		
		
		
		
		function save(asset){
			$scope.diabledSaveButton=true
			console.log("asset : "+JSON.stringify(asset))
			
			if(asset==undefined||asset.branch==""||asset.branch==null||asset.branch==undefined){
				$scope.branchErr=true
				return;
			}else{
				$scope.branchErr=false
			}
			if(asset.assetType==""||asset.assetType==null){
				$scope.assetTypeErr=true
				return;
			}else{
				$scope.assetTypeErr=false
			}
			if(asset.serialNo==""||asset.serialNo==null){
				$scope.serialNoErr=true
				return;
			}else{
				$scope.serialNoErr=false
			}
		/*	if(asset.assetId==""||asset.assetId==null){
				$scope.assetIdErr=true
				return;
			}else{
				$scope.assetIdErr=false
			}
			*/
			if(asset.status==""||asset.status==null){
				$scope.statusErr=true
				return;
			}else{
				$scope.statusErr=false
			}
			if(asset.make==""||asset.make==null){
				$scope.makeErr=true
				return;
			}else{
				$scope.makeErr=false
			}
			if(asset.model==""||asset.model==null){
				$scope.modelErr=true
				return;
			}else{
				$scope.modelErr=false
			}
		
			
			
			asset.added_by=userDetails.firstName+" "+userDetails.lastName
			var msg=""
			 var url =assetUrl+"/addNewAsset";
				genericFactory.add(msg,url,asset).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					console.log("data :"+JSON.stringify(response.data.code))
					loadAssets();
					$scope.addNew=false;
					$scope.asset={}
					if(response.data.code==200){
						toastr.success(response.data.message);
						
						
					}else{
						toastr.error(response.data.message);
						
					}
					
			});
		}
		function uploadSave(){
			$scope.diabledSaveButton=true
			var file = document.getElementById('uploadAssets').files[0];
			

			if (file == undefined) {
				$scope.uploadErr=true
				return;
			}else{
				$scope.uploadErr=false
			}

			var fileName = file.name;
			var extension = ".xlsx";
			var extension1 = ".xls";
			console.log("Format  "+fileName.includes(extension))

			console.log("Format 1 "+fileName.includes(extension1))
			if(!fileName.includes(extension1)){
				toastr.error('Selected File is not a xlsx or xls');
				return;
			}			

			$('.loading').show();
			var fd = new FormData();
			fd.append('file', file);
			var url = assetUrl + "/uploadAsset";
			console.log("URL :: "+url)
			$http.post(url, fd, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			})
			.then(function successCallback(response) {
				
				$('.loading').hide();
				//window.alert("File uploaded successfully!");
			
				toastr.success('Uploaded....', 'Succesful !!',{ timeOut: 10000 });		
				$scope.uploadTab=false;
				loadAssets();
			}, function errorCallback(response) {
		    	$('.loading').hide();
				//window.alert("File upload - unsuccessfull!");
				//init();
				toastr.error('Upload....', 'UnSuccesful !!');
				$scope.uploadTab=false;
				loadAssets();
				$scope.diabledSaveButton=false
					    });

			angular.element("input[type='file']").val(null);
		}
	function print(){
			
			$scope.printSizeErr=false;
			
		
		
		var selCount=0
		for (var i in vm.assets) {
			if (vm.assets[i].check) {
				selCount++;
			}
		}
		if(selCount==0){
			
			alert("Select atleast one barcode")
				//genericFactory.showAlert(containt);
			return;
		}
		printCode();
			
		console.log(" Caqll to   ")
			
			
			
		}
	 function printCode(){
		 console.log(" Called   ")
			var windowContent = '';
			var count=0
		 angular.forEach(vm.assets,function(value,index){
			console.log(" index  "+index)
							//console.log("SEL "+JSON.stringify(vm.tags))

				if(vm.assets[index].check){
					
					console.log("SEL qq  "+JSON.stringify(vm.assets[index].check))

		    		var idName='print' + index;
					console.log(" idName "+idName)

		    		//var dataUrl = document.getElementById('print' + index).toDataURL();
					var canvas = document.getElementById('print' + index).querySelector('canvas');
					var dataURL = canvas.toDataURL();
		    		//windowContent += '<div style="page-break-after: always"><div style="width:350px;height:180px;border:1px solid"><span style="height:45px;witdh:100px; margin: -75px 0px 0px 5px ;important;"><span style="height:100px;witdh:100px;padding:5px;margin-left:20px" src="'  + dataUrl + '</span></div>';
		    		console.log("dataUrl  :: "+dataURL)
						//12 X 50 
						console.log("SIZE  IN 12 50 cut ")
				windowContent+=	'<div style="page-break-after: always ;important;margin:10px;margin-top:20px" ><div style="width:132px;height:56px;"><img src="'  + dataURL + '"></div></div>'
						

					
					

		    	}
				
				
         
     })
   
			var popupWinindow = window.open('','_blank','width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			popupWinindow.document.write('<html><body onload="window.print()">' + windowContent + '</html>');
			popupWinindow.document.write('<style> @page {  margin: 15;} </style>');
			popupWinindow.document.close();
		//	savePrintedCode()
	    
		
	 }	
	/*function print() {
			
			var innerContents = document.getElementById('printableArea').innerHTML;
		//	innerContents = '<div><qr text="'+voucherPvmsMap.qr_code+'" type-number="2" correction-level="correctionLevel" size="50" input-mode="inputMode" image="image"></qr><br><span>'+voucherPvmsMap.qr_code+'</span></div>';
			var popupWinindow = window
					.open(
							'',
							'_blank',
							'width=350,height=200,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			popupWinindow.document.open();
			
			
			popupWinindow.document.write('<html><head><title> QR Code Print </title>');
			popupWinindow.document.write('</head><body onload="window.print()">');
			
		        //Append the external CSS file.
		    popupWinindow.document.write('<link rel="stylesheet" href="css/root.css">');
		  //  popupWinindow.document.write('<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets_login/css/main.css">');
				//Append the DIV contents.
			popupWinindow.document.write(innerContents);
		
		    popupWinindow.document.write('</body></html>');
		    popupWinindow.document
			.write('<style> @page {  margin: 10px;} </style>');
			popupWinindow.document.close();
			
		}*/
		
	}

	
})();
