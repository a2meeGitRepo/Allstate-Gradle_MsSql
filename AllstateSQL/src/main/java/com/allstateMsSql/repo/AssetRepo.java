package com.allstateMsSql.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.Asset;


public interface AssetRepo extends JpaRepository<Asset, Integer>,AssetCunstomeRepo{
	@Query("from Asset a where a.serialNo=?1")
	Optional<Asset> getAssetBySerialNo(String serialNo);
	@Query("from Asset a where a.assetId=?1")
	Optional<Asset> getAssetByAssetId(String assetId);
	
	@Query("from Asset a where a.availableStatus=1 and a.tagCode is not null")
	List<Asset> getAvailableAssets();
	
	@Query("select count(*) from Asset a where a.tagCode is not null")
	int getRegisterAssetCount();
	
	@Query("select count(*) from Asset a where a.tagCode is null")
	int getUnRegisterAssetCount();
	
	@Query("select count(*) from Asset a where a.availableStatus=0")
	int getAllocatedAssetCount();
	
	@Query("select count(*) from Asset a where a.availableStatus=1")
	int getUnAllocatedAssetCount();
	@Query("from Asset a where a.assetId=?1")
	Optional<Asset> checkAssetId(String assetId);

	

}
