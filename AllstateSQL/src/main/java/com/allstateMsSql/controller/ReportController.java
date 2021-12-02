package com.allstateMsSql.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.model.AssetEmployeeAssigned;
import com.allstateMsSql.services.AssetServices;


@RestController
@CrossOrigin("*")
@RequestMapping("report")
public class ReportController {
	
	@Autowired
	AssetServices assetServices;
	

	@RequestMapping(value = "/getEmployeeWiseAllocationReport", method = RequestMethod.GET)
	public @ResponseBody List<AssetEmployeeAssigned> getEmployeeWiseAllocationReport(@RequestParam("empId") int empId) {
		List<AssetEmployeeAssigned> list= new  ArrayList<AssetEmployeeAssigned>();
		try {	
			
			list=assetServices.getEmployeeWiseAllocationReport(empId);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
