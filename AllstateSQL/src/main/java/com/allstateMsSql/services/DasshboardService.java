package com.allstateMsSql.services;

import java.util.List;

import com.allstateMsSql.model.Notification;


public interface DasshboardService {

	int getRegisterAssetCount();

	int getUnRegisterAssetCount();

	int getAllocatedAssetCount();

	int getUnAllocatedAssetCount();

	List<Notification> getAllUnSeenNotifications();

}
