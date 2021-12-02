package com.allstateMsSql.repo;

import java.util.List;

import com.allstateMsSql.model.Asset;


public interface AssetCunstomeRepo {
	List<Asset> getAssetsByLimit(int page_no, int item_per_page);

	List<Asset> getAssetsByLimitAndSearch(String searchText, int pageNo, int perPage);

	int getAssetCount();

	int getAssetCountAndSearch(String searchText);
	String getMaxAssetIdByIntial(String assetIDInt);

}
