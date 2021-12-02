package com.allstateMsSql.services;
import java.util.List;
import java.util.Optional;

import com.allstateMsSql.model.Tag;


public interface TagServicce {

	void addNewTags(Tag tag);

	List<Tag> getTagsByLimit(int page_no, int item_per_page);

	List<Tag> getTagsByLimitAndSearch(String searchText, int pageNo, int perPage);

	int getTagCountAndSearch(String searchText);

	Optional<Tag> getTagByName(String tagNo);

	int getTagCount();

	List<Tag> getAllAvailableTags();

	Optional<Tag> checkrfidTag(String rfidTag);

}
