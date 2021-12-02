package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Asset;
import com.allstateMsSql.model.AssetEmployeeAssigned;
import com.allstateMsSql.repo.AssetEmployeeAssignedRepo;
import com.allstateMsSql.repo.AssetRepo;



@Service
public class AssetServicesImpl implements AssetServices {
	
	@Autowired
	AssetRepo assetRepo;
	@Autowired
	AssetEmployeeAssignedRepo assetEmployeeAssignedRepo;
	
	
	@Override
	public void addNewAsset(Asset asset) {
		// TODO Auto-generated method stub
		assetRepo.save(asset);
	}


	@Override
	public List<Asset> getAssetsByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub
		return assetRepo.getAssetsByLimit(page_no,item_per_page);
	}


	@Override
	public List<Asset> getAssetsByLimitAndSearch(String searchText, int pageNo, int perPage) {
		// TODO Auto-generated method stub
		return assetRepo.getAssetsByLimitAndSearch(searchText,pageNo,perPage);
	}


	@Override
	public int getAssetCount() {
		// TODO Auto-generated method stub
		return assetRepo.getAssetCount();
	}


	@Override
	public int getAssetCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		return assetRepo.getAssetCountAndSearch(searchText);
	}


	@Override
	public Optional<Asset> getAssetBySerialNo(String serialNo) {
		// TODO Auto-generated method stub
		return assetRepo.getAssetBySerialNo(serialNo);
	}


	@Override
	public Optional<Asset> getAssetByAssetId(String assetId) {
		// TODO Auto-generated method stub
		return assetRepo.getAssetByAssetId(assetId);
	}


	@Override
	public List<Asset> getAvailableAssets() {
		// TODO Auto-generated method stub
		return assetRepo.getAvailableAssets();
	}


	@Override
	public List<Asset> getAllAsseta1() {
		// TODO Auto-generated method stub
		return assetRepo.findAll();
	}


	@Override
	public Asset getAssetById(int id) {
		// TODO Auto-generated method stub
		Optional<Asset> optional= assetRepo.findById(id);
		return optional.isPresent()?optional.get():null;
	}


	@Override
	public List<AssetEmployeeAssigned> getEmployeeWiseAllocationReport(int empId) {
		// TODO Auto-generated method stub
		return assetEmployeeAssignedRepo.getEmployeeWiseAllocationReport(empId);
	}


	@Override
	public Optional<Asset> checkAssetId(String assetId) {
		// TODO Auto-generated method stub
		return assetRepo.checkAssetId(assetId);
	}


	@Override
	public String getMaxAssetIdByIntial(String assetIDInt) {
		// TODO Auto-generated method stub
		return assetRepo.getMaxAssetIdByIntial(assetIDInt);
	}

}
