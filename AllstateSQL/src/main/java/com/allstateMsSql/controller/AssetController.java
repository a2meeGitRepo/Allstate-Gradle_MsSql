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

import com.allstateMsSql.dto.ResponceObject;
import com.allstateMsSql.dto.Status;
import com.allstateMsSql.model.Asset;
import com.allstateMsSql.model.Branch;
import com.allstateMsSql.model.Tag;
import com.allstateMsSql.services.AssetServices;
import com.allstateMsSql.services.CommonService;
import com.allstateMsSql.services.TagServicce;



@RestController
@CrossOrigin("*")
@RequestMapping("asset")
public class AssetController {
	
	@Autowired
	AssetServices assetServices;
	@Autowired
	CommonService commonService;
	@Autowired
	TagServicce tagServicce;
	@RequestMapping(value = "/addNewAsset", method = RequestMethod.POST)
	public @ResponseBody Status updateAsset(@RequestBody Asset asset) {
		Status status= new Status();
		try {
			asset.setActive(1);
			asset.setAvailableStatus(1);
			asset.setAddedDate(new Date());
			String assetType=asset.getAssetType();
			String branchName=asset.getBranch().getBranchName();
			String assetTypeSrt="";
			if(assetType.equalsIgnoreCase("Desktop")){
				assetTypeSrt="DSK";
			}else if(assetType.equalsIgnoreCase("Laptop")){
				assetTypeSrt="LAP";
			}
			else if(assetType.equalsIgnoreCase("Surface")){
				assetTypeSrt="EXE";
			}
			else if(assetType.equalsIgnoreCase("Macbook")){
				assetTypeSrt="MAC";
			}
			String assetIDInt="ASPL"+branchName.substring(0,1).toUpperCase()+"-"+assetTypeSrt;
			
			String maxAssetId=assetServices.getMaxAssetIdByIntial(assetIDInt);
			System.out.println("Max Code For "+assetIDInt+" is :: "+maxAssetId);
			String aId=assetIDInt+"-"+maxAssetId;
			asset.setAssetId(aId);
			 assetServices.addNewAsset(asset);
			 status.setCode(200);
			 status.setMessage("New Asset Added.... Successfully");
		} catch (Exception e) {
			e.printStackTrace();
			 status.setCode(500);
			 status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/assignedTag", method = RequestMethod.POST)
	public @ResponseBody Status assignedTag(@RequestBody Asset asset) {
		Status status= new Status();
		try {
			Optional<Tag> optional= tagServicce.checkrfidTag(asset.getTagCode());
			Tag tag=optional.get();
			tag.setStatusBit(0);
			
			asset.setTagAlllocationStatus(1);
			 assetServices.addNewAsset(asset);
			 tagServicce.addNewTags(tag);
			 status.setCode(200);
			 status.setMessage("Tag Assigned.... Successfully");
		} catch (Exception e) {
			e.printStackTrace();
			 status.setCode(500);
			 status.setMessage("Something Wrong");
		}
		return status;
	}
	
	
	@RequestMapping(value = "/getAssetsByLimit/{page_no}/{item_per_page}", method = RequestMethod.GET)
	public @ResponseBody List<Asset> getAssetsByLimit(@PathVariable("page_no") int page_no,@PathVariable("item_per_page") int item_per_page) {
		List<Asset> list= new  ArrayList<Asset>();
		try {	
			list=assetServices.getAssetsByLimit(page_no,item_per_page);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@RequestMapping(value = "/getAssetsByLimitAndSearch", method = RequestMethod.GET)
	public @ResponseBody List<Asset> getAssetsByLimitAndSearch(@RequestParam("searchText") String searchText,@RequestParam("pageNo") int pageNo,@RequestParam("perPage") int perPage) {
		List<Asset> list= new  ArrayList<Asset>();
		try {	
			
			list=assetServices.getAssetsByLimitAndSearch(searchText,pageNo,perPage);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	@RequestMapping(value = "/getAssetCount", method = RequestMethod.GET)
	public @ResponseBody int  getAssetCount() {
		int  supplierCount= 0;
		try {
			supplierCount= assetServices.getAssetCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierCount;
	}
	@RequestMapping(value = "/getAssetCountAndSearch", method = RequestMethod.GET)
	public @ResponseBody int  getAssetCountAndSearch(@RequestParam("searchText") String searchText) {
		int  supplierCount= 0;
		try {
			supplierCount= assetServices.getAssetCountAndSearch(searchText);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierCount;
	}
	
	
	
	@RequestMapping(value = "/getAllAvailableTags", method = RequestMethod.GET)
	public @ResponseBody List<Asset> getAvailableAssets() {
		List<Asset> list= new  ArrayList<Asset>();
		try {	
			
			list=assetServices.getAvailableAssets();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	@RequestMapping(value = "/getAllAsseta1", method = RequestMethod.GET)
	public @ResponseBody List<Asset> getAllAsseta1() {
		List<Asset> list= new  ArrayList<Asset>();
		try {	
			
			list=assetServices.getAllAsseta1();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
	@RequestMapping(value = "/getAssetById", method = RequestMethod.GET)
	public @ResponseBody Asset getAssetById(@RequestParam("id") int id) {
		Asset asset= new  Asset();
		try {	
			asset=assetServices.getAssetById(id);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return asset;
	}
	
	
	@RequestMapping(value = "/uploadAsset", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity postFile(ModelMap model, @ModelAttribute(value = "file") MultipartFile file,
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
							Asset asset = new Asset();
							System.out.println("ROW 0  "+row.getCell(0).toString());
							System.out.println("ROW 1  "+row.getCell(1).toString());
							System.out.println("ROW 2  "+row.getCell(2).toString());
							System.out.println("ROW 3  "+row.getCell(3).toString());
							System.out.println("ROW 4  "+row.getCell(4).toString());
							System.out.println("ROW 5  "+row.getCell(5).toString());
							System.out.println("ROW 6  "+row.getCell(6).toString());
							System.out.println("ROW 7  "+row.getCell(7).toString());
							System.out.println("ROW 8  "+row.getCell(8).toString());
							System.out.println("ROW 9  "+row.getCell(9).toString());
							System.out.println("ROW 29  "+row.getCell(10).toString());
							String assetType=row.getCell(1).toString();
							String serialNo=row.getCell(2).toString();
							//String assetId=row.getCell(3).toString();
							String purchaseOrderNo=row.getCell(3).toString();
							String invoiceNo=row.getCell(4).toString();
							String invoiceDate=row.getCell(5).toString();
							String age=row.getCell(6).toString();
							String status=row.getCell(7).toString();
							String make=row.getCell(8).toString();
							String model1=row.getCell(9).toString();
							String branchName=row.getCell(10).toString();
							
							Optional<Branch> optional= commonService.getBranchByName(branchName);
							Branch branch= new Branch();
							if(optional.isPresent()){
								branch=optional.get();
							}else{
								Branch branch2= new Branch(); 
										branch2.setBranchName(branchName);
										branch=commonService.addnewBranch(branch2);
							}
							
							Optional<Asset> optional2= assetServices.getAssetBySerialNo(serialNo);
							if(optional2.isPresent()){
								asset=optional2.get();
							}
									
							asset.setAvailableStatus(1);
							
							String assetTypeSrt="";
							if(assetType.equalsIgnoreCase("Desktop")){
								assetTypeSrt="DSK";
							}else if(assetType.equalsIgnoreCase("Laptop")){
								assetTypeSrt="LAP";
							}
							else if(assetType.equalsIgnoreCase("Surface")){
								assetTypeSrt="EXE";
							}
							else if(assetType.equalsIgnoreCase("Macbook")){
								assetTypeSrt="MAC";
							}
							String assetIDInt="ASPL"+branchName.substring(0,1).toUpperCase()+"-"+assetTypeSrt;
							
							String maxAssetId=assetServices.getMaxAssetIdByIntial(assetIDInt);
							System.out.println("Max Code For "+assetIDInt+" is :: "+maxAssetId);
							String aId=assetIDInt+"-"+maxAssetId;
							asset.setActive(1);
							asset.setAdded_by("Uploaded");
							asset.setAddedDate(new Date());
							asset.setAssetType(assetType);
							asset.setBranch(branch);
							asset.setAssetId(aId);
						//	asset.setInvoiceDate(invoiceDate);
							asset.setInvoiceNo(invoiceNo);
							asset.setMake(make);
							asset.setModel(model1);
							asset.setPurchaseOrderNo(purchaseOrderNo);
							asset.setSerialNo(serialNo);
							asset.setStatus(status);
							assetServices.addNewAsset(asset);
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
	
	@RequestMapping(value = "/checkAssetId", method = RequestMethod.GET)
	public @ResponseBody ResponceObject checkAssetId(@RequestParam("assetId") String assetId) {
		ResponceObject responceObject= new  ResponceObject();
		try {	
			Optional<Asset> optional=assetServices.checkAssetId(assetId);
			if (optional.isPresent()) {
				Asset asset = optional.get();
						if (asset.getTagAlllocationStatus()==0) {
							responceObject.setCode(200);
							responceObject.setMessage("Valid  Asset Id");
							responceObject.setData(asset);
						}else{
							responceObject.setCode(500);
							responceObject.setMessage(" Asset Id has already Assignd ");
						}
				
			}else{
				responceObject.setCode(500);
				responceObject.setMessage("Invalid Asset Id");
				
			}
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responceObject;
	}

}
