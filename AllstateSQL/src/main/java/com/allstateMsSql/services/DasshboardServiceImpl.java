package com.allstateMsSql.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Notification;
import com.allstateMsSql.repo.AssetRepo;
import com.allstateMsSql.repo.NotificationRepo;

@Service
public class DasshboardServiceImpl implements DasshboardService {
	
	@Autowired
	AssetRepo assetRepo;
	@Autowired
	NotificationRepo notificationRepo;

	@Override
	public int getRegisterAssetCount() {
		// TODO Auto-generated method stub
		return assetRepo.getRegisterAssetCount();
	}

	@Override
	public int getUnRegisterAssetCount() {
		// TODO Auto-generated method stub
		return assetRepo.getUnRegisterAssetCount();
	}

	@Override
	public int getAllocatedAssetCount() {
		// TODO Auto-generated method stub
		return assetRepo.getAllocatedAssetCount();
	}

	@Override
	public int getUnAllocatedAssetCount() {
		// TODO Auto-generated method stub
		return assetRepo.getUnAllocatedAssetCount();
	}

	@Override
	public List<Notification> getAllUnSeenNotifications() {
		// TODO Auto-generated method stub
		return notificationRepo.getAllUnSeenNotifications();
	}

}
