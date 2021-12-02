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

import com.allstateMsSql.dto.ResponceObject;
import com.allstateMsSql.dto.Status;
import com.allstateMsSql.model.Asset;
import com.allstateMsSql.model.Tag;
import com.allstateMsSql.services.TagServicce;


@RestController
@CrossOrigin("*")
@RequestMapping("tag")
public class TagController {
	
	
	@Autowired
	TagServicce tagServicce;
	// Update Asset  
		@RequestMapping(value = "/addNewTags", method = RequestMethod.POST)
		public @ResponseBody Status addNewTags(@RequestBody Tag tag) {
			Status status= new Status();
			try {
				tag.setAddedDate(new Date());
				tag.setStatusBit(1);
				tagServicce.addNewTags(tag);
				 status.setCode(200);
				 status.setMessage("New Tag Added.... Successfully");
			} catch (Exception e) {
				e.printStackTrace();
				 status.setCode(500);
				 status.setMessage("Something Wrong");
			}
			return status;
		}
		
		
		@RequestMapping(value = "/getTagsByLimit/{page_no}/{item_per_page}", method = RequestMethod.GET)
		public @ResponseBody List<Tag> getTagsByLimit(@PathVariable("page_no") int page_no,@PathVariable("item_per_page") int item_per_page) {
			List<Tag> list= new  ArrayList<Tag>();
			try {	
				list=tagServicce.getTagsByLimit(page_no,item_per_page);
				
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return list;
		}
		
		@RequestMapping(value = "/getTagsByLimitAndSearch", method = RequestMethod.GET)
		public @ResponseBody List<Tag> getTagsByLimitAndSearch(@RequestParam("searchText") String searchText,@RequestParam("pageNo") int pageNo,@RequestParam("perPage") int perPage) {
			List<Tag> list= new  ArrayList<Tag>();
			try {	
				
				list=tagServicce.getTagsByLimitAndSearch(searchText,pageNo,perPage);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return list;
		}
		@RequestMapping(value = "/getTagCount", method = RequestMethod.GET)
		public @ResponseBody int  getTagCount() {
			int  supplierCount= 0;
			try {
				supplierCount= tagServicce.getTagCount();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return supplierCount;
		}
		@RequestMapping(value = "/getTagCountAndSearch", method = RequestMethod.GET)
		public @ResponseBody int  getTagCountAndSearch(@RequestParam("searchText") String searchText) {
			int  supplierCount= 0;
			try {
				supplierCount= tagServicce.getTagCountAndSearch(searchText);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return supplierCount;
		}

		@RequestMapping(value = "/getAllAvailableTags", method = RequestMethod.GET)
		public @ResponseBody List<Tag> getAllAvailableTags() {
			List<Tag> list= new  ArrayList<Tag>();
			try {	
				list=tagServicce.getAllAvailableTags();
				
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return list;
		}
		@RequestMapping(value = "/uploadTags", method = RequestMethod.POST)
		public @ResponseBody ResponseEntity uploadTags(ModelMap model, @ModelAttribute(value = "file") MultipartFile file,
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
					
								String tagNo=row.getCell(1).toString();
								
								
								Optional<Tag> optional= tagServicce.getTagByName(tagNo);
								Tag tag2= new Tag();
								if(optional.isPresent()){
									tag2=optional.get();
								}else{
									tag2.setStatusBit(1);
									tag2.setAddedDate(new Date());
								}
								tag2.setTagCode(tagNo.trim());
								
								tagServicce.addNewTags(tag2);
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
		
		@RequestMapping(value = "/checkrfidTag", method = RequestMethod.GET)
		public @ResponseBody ResponceObject checkrfidTag(@RequestParam("rfidTag") String rfidTag) {
			ResponceObject responceObject= new  ResponceObject();
			try {	
				System.out.println("RFID :: "+rfidTag);
				
				Optional<Tag> optional=tagServicce.checkrfidTag(rfidTag.trim());
				
				if (optional.isPresent()) {
					Tag tag= optional.get();
					if(tag.getStatusBit()!=0){
						responceObject.setCode(200);
						responceObject.setMessage("Valid RFID Tag");
						responceObject.setData(tag);
					}else{
						responceObject.setCode(500);
						responceObject.setMessage("Already Assigned  RFID Tag");
					}
					
					
				}else{
					responceObject.setCode(500);
					responceObject.setMessage("Invalid RFID Tag");
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return responceObject;
		}

}
