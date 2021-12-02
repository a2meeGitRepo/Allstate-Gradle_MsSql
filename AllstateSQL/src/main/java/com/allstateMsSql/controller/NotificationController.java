package com.allstateMsSql.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.model.Notification;
import com.allstateMsSql.services.NotificationService;


@RestController
@CrossOrigin("*")
@RequestMapping("notification")
public class NotificationController {
	
	@Autowired
	NotificationService notificationService;
	
	
	@RequestMapping(value = "/getNotificationCount", method = RequestMethod.GET)
	public @ResponseBody int getNotificationCount() {
	
		//int notificationCount = notificationService.getNotificationCount();
		return 0;
	
	}
	@RequestMapping(value = "/getNotificationListBySearch", method = RequestMethod.GET)
	public @ResponseBody List<Notification> getNotificationListBySearch(@RequestParam("serachText") String serachText) {
		List<Notification> list = new ArrayList<Notification>();
		list = notificationService.getNotificationListBySearch(serachText);
		return list;
	
	}
	@RequestMapping(value = "/getNotificationList", method = RequestMethod.GET)
	public @ResponseBody List<Notification> getNotificationList() {
		List<Notification> list = new ArrayList<Notification>();
		list = notificationService.getNotificationList();
		return list;
	
	}
	@RequestMapping(value = "/updateNotification", method = RequestMethod.POST)
	public @ResponseBody void updateNotification(@RequestBody Notification notification) {
		
		notificationService.saveNotification(notification);
	
	}

}
