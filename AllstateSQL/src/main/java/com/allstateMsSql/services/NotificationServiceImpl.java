package com.allstateMsSql.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Notification;
import com.allstateMsSql.repo.NotificationRepo;

@Service
public class NotificationServiceImpl implements NotificationService {
	
	@Autowired
	NotificationRepo notificationRepo;

	@Override
	public int getNotificationCount() {
		// TODO Auto-generated method stub
		return notificationRepo.getNotificationCount();
	}

	@Override
	public List<Notification> getNotificationList() {
		// TODO Auto-generated method stub
		return notificationRepo.getNotificationList();
	}

	@Override
	public void saveNotification(Notification notification) {
		// TODO Auto-generated method stub
		notificationRepo.save(notification);
	}

	@Override
	public List<Notification> getNotificationListBySearch(String serachText) {
		// TODO Auto-generated method stub
		return notificationRepo.getNotificationListBySearch(serachText);
	}

}
