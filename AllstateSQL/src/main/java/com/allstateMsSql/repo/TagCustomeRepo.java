/**
 * @ Dattatray Bodhale
 * Jan 31, 2020
 */
package com.allstateMsSql.repo;

import java.util.List;

import com.allstateMsSql.model.Tag;


public interface TagCustomeRepo {
	List<Tag> getUnAssingedTagsByAssetTypeAndQuantity(int assetType, int quanity);
	List<Tag> getTagsByLimit(int page_no, int page_no2);

	List<Tag> getTagsByLimitAndSearch(String searchText, int pageNo, int pageNo2);

	int getTagCountAndSearch(String searchText);

	int getTagCount();
	List<Tag> getTagsByCode(String tagCode);
}
