(function() {
	'use strict';

	angular.module('myApp.allocationReport').controller('AllocationReportController', AllocationReportController);

	AllocationReportController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$filter','table2excel'];
	
	/* @ngInject */
	function AllocationReportController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$filter,table2excel) {
		var assetRegistationUrl  = ApiEndpoint.url+"assetRegistation";
		var reportUrl  = ApiEndpoint.url+"report";
		var employeeUrl  = ApiEndpoint.url+"employee";

		var vm = angular.extend(this, {
			reports:[],
			generateReport:generateReport,
			clear:clear,
			callData:callData,
			exportTableToExcelPackingBox:exportTableToExcelPackingBox
			
		});

		function exportTableToExcelPackingBox(){
			 $("#table2excel").table2excel({
				
				     // exclude CSS class
				  exclude:".noExl",
				   name:"Worksheet Name",
				   filename:"Activity Log",//do not include extension
				 fileext:".xls" // file extension
				
				   });

		}


		(function activate() {
			
			
			$scope.showExport=false
			$scope.showButton=true
		})();
		function callData(reportType){
			if(reportType=="Employee"){
				 loadEmployees();
			}
			if(reportType=="Asset"){
				
			}
		}

		function loadEmployees(){
			var msg=""
				 var url =employeeUrl+"/getAllEmployees";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.employees = response.data;
				console.log("employees: "+JSON.stringify(vm.employees))
								
			});
		}
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
	
			function generateReport(report){
				//$rootScope.loader=true;
				console.log("report: "+JSON.stringify(report))
				 var url ="";
				if(report==undefined||report.reportType==undefined){
				$scope.reportTypeErr=true;
					return;
				}else{
					$scope.reportTypeErr=false;
				}
				if(report.reportType=="Asset"){
					
					
					if(report.spec==undefined){
						$scope.assetErr=true;
							return;
						}else{
							$scope.assetErr=false;
						}
					 var url =reportUrl+"/getAssetWiseAllocationReport?tagCode="+report.spec;
				}else{
					if(report.spec==undefined){
						$scope.empErr=true;
							return;
						}else{
							$scope.empErr=false;
						}
					 var url =reportUrl+"/getEmployeeWiseAllocationReport?empId="+report.spec.employeeId;

				}
				
				var msg=""
					console.log("url : "+url)

					genericFactory.getAll(msg,url).then(function(response) {
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
