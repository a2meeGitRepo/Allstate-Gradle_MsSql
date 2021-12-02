package com.allstateMsSql.services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Tag;
import com.allstateMsSql.repo.TagRepo;


@Service
public class TagServicceImpl implements TagServicce {
	
	@Autowired
	TagRepo tagRepo;

	@Override
	public void addNewTags(Tag tag) {
		// TODO Auto-generated method stub
		tagRepo.save(tag);
	}

	@Override
	public List<Tag> getTagsByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub
		return tagRepo.getTagsByLimit(page_no,item_per_page);
	}

	@Override
	public List<Tag> getTagsByLimitAndSearch(String searchText, int pageNo, int perPage) {
		// TODO Auto-generated method stub
		return tagRepo.getTagsByLimitAndSearch(searchText,pageNo,perPage);
	}

	@Override
	public int getTagCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		return tagRepo.getTagCountAndSearch(searchText);
	}

	@Override
	public Optional<Tag> getTagByName(String tagNo) {
		// TODO Auto-generated method stub
		return tagRepo.findByTagCode(tagNo);
	}

	@Override
	public int getTagCount() {
		// TODO Auto-generated method stub
		return tagRepo.getTagCount();
	}

	@Override
	public List<Tag> getAllAvailableTags() {
		// TODO Auto-generated method stub
		return tagRepo.getAllAvaulalbeTags();
	}

	@Override
	public Optional<Tag> checkrfidTag(String rfidTag) {
		// TODO Auto-generated method stub
		System.out.println("RFID "+rfidTag);
		List<Tag> list= tagRepo.getTagsByCode(rfidTag);
		System.out.println("RFID list "+list.size());
		try {
			return tagRepo.checkrfidTag(rfidTag);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
		
	}

}
