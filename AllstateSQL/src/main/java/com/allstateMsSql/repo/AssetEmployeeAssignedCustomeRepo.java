package com.allstateMsSql.repo;

import java.util.List;

import com.allstateMsSql.model.AssetEmployeeAssigned;


public interface AssetEmployeeAssignedCustomeRepo {
	List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimit(int page_no, int item_per_page);

	List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimitAndSearch(String searchText, int pageNo, int perPage);

	int getAssetEmployeeAssignedCount();

	int getAssetEmployeeAssignedCountAndSearch(String searchText);

}
