package com.allstateMsSql.repo;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.allstateMsSql.model.Asset;


public class AssetCunstomeRepoImpl implements AssetCunstomeRepo{
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public List<Asset> getAssetsByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub

		long result = (long) entityManager.createQuery("SELECT count(a) FROM Asset a").getSingleResult();
		int total_count=(int) result;
		Query q = entityManager.createQuery("from Asset a ", Asset.class);
		int firstR = total_count - (page_no * item_per_page);
		int maxR = total_count - ((page_no - 1) * item_per_page);
		

		if(firstR<0) {
			firstR=0;
		}
	
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<Asset> list = q.getResultList();
		return list;
	}

	@Override
	public List<Asset> getAssetsByLimitAndSearch(String searchText, int pageNo, int perPage) {
		// TODO Auto-generated method stub
	long result = (long) entityManager.createQuery("SELECT count(a) FROM Asset a where  a.assetType LIKE :searchText OR  a.serialNo LIKE :searchText OR a.assetId LIKE :searchText OR a.purchaseOrderNo LIKE :searchText OR a.invoiceNo LIKE :searchText OR a.invoiceDate LIKE :searchText OR a.status LIKE :searchText OR a.make LIKE :searchText OR a.model LIKE :searchText ").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		
		int total_count=(int) result;
		Query q = entityManager.createQuery("from Asset a where a.assetType LIKE :searchText OR  a.serialNo LIKE :searchText OR a.assetId LIKE :searchText OR a.purchaseOrderNo LIKE :searchText OR a.invoiceNo LIKE :searchText OR a.invoiceDate LIKE :searchText OR a.status LIKE :searchText OR a.make LIKE :searchText OR a.model LIKE :searchText ", Asset.class);
		int firstR = total_count - (pageNo * perPage);
		int maxR = total_count - ((pageNo - 1) * perPage);
		

		if(firstR<0) {
			firstR=0;
		}
		q.setParameter("searchText", "%"+searchText+"%");
		q.setFirstResult(firstR); // modify this to adjust paging
		q.setMaxResults(maxR);
		
		List<Asset> list = q.getResultList();
		return list;
	}

	@Override
	public int getAssetCount() {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(a) FROM Asset a").getSingleResult();

		return (int) result;
	}

	@Override
	public int getAssetCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		long result = (long) entityManager.createQuery("SELECT count(a) FROM Asset a where  a.assetType LIKE :searchText OR  a.serialNo LIKE :searchText OR a.assetId LIKE :searchText OR a.purchaseOrderNo LIKE :searchText OR a.invoiceNo LIKE :searchText OR a.invoiceDate LIKE :searchText OR a.status LIKE :searchText OR a.make LIKE :searchText OR a.model LIKE :searchText").setParameter("searchText", "%"+searchText+"%").getSingleResult();

		return (int) result;
	}

	@Override
	public String getMaxAssetIdByIntial(String assetIDInt) {
		// TODO Auto-generated method stub
		
		long result = (long) entityManager.createQuery("SELECT count(a) FROM Asset a where  substr(a.assetId,1,9)=:assetId").setParameter("assetId", assetIDInt).getSingleResult();
		int total_count=(int) result;
		if(total_count==0){
			return "0001";
		}else{
			String maxCode= (String) entityManager.createQuery("select MAX(a.assetId) from Asset a where substr(a.assetId,1,9)=:assetId").setParameter("assetId", assetIDInt).getSingleResult();
			System.out.println("MAX CDE ::"+maxCode);
			System.out.println("MAX CDE L ::"+maxCode.substring(11,14));

			String subCode="1"+maxCode.substring(10,14);
			int intCode=Integer.parseInt(subCode);
			intCode++;
			System.out.println("intCode L ::"+intCode);

			String code=String.valueOf(intCode).substring(1,5);
			System.out.println("Code ::"+code);

			return code;
		}
	}

}
