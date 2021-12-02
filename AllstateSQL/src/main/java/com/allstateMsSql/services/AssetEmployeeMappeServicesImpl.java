package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.AssetEmployeeAssigned;
import com.allstateMsSql.model.AssetTransaction;
import com.allstateMsSql.repo.AssetEmployeeAssignedRepo;
import com.allstateMsSql.repo.AssetTransactionRepo;



@Service
public class AssetEmployeeMappeServicesImpl implements AssetEmployeeMappeServices{
	
	@Autowired
	AssetEmployeeAssignedRepo assetEmployeeAssignedRepo;
	@Autowired
	AssetTransactionRepo assetTransactionRepo;

	@Override
	public void mappedAsset(AssetEmployeeAssigned assetEmployeeAssigned) {
		// TODO Auto-generated method stub
		assetEmployeeAssignedRepo.save(assetEmployeeAssigned);
	}

	@Override
	public List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub
		return assetEmployeeAssignedRepo.getAssetEmployeeAssignedByLimit(page_no,item_per_page);
	}

	@Override
	public List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimitAndSearch(String searchText, int pageNo,
			int perPage) {
		// TODO Auto-generated method stub
		return assetEmployeeAssignedRepo.getAssetEmployeeAssignedByLimitAndSearch(searchText,pageNo,perPage);
	}

	@Override
	public int getAssetEmployeeAssignedCount() {
		// TODO Auto-generated method stub
		return assetEmployeeAssignedRepo.getAssetEmployeeAssignedCount();
	}

	@Override
	public int getAssetEmployeeAssignedCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		return assetEmployeeAssignedRepo.getAssetEmployeeAssignedCountAndSearch(searchText);
	}

	@Override
	public void releaseMappedAsset(AssetEmployeeAssigned assetEmployeeAssigned) {
		// TODO Auto-generated method stub
		assetEmployeeAssignedRepo.delete(assetEmployeeAssigned);
	}

	@Override
	public void saveAssetTransaction(AssetTransaction assetTransaction) {
		// TODO Auto-generated method stub
		assetTransactionRepo.save(assetTransaction);
	}

	@Override
	public AssetEmployeeAssigned getAllocationByAssetId(int id) {
		// TODO Auto-generated method stub
		Optional<AssetEmployeeAssigned> optional= assetEmployeeAssignedRepo.getAllocationByAssetId(id);
		return optional.isPresent()?optional.get():null;
	}

	@Override
	public List<AssetTransaction> getAllocationHistoryByAssetId(int id) {
		// TODO Auto-generated method stub
		return assetTransactionRepo.getAllocationHistoryByAssetId(id);
	}

}
