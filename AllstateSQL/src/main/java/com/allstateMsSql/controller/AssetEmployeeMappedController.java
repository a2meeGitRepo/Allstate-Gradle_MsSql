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
import org.springframework.expression.spel.ast.OpAnd;
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
import com.allstateMsSql.model.AssetEmployeeAssigned;
import com.allstateMsSql.model.AssetTransaction;
import com.allstateMsSql.model.TransferAssetDto;
import com.allstateMsSql.services.AssetEmployeeMappeServices;
import com.allstateMsSql.services.AssetServices;
import com.allstateMsSql.services.CommonService;



@RestController
@CrossOrigin("*")
@RequestMapping("assetEmpMapped")
public class AssetEmployeeMappedController {
	
	@Autowired
	AssetEmployeeMappeServices assetEmployeeMappeServices;
	@Autowired
	AssetServices 	assetServices;
	@Autowired
	CommonService commonService;

 
	@RequestMapping(value = "/mappedAsset", method = RequestMethod.POST)
	public @ResponseBody Status updateAsset(@RequestBody AssetEmployeeAssigned assetEmployeeAssigned) {
		Status status= new Status();
		try {
			assetEmployeeAssigned.setMappedDate(new Date());
			assetEmployeeMappeServices.mappedAsset(assetEmployeeAssigned);
			Asset asset= assetEmployeeAssigned.getAsset();
			asset.setAvailableStatus(0);
			assetServices.addNewAsset(asset);
			AssetTransaction assetTransaction = new AssetTransaction();
			assetTransaction.setAsset(asset);
			assetTransaction.setEmployee(assetEmployeeAssigned.getEmployee());
			assetTransaction.setTransactionDate(new Date());
			assetTransaction.setTranactionType("New Assigned");
			assetEmployeeMappeServices.saveAssetTransaction(assetTransaction);
			 status.setCode(200);
			 status.setMessage("Asset Employee Mapping.... Successfully");
		} catch (Exception e) {
			e.printStackTrace();
			 status.setCode(500);
			 status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/releaseMappedAsset", method = RequestMethod.POST)
	public @ResponseBody Status releaseMappedAsset(@RequestBody AssetEmployeeAssigned assetEmployeeAssigned) {
		Status status= new Status();
		try {
		
			assetEmployeeMappeServices.releaseMappedAsset(assetEmployeeAssigned);
			Asset asset= assetEmployeeAssigned.getAsset();
			asset.setAvailableStatus(1);
			assetServices.addNewAsset(asset);
			 status.setCode(200);
			 status.setMessage("Asset Release.... Successfully");
		} catch (Exception e) {
			e.printStackTrace();
			 status.setCode(500);
			 status.setMessage("Something Wrong");
		}
		return status;
	}
	
	@RequestMapping(value = "/transferAsset", method = RequestMethod.POST)
	public @ResponseBody Status transferAsset(@RequestBody TransferAssetDto transferAssetDto) {
		Status status= new Status();
		try {
			System.out.println("New Empl "+transferAssetDto.getNewemployee().toString());
			System.out.println("MAPPED  "+transferAssetDto.getAssetEmployeeAssigned().toString());
			AssetEmployeeAssigned assetEmployeeAssigned= new AssetEmployeeAssigned();
			assetEmployeeAssigned.setAsset(transferAssetDto.getAssetEmployeeAssigned().getAsset());
			assetEmployeeAssigned.setEmployee(transferAssetDto.getNewemployee());
			assetEmployeeAssigned.setMappedDate(new Date());
			assetEmployeeAssigned.setMappedStatus(1);
			assetEmployeeMappeServices.mappedAsset(assetEmployeeAssigned);
			assetEmployeeMappeServices.releaseMappedAsset(transferAssetDto.getAssetEmployeeAssigned());
			AssetTransaction assetTransaction = new AssetTransaction();
			assetTransaction.setAsset(transferAssetDto.getAssetEmployeeAssigned().getAsset());
			assetTransaction.setEmployee(transferAssetDto.getNewemployee());
			assetTransaction.setTransactionDate(new Date());
			assetTransaction.setTranactionType("Transfer");
			assetEmployeeMappeServices.saveAssetTransaction(assetTransaction);
			 status.setCode(200);
			 status.setMessage("Asset Release.... Successfully");
		} catch (Exception e) {
			e.printStackTrace();
			 status.setCode(500);
			 status.setMessage("Something Wrong");
		}
		return status;
	}
	
	@RequestMapping(value = "/getAllocationByAssetId", method = RequestMethod.GET)
	public @ResponseBody AssetEmployeeAssigned getAllocationByAssetId(@RequestParam("id")int id) {
		AssetEmployeeAssigned employeeAssigned= new  AssetEmployeeAssigned();
		try {	
			employeeAssigned=assetEmployeeMappeServices.getAllocationByAssetId(id);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return employeeAssigned;
	}
	
	@RequestMapping(value = "/getAllocationHistoryByAssetId", method = RequestMethod.GET)
	public @ResponseBody List<AssetTransaction> getAllocationHistoryByAssetId(@RequestParam("id")int id) {
		List<AssetTransaction> list= new  ArrayList<AssetTransaction>();
		try {	
			list=assetEmployeeMappeServices.getAllocationHistoryByAssetId(id);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	
	@RequestMapping(value = "/getAssetEmployeeAssignedByLimit/{page_no}/{item_per_page}", method = RequestMethod.GET)
	public @ResponseBody List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimit(@PathVariable("page_no") int page_no,@PathVariable("item_per_page") int item_per_page) {
		List<AssetEmployeeAssigned> list= new  ArrayList<AssetEmployeeAssigned>();
		try {	
			list=assetEmployeeMappeServices.getAssetEmployeeAssignedByLimit(page_no,item_per_page);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	
	
	@RequestMapping(value = "/getAssetEmployeeAssignedByLimitAndSearch", method = RequestMethod.GET)
	public @ResponseBody List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimitAndSearch(@RequestParam("searchText") String searchText,@RequestParam("pageNo") int pageNo,@RequestParam("perPage") int perPage) {
		List<AssetEmployeeAssigned> list= new  ArrayList<AssetEmployeeAssigned>();
		try {	
			
			list=assetEmployeeMappeServices.getAssetEmployeeAssignedByLimitAndSearch(searchText,pageNo,perPage);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	@RequestMapping(value = "/getAssetEmployeeAssignedCount", method = RequestMethod.GET)
	public @ResponseBody int  getAssetEmployeeAssignedCount() {
		int  supplierCount= 0;
		try {
			supplierCount= assetEmployeeMappeServices.getAssetEmployeeAssignedCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierCount;
	}
	@RequestMapping(value = "/getAssetEmployeeAssignedCountAndSearch", method = RequestMethod.GET)
	public @ResponseBody int  getAssetEmployeeAssignedCountAndSearch(@RequestParam("searchText") String searchText) {
		int  supplierCount= 0;
		try {
			supplierCount= assetEmployeeMappeServices.getAssetEmployeeAssignedCountAndSearch(searchText);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierCount;
	}
	
	

}
