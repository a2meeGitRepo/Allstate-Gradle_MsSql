/**
 * @ Dattatray Bodhale
 * Jan 28, 2020
 */
package com.allstateMsSql.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.Tag;


public interface TagRepo extends JpaRepository<Tag, Integer> ,TagCustomeRepo{

	@Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Tag t WHERE t.tagCode =?1")
	boolean isExits(String epc);

	@Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Tag t WHERE t.tagCode =?1 and t.statusBit=0")
	boolean isAvailableTOUsed(String epc);
	
	@Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Tag t WHERE t.tagCode =?1 and t.statusBit=0 and t.tagType=?2")
	boolean isAvailableTOUsedForThisType(String epc, int assetType);
	
	@Query("From Tag t where t.tagCode=?1")
	Optional<Tag> findByTagCode(String epc);
	
	@Query("From Tag t where t.statusBit=1")
	List<Tag> getAllAvaulalbeTags();
	
	
	
	@Query("From Tag t WHERE t.tagCode=?1")
	Optional<Tag> checkrfidTag(String rfidTag);







}
