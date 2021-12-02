/**
 * @ Dattatray Bodhale
 * Jan 31, 2020
 */
package com.allstateMsSql.repo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.allstateMsSql.model.Tag;



public class TagCustomeRepoImpl implements TagCustomeRepo {

	@PersistenceContext
	EntityManager entityManager;
	@Override
	public List<Tag> getUnAssingedTagsByAssetTypeAndQuantity(int assetType, int quanity) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
				 List<Tag> list = entityManager.createQuery("from Tag t where t.statusBit=0 and t.tagType=:tagType ", Tag.class).setParameter("tagType", assetType).setMaxResults(quanity).getResultList();

				return list;
	}
	@Override
	public List<Tag> getTagsByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub
			long result = (long) entityManager.createQuery("SELECT count(t) FROM Tag t").getSingleResult();
		int total_count=(int) result;
		Query q = entityManager.createQuery("from Tag t ", Tag.class);
		int firstR = total_count - (page_no * item_per_page);
		int maxR = total_count - ((page_no - 1) * item_per_page);
		

		if(firstR<0) {
			firstR=0;
		}
	
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<Tag> list = q.getResultList();
		return list;
	}
	@Override
	public List<Tag> getTagsByLimitAndSearch(String searchText, int pageNo, int perPage) {
		// TODO Auto-generated method stub
long result = (long) entityManager.createQuery("SELECT count(t) FROM Tag t where  t.tagCode LIKE :searchText").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		
		int total_count=(int) result;
		Query q = entityManager.createQuery("from Tag t where t.tagCode LIKE :searchText", Tag.class);
		int firstR = total_count - (pageNo * perPage);
		int maxR = total_count - ((pageNo - 1) * perPage);
		

		if(firstR<0) {
			firstR=0;
		}
		q.setParameter("searchText", "%"+searchText+"%");
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<Tag> list = q.getResultList();
		return list;
	}
	@Override
	public int getTagCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(t) FROM Tag t where  t.tagCode LIKE :searchText").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		return (int) result;
	}
	@Override
	public int getTagCount() {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(t) FROM Tag t").getSingleResult();

		return (int) result;
	}
	public List<Tag> getTagsByCode(String tagCode) {
		// TODO Auto-generated method stub
			
		Query q = entityManager.createQuery("from Tag t where t.tagCode=:searchText", Tag.class);

		q.setParameter("searchText",tagCode);

				
		List<Tag> list = q.getResultList();
		return list;
	}

}
