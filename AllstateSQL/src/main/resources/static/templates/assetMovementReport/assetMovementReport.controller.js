(function() {
	'use strict';

	angular.module('myApp.assetMovementReport').controller('AssetMovementReportController', AssetMovementReportController);

	AssetMovementReportController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$filter'];
	
	/* @ngInject */
	function AssetMovementReportController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$filter) {
		var assetRegistationUrl  = ApiEndpoint.url+"assetRegistation";
		var reportUrl  = ApiEndpoint.url+"report";

		var vm = angular.extend(this, {
			reports:[],
			generateReport:generateReport,
			clear:clear,
			exportTableToExcel:exportTableToExcel
			
		});
		function exportTableToExcel(tableID, filename = ''){
		    var downloadLink;
		    var dataType = 'application/vnd.ms-excel';
		    var tableSelect = document.getElementById(tableID);
		    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
		    
		    // Specify file name
		    filename = filename?filename+'.xls':'excel_data.xls';
		    
		    // Create download link element
		    downloadLink = document.createElement("a");
		    
		    document.body.appendChild(downloadLink);
		    
		    if(navigator.msSaveOrOpenBlob){
		        var blob = new Blob(['\ufeff', tableHTML], {
		            type: dataType
		        });
		        navigator.msSaveOrOpenBlob( blob, filename);
		    }else{
		        // Create a link to the file
		        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
		    
		        // Setting the file name
		        downloadLink.download = filename;
		        
		        //triggering the function
		        downloadLink.click();
		    }
		}

		(function activate() {
			//loadAssets();
			
			$scope.showExport=false
			$scope.showButton=true
		})();
		
		/*$scope.file="AssetMovementReport"
			vm.labels={'emoloyeeCode': 'Employee Code ', 'fName': 'First Name','lName': 'Last Name','uhfCode':'Card No','contactNo':'contactNo','emailId':'EmailId','addedBy':'AddedBy','addedDate':'AddedDate'}*/
		$scope.file="AssetMovementReport"
			vm.labels={'assetType': 'Asset Type','assetRegistation.asset.assetName': 'Asset Name', 'assetRegistation.epc': 'EPC','fromZone.zoneName': 'From  Zone','toZone.zoneName':'To Zone','readDatetime':'Movement Date Time'}
		
		$scope.newExcel= function(){
			
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		/*function loadAssets(){
			var msg=""
			 var url =assetRegistationUrl+"/getAllAsset";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.assets = response.data;
			console.log("assets: "+JSON.stringify(vm.assets))
			
			
		});
	}*/
		
		/*function getRegisterTags(asset){
			var msg=""
			 var url =assetRegistationUrl+"/getMacAddsByAsset?assetid="+asset.assetId;
			genericFactory.getAll(msg,url).then(function(response) {
			vm.tags = response.data;
			console.log("tags : "+JSON.stringify(vm.tags ))
			
			
		});
	}*/
			function generateReport(report){
				$rootScope.loader=true;
				if(report==undefined||report.movementDate==""){
				$scope.movementDateErr=true;
					return;
				}else{
					$scope.assetErr=false;
				}
				
				
				var msg=""
					 var url =reportUrl+"/getZoneMovementReportByDate";
					genericFactory.add(msg,url,report).then(function(response) {
					vm.reports = response.data;
					console.log("report: "+JSON.stringify(vm.reports))
					
					$rootScope.loader=false;
				});
				
			}
		
			function clear(){
				$scope.report={}
				vm.reports=[]
			}

	
	}
})();
