package com.allstateMsSql.services;
import java.util.List;

import com.allstateMsSql.model.Notification;


public interface NotificationService {

	int getNotificationCount();

	List<Notification> getNotificationList();

	void saveNotification(Notification notification);

	List<Notification> getNotificationListBySearch(String serachText);

}
