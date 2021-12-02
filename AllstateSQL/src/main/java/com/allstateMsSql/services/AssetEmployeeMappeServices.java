package com.allstateMsSql.services;

import java.util.List;

import com.allstateMsSql.model.AssetEmployeeAssigned;
import com.allstateMsSql.model.AssetTransaction;


public interface AssetEmployeeMappeServices {

	void mappedAsset(AssetEmployeeAssigned assetEmployeeAssigned);

	List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimit(int page_no, int item_per_page);

	List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimitAndSearch(String searchText, int pageNo, int perPage);

	int getAssetEmployeeAssignedCount();

	int getAssetEmployeeAssignedCountAndSearch(String searchText);

	void releaseMappedAsset(AssetEmployeeAssigned assetEmployeeAssigned);

	void saveAssetTransaction(AssetTransaction assetTransaction);

	AssetEmployeeAssigned getAllocationByAssetId(int id);

	List<AssetTransaction> getAllocationHistoryByAssetId(int id);

}
