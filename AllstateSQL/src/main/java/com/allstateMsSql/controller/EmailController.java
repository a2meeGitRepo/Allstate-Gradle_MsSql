package com.allstateMsSql.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.configuration.EmailSenderDetials;
import com.allstateMsSql.dto.EmailDetials;
import com.allstateMsSql.dto.ResponceObject;
import com.allstateMsSql.dto.Status;
import com.allstateMsSql.model.EmailReceiver;
import com.allstateMsSql.services.EmailService;



@RestController
@CrossOrigin("*")
@RequestMapping("email")
public class EmailController {
	
	@Autowired
	EmailService  emailSmsService;
	
	
	@RequestMapping(value = "/sendMail", method = RequestMethod.POST)

	public @ResponseBody ResponceObject sendMail(@RequestBody EmailDetials emailDetials) {
		ResponceObject status =new ResponceObject();
		try {
			
			
			status=	emailSmsService.sendMail(emailDetials.getRecipient(),emailDetials.getSubject(), emailDetials.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
		
	@RequestMapping(value = "/addEmailDetial", method = RequestMethod.POST)
	public @ResponseBody Status addEmailDetial(@RequestBody EmailSenderDetials emailSenderDetials) {
		Status status =new Status();
		try {
			List<EmailSenderDetials> list=emailSmsService.getAllEmailSenderDetials();
			emailSenderDetials.setActive(1);
			emailSenderDetials.setAddedDate(new Date());
			emailSmsService.addEmailDetial(emailSenderDetials);
			for(EmailSenderDetials detials :list){
				detials.setActive(0);
				emailSmsService.addEmailDetial(detials);
				
			}
			
			status.setCode(200);
			status.setMessage("Email Detials Saved..........Successfully!!!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/getAllEmailSenderDetials", method = RequestMethod.GET)
	public @ResponseBody List<EmailSenderDetials> getAllEmailSenderDetials() {
		Status status =new Status();
		List<EmailSenderDetials> list =null;
		try {
			list=emailSmsService.getAllEmailSenderDetials();
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return list;
	}
	
	@RequestMapping(value = "/changeStatusEmail", method = RequestMethod.POST)
	public @ResponseBody Status changeStatusEmail(@RequestBody EmailSenderDetials emailSenderDetials) {
		Status status =new Status();
		try {
			if(emailSenderDetials.getActive()==1){
				emailSenderDetials.setActive(0);
				emailSmsService.addEmailDetial(emailSenderDetials);

			}else{
				List<EmailSenderDetials> list=emailSmsService.getAllEmailSenderDetials();

				for(EmailSenderDetials detials :list){
					if(detials.getId()==emailSenderDetials.getId()){
						detials.setActive(1);
						emailSmsService.addEmailDetial(detials);
					}else{
						detials.setActive(0);
						emailSmsService.addEmailDetial(detials);
					}
					
					
				}
			}
			
			
			status.setCode(200);
			status.setMessage("Status Changed............ Successfully!!!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/deletEmailDetial", method = RequestMethod.POST)
	public @ResponseBody Status deletEmailDetial(@RequestBody EmailSenderDetials emailSenderDetials) {
		Status status =new Status();
		try {
			
			emailSmsService.deletEmailDetial(emailSenderDetials);
			
			
			status.setCode(200);
			status.setMessage("Data Deleted............ Successfully!!!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	
	
	
	
	
	@RequestMapping(value = "/addEmailReceiver", method = RequestMethod.POST)
	public @ResponseBody Status addEmailReceiver(@RequestBody EmailReceiver emailReceiver) {
		Status status =new Status();
		try {emailReceiver.setActive(1);
		emailReceiver.setAddedDate(new Date());
			emailSmsService.addEmailReceiver(emailReceiver);
			status.setCode(200);
			status.setMessage("Email Detials Saved..........Successfully!!!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/getAllEmailReceiver", method = RequestMethod.GET)
	public @ResponseBody List<EmailReceiver> getAllEmailReceiver() {
		Status status =new Status();
		List<EmailReceiver> list =null;
		try {
			list=emailSmsService.getAllEmailReceiver();
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return list;
	}
	
	@RequestMapping(value = "/changeStatusEmailReceiver", method = RequestMethod.POST)
	public @ResponseBody Status changeStatusEmailReceiver(@RequestBody EmailReceiver emailReceiver) {
		Status status =new Status();
		try {
			if(emailReceiver.getActive()==1){
				emailReceiver.setActive(0);
				emailSmsService.addEmailReceiver(emailReceiver);

			}else{
				emailReceiver.setActive(1);
				emailSmsService.addEmailReceiver(emailReceiver);
			}
			
			
			status.setCode(200);
			status.setMessage("Status Changed............ Successfully!!!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
	@RequestMapping(value = "/deletEmailReceiver", method = RequestMethod.POST)
	public @ResponseBody Status deletEmailReceiver(@RequestBody EmailReceiver emailReceiver) {
		Status status =new Status();
		try {
			
			emailSmsService.deletEmailReceiver(emailReceiver);
			
			
			status.setCode(200);
			status.setMessage("Data Deleted............ Successfully!!!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setCode(500);
			status.setMessage("Something Wrong");
		}
		return status;
	}
}
