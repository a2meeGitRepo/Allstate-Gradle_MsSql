package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import com.allstateMsSql.model.Asset;
import com.allstateMsSql.model.AssetEmployeeAssigned;


public interface AssetServices {

	void addNewAsset(Asset asset);

	List<Asset> getAssetsByLimit(int page_no, int item_per_page);

	List<Asset> getAssetsByLimitAndSearch(String searchText, int pageNo, int perPage);

	int getAssetCount();

	int getAssetCountAndSearch(String searchText);

	Optional<Asset> getAssetBySerialNo(String serialNo);

	Optional<Asset> getAssetByAssetId(String assetId);

	List<Asset> getAvailableAssets();

	List<Asset> getAllAsseta1();

	Asset getAssetById(int id);

	List<AssetEmployeeAssigned> getEmployeeWiseAllocationReport(int empId);

	Optional<Asset> checkAssetId(String assetId);

	String getMaxAssetIdByIntial(String assetIDInt);

}
