package com.allstateMsSql.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.model.Notification;
import com.allstateMsSql.services.DasshboardService;


@RestController
@CrossOrigin("*")
@RequestMapping("dasshboard")
public class DasshboardController {

	@Autowired
	DasshboardService dasshboardService;
	
	
	@RequestMapping(value = "/getRegisterAssetCount", method = RequestMethod.GET)
	public @ResponseBody int getRegisterAssetCount() {
		int registerAssetCount= 0;
		try {
			registerAssetCount = dasshboardService.getRegisterAssetCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return registerAssetCount;
	}
	@RequestMapping(value = "/getUnRegisterAssetCount", method = RequestMethod.GET)
	public @ResponseBody int getUnRegisterAssetCount1() {
		int registerAssetCount= 0;
		try {
			registerAssetCount = dasshboardService.getUnRegisterAssetCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return registerAssetCount;
	}
	@RequestMapping(value = "/getAllocatedAssetCount", method = RequestMethod.GET)
	public @ResponseBody int getAllocatedAssetCount() {
		int registerAssetCount= 0;
		try {
			registerAssetCount = dasshboardService.getAllocatedAssetCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return registerAssetCount;
	}
	@RequestMapping(value = "/getUnAllocatedAssetCount", method = RequestMethod.GET)
	public @ResponseBody int getUnAllocatedAssetCount() {
		int registerAssetCount= 0;
		try {
			registerAssetCount = dasshboardService.getUnAllocatedAssetCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return registerAssetCount;
	}
	
	@RequestMapping(value = "/getAllUnSeenNotifications", method = RequestMethod.GET)
	public @ResponseBody List<Notification> getAllUnSeenNotifications() {
		List<Notification> notifications= null;
		try {
			notifications = dasshboardService.getAllUnSeenNotifications();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return notifications;
	}
}
