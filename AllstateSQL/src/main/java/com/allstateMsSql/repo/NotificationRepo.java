package com.allstateMsSql.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.allstateMsSql.model.Notification;


public interface NotificationRepo extends JpaRepository<Notification, Integer> {
	@Query("From Notification  n where n.view_bit=0")
	List<Notification> getNotificationList();
	@Query("select count(*)  From Notification  n where n.view_bit=0")
	int getNotificationCount();
	@Query("From Notification  n where n.view_bit=0 and n.messsge LIKE  %:searchText% ")
	List<Notification> getNotificationListBySearch(@Param("searchText")String searchText);
	@Query("From Notification  n where n.view_bit=0")
	List<Notification> getAllUnSeenNotifications();

}
