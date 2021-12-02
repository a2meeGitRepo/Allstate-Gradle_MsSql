/**
 * @ Dattatray Bodhale
 * Jan 30, 2020
 */
package com.allstateMsSql.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.allstateMsSql.dto.Status;
import com.allstateMsSql.model.Asset;
import com.allstateMsSql.model.Department;
import com.allstateMsSql.model.Employee;
import com.allstateMsSql.services.EmployeeServices;


@RestController
@CrossOrigin("*")
@RequestMapping("employee")
public class EmployeeController {
	
	
	@Autowired
	EmployeeServices employeeServices;
	
	@RequestMapping(value = "/addNewEmployee", method = RequestMethod.POST)
	public @ResponseBody Status addNewEmployee(@RequestBody Employee employee) {
		Status status =new Status();
		try {
			employeeServices.addNewEmployee(employee);
			
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/getAllEmployees", method = RequestMethod.GET)
	public @ResponseBody List<Employee> getAllEmployees() {
		Status status =new Status();
		List<Employee> list =null;
		try {
			list=employeeServices.getAllEmployees();
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return list;
	}
	@RequestMapping(value = "/getActiveEmployeesList", method = RequestMethod.GET)
	public @ResponseBody List<Employee> getActiveEmployeesList() {
		Status status =new Status();
		List<Employee> list =null;
		try {
			list=employeeServices.getActiveEmployeesList();
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return list;
	}

	@RequestMapping(value = "/getEmployeeByLimit/{page_no}/{item_per_page}", method = RequestMethod.GET)
	public @ResponseBody List<Employee> getEmployeeByLimit(@PathVariable("page_no") int page_no,@PathVariable("item_per_page") int item_per_page) {
		List<Employee> list= new  ArrayList<Employee>();
		try {	
			list=employeeServices.getEmployeeByLimit(page_no,item_per_page);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@RequestMapping(value = "/getEmployeeByLimitAndSearch", method = RequestMethod.GET)
	public @ResponseBody List<Employee> getEmployeeByLimitAndSearch(@RequestParam("searchText") String searchText,@RequestParam("pageNo") int pageNo,@RequestParam("perPage") int perPage) {
		List<Employee> list= new  ArrayList<Employee>();
		try {	
			
			list=employeeServices.getEmployeeByLimitAndSearch(searchText,pageNo,perPage);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	@RequestMapping(value = "/getEmployeeCount", method = RequestMethod.GET)
	public @ResponseBody int  getEmployeeCount() {
		int  supplierCount= 0;
		try {
			supplierCount= employeeServices.getEmployeeCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierCount;
	}
	@RequestMapping(value = "/getEmployeeCountAndSearch", method = RequestMethod.GET)
	public @ResponseBody int  getEmployeeCountAndSearch(@RequestParam("searchText") String searchText) {
		int  supplierCount= 0;
		try {
			supplierCount= employeeServices.getEmployeeCountAndSearch(searchText);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierCount;
	}
	@RequestMapping(value = "/uploadEmployee", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity uploadEmployee(ModelMap model, @ModelAttribute(value = "file") MultipartFile file,
			HttpServletRequest request) {
		try {
			if (!(file == null)) {
				if (file.isEmpty()) {
				} else {
					System.out.println(file.getOriginalFilename());
					try {
						File dir = new File(System.getProperty("catalina.base"), "uploads");
						File uplaodedFile = new File(dir + file.getOriginalFilename());
						file.transferTo(uplaodedFile);
						FileInputStream excelFile = new FileInputStream(uplaodedFile);
						Workbook workbook = new XSSFWorkbook(excelFile);
						Sheet datatypeSheet = workbook.getSheetAt(0); 
						int i = 1;
						while (i <= datatypeSheet.getLastRowNum()) { 

							XSSFRow row = null;
							row = (XSSFRow) datatypeSheet.getRow(i++);
							String str = row.getCell(0).toString();
							if(str.length()==0) {
								continue;
							}
							Employee employee= new Employee();
							Department department = new Department();
							Asset asset = new Asset();
							System.out.println("ROW 0  "+row.getCell(0).toString());
							System.out.println("ROW 1  "+row.getCell(1).toString());
							System.out.println("ROW 2  "+row.getCell(2).toString());
							System.out.println("ROW 3  "+row.getCell(3).toString());
							String employeeName=row.getCell(1).toString();
							String EmployeeNo=row.getCell(2).toString();
							String email=row.getCell(3).toString();
							String mobile=row.getCell(4).toString();
							
							String uhfCode=row.getCell(5).toString();
							String depName=row.getCell(6).toString();
							
							
							Optional<Employee> optionalEmp = employeeServices.getEmployeeByNo(EmployeeNo);

							Optional<Department> optional = employeeServices.getDepartmentByName(depName);
						
							 if (optional.isPresent()) {
								 department= optional.get();
								
							}else{
								Department department2= new Department();
								department2.setDepartmentName(depName);
								department=employeeServices.saveDepartment(department2);
							}
							 if (optionalEmp.isPresent()) {
								employee= optionalEmp.get();
							}
							 
							 employee.setActive(1);
							 //employee.setAddedBy(addedBy);
							 employee.setAddedDate(new Date());
							 employee.setDepartment(department);
							 employee.setEmail(email);
							 employee.setEmployeeName(employeeName);
							 employee.setEmployeeNo(EmployeeNo);
							 employee.setMobileNo(mobile);
							 employee.setUhfCode(uhfCode);
							// employee
							 employeeServices.addNewEmployee(employee);
						}


						workbook.close();
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	//********************************* DEPARTMENT START ******************************************//
	
	@RequestMapping(value = "/addNewDepartment", method = RequestMethod.POST)
	public @ResponseBody Status addNewDepartment(@RequestBody Department department) {
		Status status =new Status();
		try {
			//System.out.println("addNewDepartment  "+department.getDepartmentName());
			employeeServices.addNewDepartment(department);
			
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/getAllDepartments", method = RequestMethod.GET)
	public @ResponseBody List<Department> getAllDepartments() {
		Status status =new Status();
		List<Department> list =null;
		try {
			list=employeeServices.getAllDepartments();
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return list;
	}
	
	//*********************************DEPARTMENT END ******************************************//
	
}
