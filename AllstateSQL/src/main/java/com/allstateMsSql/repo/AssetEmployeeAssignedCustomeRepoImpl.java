package com.allstateMsSql.repo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.allstateMsSql.model.AssetEmployeeAssigned;



public class AssetEmployeeAssignedCustomeRepoImpl implements AssetEmployeeAssignedCustomeRepo {
	@PersistenceContext
	EntityManager entityManager;
	
	
	@Override
	public List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub

		long result = (long) entityManager.createQuery("SELECT count(a) FROM AssetEmployeeAssigned  a").getSingleResult();
		int total_count=(int) result;
		Query q = entityManager.createQuery("from AssetEmployeeAssigned a ", AssetEmployeeAssigned.class);
		int firstR = total_count - (page_no * item_per_page);
		int maxR = total_count - ((page_no - 1) * item_per_page);
		

		if(firstR<0) {
			firstR=0;
		}
	
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<AssetEmployeeAssigned> list = q.getResultList();
		return list;
	}

	@Override
	public List<AssetEmployeeAssigned> getAssetEmployeeAssignedByLimitAndSearch(String searchText, int pageNo,
			int perPage) {
		// TODO Auto-generated method stub
long result = (long) entityManager.createQuery("SELECT count(a) FROM AssetEmployeeAssigned a where  a.asset.serialNo LIKE :searchText OR  a.asset.assetId LIKE :searchText  OR a.asset.make LIKE :searchText OR a.asset.model LIKE :searchText OR a.employee.employeeName LIKE :searchText OR a.employee.employeeNo LIKE :searchText ").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		
		int total_count=(int) result;
		Query q = entityManager.createQuery("from AssetEmployeeAssigned a  where  a.asset.serialNo LIKE :searchText OR  a.asset.assetId LIKE :searchText  OR a.asset.make LIKE :searchText OR a.asset.model LIKE :searchText OR a.employee.employeeName LIKE :searchText OR a.employee.employeeNo LIKE :searchText ", AssetEmployeeAssigned.class);
		int firstR = total_count - (pageNo * perPage);
		int maxR = total_count - ((pageNo - 1) * perPage);
		

		if(firstR<0) {
			firstR=0;
		}
		q.setParameter("searchText", "%"+searchText+"%");
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<AssetEmployeeAssigned> list = q.getResultList();
		return list;
	}

	@Override
	public int getAssetEmployeeAssignedCount() {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(a) FROM AssetEmployeeAssigned a").getSingleResult();

		return (int) result;
	}

	@Override
	public int getAssetEmployeeAssignedCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(a) FROM AssetEmployeeAssigned a where  a.asset.serialNo LIKE :searchText OR  a.asset.assetId LIKE :searchText  OR a.asset.make LIKE :searchText OR a.asset.model LIKE :searchText OR a.employee.employeeName LIKE :searchText OR a.employee.employeeNo LIKE :searchText ").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		return (int) result;
	}

}
