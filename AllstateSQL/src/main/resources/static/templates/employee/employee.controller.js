(function() {
	'use strict';

	angular.module('myApp.employee')
	.controller('EmployeeController', EmployeeController);
	EmployeeController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function EmployeeController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		var emailUrl = ApiEndpoint.url+"email";
		var employeeUrl = ApiEndpoint.url+"employee";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			cancle:cancle,
			edit:edit,
			cancleDepartment:cancleDepartment,
			addNewDepartment:addNewDepartment,
			saveDepartment:saveDepartment,
			changeStatus:changeStatus,
			loadEmployees:loadEmployees,
			perPage : 10,
			total_count:100,
			pageno:1,
			serachText:"",
			upload:upload,
			uploadSave:uploadSave,
			mailSend:mailSend
		});

		(function activate() {
			$scope.employee={};
			$scope.alertType=false;
			loadEmployees();
		
		})();


		var myvar = '<style>'+
		'*{'+
		'    margin: 0px;'+
		'    padding: 0px;'+
		'    box-sizing: border-box;'+
		'}'+
		'/* .container {'+
		'    width: 720px;'+
		'    display: flex;'+
		'    align-items: center;'+
		'    justify-content: center;'+
		'} */'+
		'.logodiv {'+
		'    background: #3226ae;'+
		'    height: 100px;'+
		'    display: flex;'+
		'    align-items: center;'+
		'    justify-content: center;'+
		'    border-bottom: 5px solid rgb(50, 38, 174, 0.5);'+
		'}'+
		'.logodiv div{'+
		'    padding: 10px;'+
		'    display: flex;'+
		'    align-items: center;'+
		'    justify-content: center;'+
		'}'+
		'.logo {'+
		'    width: 30%;'+
		'    background: #ffff;'+
		'    border: 1px solid rgb(50, 38, 140, 0.5);'+
		'    border-radius: 40px;'+
		'    padding: 5px;'+
		'}'+
		'.welcomediv {'+
		'    background: linear-gradient(#3226ae, #433f72);'+
		'    position: relative;'+
		'    height: 100%;'+
		'    display: block;'+
		'}'+
		'.welcomeimgdiv{'+
		'   display: flex;'+
		'   justify-content: center;'+
		'   align-items: center;'+
		'}'+
		'.welcomimg{'+
		'    width: 60%;'+
		'    height: 60%;'+
		'}'+
		'.welcometext{'+
		'    display: flex;'+
		'    align-items:baseline;'+
		'    justify-content:left;'+
		'    color: #ffff;'+
		'}'+
		'.welcometext h1 {'+
		'    font-size: 7vh;'+
		'}'+
		'.welcometext p {'+
		'    color: #ffff;'+
		'}'+
		'.logininfo {'+
		'    display: block;'+
		'    align-items: center;'+
		'    justify-content: center;'+
		'    text-align: center;'+
		'    color: #ffff;'+
		'}'+
		'.logininfo button{'+
		'   width: 80px;'+
		'   height: 30px;'+
		'   margin-bottom: 20px;'+
		'   color: #ffff;'+
		'   background-color: #3226ae;'+
		'   border: 2px solid #ffff;'+
		'   border-radius: 40px;'+
		'   box-shadow: 0px 0px 5px 5px #3226ae;'+
		'}'+
		''+
		''+
		'</style>'+
		' <div class="container">'+
		'        <div class="row logodiv">'+
		'            <div class="col-12">'+
		'                <img src="images/allstateHR1.png" alt="logo" srcset="" class="logo">'+
		'            </div>'+
		'        </div>'+
		'        <div class="row welcomediv">'+
		'            <div class="col-12 welcomeimgdiv">'+
		'                <img src="images/welcom.png" alt="" srcset="" class="welcomimg">'+
		'            </div>'+
		'            <div class="col-12 welcometext">'+
		'                <h1>'+
		'                    WELCOME JOHN.<br>'+
		'                    <small>'+
		'                        Thanks For signing up. We think you\'ll love it here.'+
		'                    </small>'+
		'                </h1>'+
		'              '+
		'            </div>'+
		'            <div class="col-12 mt-3 logininfo">'+
		'                <P >'+
		'                    Your are register successfully. <br>'+
		'                    To login your account use following login credence. <br>'+
		'                    user name:- john <br>'+
		'                    password:- Sddesa214dd'+
		'                </P>'+
		'                <button>'+
		'                    Login'+
		'                </button>'+
		'            </div>'+
		'        </div>'+
		'    </div>';
			


		function mailSend(){
			var mailDetials={}
			mailDetials.recipient="dattatray.bodhale@a2mee.com"
			mailDetials.subject="TEST Mail "
				mailDetials.message= myvar
			console.log("mailDetials.message: "+JSON.stringify(mailDetials.message))
			
				var msg="New Department Added Sucessfully"
				 var url =emailUrl+"/sendMail";
				genericFactory.add(msg,url,mailDetials).then(function(response) {
					
					loadDepartments();
					$scope.addNewDepartment=false;
					$scope.department={}	
				//	toastr.success("New Department Added Sucessfully");
			});
			
		}
		
		
		
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadEmployees();
			
		}
		
		
		function add(){
			$scope.addNew=true;
			loadDepartments()
			$scope.addNewDepartment=false;
		
		}
		function edit(employee){
			$scope.addNew=true;
			vm.employee=employee;
			
			console.log("employee: "+JSON.stringify(vm.employee))
			loadDepartments()
			$scope.addNewDepartment=false;
		
		}
		function cancle(){
			$scope.addNew=false;
			$scope.diabledSaveButton=true
		}
		function cancleDepartment(){
			$scope.addNewDepartment=false;
			$scope.diabledSaveButton=true
		}
		function upload(){
			$scope.addNew=false;
			$scope.uploadTab=true;
		}
		function changeStatus(employee){
			if(employee.active==1){
				employee.active=2
			}else{
				employee.active=1
			}

			var msg="Employee status updated successfully"
			 var url =employeeUrl+"/addNewEmployee";
			genericFactory.add(msg,url,employee).then(function(response) {
		
					
		});
		}
		function loadDepartments(){
			var msg=""
				 var url =employeeUrl+"/getAllDepartments";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.departments = response.data;
			//	console.log("department: "+JSON.stringify(vm.departments))
								
			});
		}
		function addNewDepartment(){
			$scope.addNewDepartment=true;
			
		}
		
		function loadEmployees(){
			
			var url=""
				var urlCount=""
					var msg=""
					if(vm.serachText==""||vm.serachText==undefined){
						url=employeeUrl+"/getEmployeeByLimit/"+vm.pageno+"/"+vm.perPage;
						urlCount=employeeUrl+"/getEmployeeCount"
					}else{
						url=employeeUrl+"/getEmployeeByLimitAndSearch?searchText="+vm.serachText+"&pageNo="+vm.pageno+'&perPage='+vm.perPage;
						urlCount=employeeUrl+"/getEmployeeCountAndSearch?searchText="+vm.serachText;
					}
					genericFactory.getAll(msg,url).then(function(response) {
						vm.employees = response.data;
						
						console.log("employees: "+JSON.stringify(vm.employees))
										
					});
					
					genericFactory.getAll(msg,urlCount).then(function(response) {
						vm.assetCount = response.data;
						vm.total_count= response.data;
						console.log("assetCount: "+JSON.stringify(vm.assetCount))
										
					});
					
		}
		
		function save(employee){
			$scope.diabledSaveButton=true
			console.log("employee "+JSON.stringify(employee))
			if(employee=="{}"||employee.department==undefined){
				$scope.deptalrt=true;
				return;
			}else{
				$scope.deptalrt=false;
			}
			
			if(employee.employeeName==undefined){
				$scope.empName=true;
				return;
			}else{
				$scope.empName=false;
			}
			
			if(employee.employeeNo==undefined){
				$scope.empNo=true;
				return;
			}else{
				$scope.empNo=false;
			}
			
			if(employee.uhfCode==undefined){
				$scope.uhfNo=true;
				return;
			}else{
				$scope.uhfNo=false;
			}
			
			/*if(employee.mobileNo!=undefined){
				console.log("Mob Length "+employee.mobileNo.length)
				if(employee.mobileNo.length !=10){
					$scope.invalidMoNo=true;
					return;
				}else{
					$scope.invalidMoNo=false;
				}
				
			}*/
			//return;
			employee.active=1;
			employee.addedDate=new Date();
			employee.addedBy=vm.user;
			employee.updDatetime=new Date();
			var msg="New Employee Added Sucessfully"
			 var url =employeeUrl+"/addNewEmployee";
				genericFactory.add(msg,url,employee).then(function(response) {
					loadEmployees();
					$scope.addNew=false;
					$scope.employee={}
					$scope.diabledSaveButton=false
					//toastr.success("New Employee Added Sucessfully");
			});
		}
			
	
	
		function saveDepartment(department){
			
		if(department==undefined){
			$scope.depatName=true
			console.log("Department NAME ")
			return;
		}

			department.active=1;
			department.addedDate=new Date();
			department.addedBy=vm.user
			department.updDatetime=new Date()
			console.log("Department "+JSON.stringify(department))
			var msg="New Department Added Sucessfully"
				 var url =employeeUrl+"/addNewDepartment";
				genericFactory.add(msg,url,department).then(function(response) {
					
					loadDepartments();
					$scope.addNewDepartment=false;
					$scope.department={}	
				//	toastr.success("New Department Added Sucessfully");
			});

		}
		function uploadSave(){
			$scope.diabledSaveButton=true
			var file = document.getElementById('uploadEmployee').files[0];
			

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
			var url = employeeUrl + "/uploadEmployee";
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
				loadEmployees();
			}, function errorCallback(response) {
		    	$('.loading').hide();
				//window.alert("File upload - unsuccessfull!");
				//init();
				toastr.error('Upload....', 'UnSuccesful !!');
				$scope.uploadTab=false;
				loadEmployees();
				$scope.diabledSaveButton=true
					    });

			angular.element("input[type='file']").val(null);
		}
	}
})();
