package com.allstateMsSql.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.AssetTransaction;


public interface AssetTransactionRepo extends JpaRepository<AssetTransaction, Integer>{
	@Query("from AssetTransaction a where a.asset.Id=?1")
	List<AssetTransaction> getAllocationHistoryByAssetId(int id);

}
