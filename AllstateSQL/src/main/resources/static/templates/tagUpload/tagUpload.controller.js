(function() {
	'use strict';

	angular.module('myApp.tagUpload').controller('TagUploadController', TagUploadController);

	TagUploadController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','fileUpload','$http'];
	
	/* @ngInject */
	function TagUploadController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,fileUpload,$http) {
		var tagUrl = ApiEndpoint.url+"tag";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			tags:[],
			save:save,
			cancle:cancle,
			changeStatus:changeStatus,
			add:add,
			perPage : 10,
			total_count:100,
			pageno:1,
			serachText:"",
			loadTags:loadTags,
			upload:upload,
			uploadSave:uploadSave,
			selectAllChk: false,
			print:print,
		});

		(function activate() {
			$scope.alertType=false;
			loadTags();
			$rootScope.loader=false;
		})();
		
		$scope.selectQR = function (index) {
			vm.tags[index].check = !vm.tags[index].check;

			if ($scope.tags[index].check == true) {
				$scope.selectedDataCounter++;
			} else
				$scope.selectedDataCounter--;

			if ($scope.selectedDataCounter == vm.tags.length)
				vm.selectAllChk = true;
			else {
				vm.selectAllChk = false;
			}

			
		}
		$scope.selectAllTable = function () {
			for (var index in vm.tags) {
				vm.tags[index].check = vm.selectAllChk;
				console.log("SEL "+JSON.stringify(vm.tags[index]))
			}
		
		}
		
		function add(){
			$scope.addNew=true;
		}
		function upload(){
			$scope.addNew=false;
			$scope.uploadTab=true;
		}
	function cancle(){
		$scope.tag={}
		$scope.addNew=false;
	}
	
	$scope.pagination = {
	        current: 1
	    };
	
	// page changed 
	$scope.pageChanged = function(pageNo){
		vm.pageno=pageNo;
		loadTags();
		
	}
		
		
		function loadTags(){
			var url=""
				var urlCount=""
				var msg=""
				if(vm.serachText==""||vm.serachText==undefined){
					url=tagUrl+"/getTagsByLimit/"+vm.pageno+"/"+vm.perPage;
					urlCount=tagUrl+"/getTagCount"
				}else{
					url=tagUrl+"/getTagsByLimitAndSearch?searchText="+vm.serachText+"&pageNo="+vm.pageno+'&perPage='+vm.perPage;
					urlCount=tagUrl+"/getTagCountAndSearch"
				}
				genericFactory.getAll(msg,url).then(function(response) {
					vm.tags = response.data;
					
					console.log(" tags : "+JSON.stringify(vm.tags))
									
				});
				
				genericFactory.getAll(msg,urlCount).then(function(response) {
					
					vm.total_count= response.data;
					console.log("assetCount: "+JSON.stringify(vm.assetCount))
									
				});
		}
		
		function save(tag){
			$scope.diabledSaveButton=true
			console.log("TAG"+JSON.stringify(userDetail))
			if(tag==undefined||tag.tagCode==undefined){
				$scope.tagCodeErr=true;
				return;
			}else{
				$scope.tagCodeErr=false;
			}
			tag.addedBy=userDetail
			var msg=""
			 var url =tagUrl+"/addNewTags";
				genericFactory.add(msg,url,tag).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					console.log("data :"+JSON.stringify(response.data.code))
					//loadTags();
					$scope.addNew=false;
					$scope.diabledSaveButton=false
					vm.tag={}
					if(response.data.code==200){
						toastr.success(response.data.message);
						
						
					}else{
						toastr.error(response.data.message);
						
					}
					
			});
		}
		
		function changeStatus(tag){
			tag.statusBit=2;
			var msg="Tag status updated sucessfully"
				 var url =assetRegistationUrl+"/updateTag";
				genericFactory.add(msg,url,tag).then(function(response) {
					loadTags();
								
			});
			
			
		}
		
		function uploadSave(){
			
			$scope.diabledSaveButton=true
			
			console.log("diabledSaveButton :: "+$scope.diabledSaveButton)
			var file = document.getElementById('uploadTags').files[0];
			

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
			var url = tagUrl + "/uploadTags";
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
				loadTags();
			}, function errorCallback(response) {
		    	$('.loading').hide();
				//window.alert("File upload - unsuccessfull!");
				//init();
				toastr.error('Upload....', 'UnSuccesful !!');
				$scope.uploadTab=false;
				loadTags();
				$scope.diabledSaveButton=false
					    });

			angular.element("input[type='file']").val(null);
		}
		
		
		function print(){
			
			$scope.printSizeErr=false;
			
		
		
		var selCount=0
		for (var i in vm.tags) {
			if (vm.tags[i].check) {
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
			 
			 //  custome 28
			 console.log(" Called   ")
				var windowContent = '';
				var count=0
			 angular.forEach(vm.tags,function(value,index){
				console.log(" index  "+index)
								//console.log("SEL "+JSON.stringify(vm.tags))

					if(vm.tags[index].check){
						
						console.log("SEL qq  "+JSON.stringify(vm.tags[index].check))

			    		var idName='print' + index;
						console.log(" idName "+idName)

			    		//var dataUrl = document.getElementById('print' + index).toDataURL();
						var canvas = document.getElementById('print' + index).querySelector('canvas');
						var dataURL = canvas.toDataURL();
			    		//windowContent += '<div style="page-break-after: always"><div style="width:350px;height:180px;border:1px solid"><span style="height:45px;witdh:100px; margin: -75px 0px 0px 5px ;important;"><span style="height:100px;witdh:100px;padding:5px;margin-left:20px" src="'  + dataUrl + '</span></div>';
			    		console.log("dataUrl  :: "+dataURL)
							//12 X 50 
							console.log("SIZE  IN 12 50 cut ")
					windowContent+=	'<div style="page-break-after: always ;important;margin:10px;margin-top:20px" ><div style="width:132px;height:56px;"><img src="'  + dataURL + '"><br/><span style="font: 35px Arial, sans-serif;margin-left:20%;important" class="text-center; "><b></br>'+vm.tags[index].tagCode+'</b></span></div></div>'
							

						
						

			    	}
					
					
             
         })
       
				var popupWinindow = window.open('','_blank','width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
				popupWinindow.document.write('<html><body onload="window.print()">' + windowContent + '</html>');
				popupWinindow.document.write('<style> @page {  margin: 15;} </style>');
				popupWinindow.document.close();
			//	savePrintedCode()
		    
			
		 }	
	}

	
})();
