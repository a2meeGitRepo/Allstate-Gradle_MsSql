package com.allstateMsSql.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.Device;


public interface DeviceRepo extends JpaRepository<Device, Integer>{
	@Query("from Device d where d.deviceType=?1")
	List<Device> getAllAvailableDevices(int deviceType);
	@Query("from Device d where d.macId=?1 and d.antenaNo=?2")
	Optional<Device> getDeviceByMacIdAndAntenaNo(String macId, String antenaNo);
	@Query("from Device d where d.macId=?1")
	Optional<Device> getDeviceByMacId(String macId);

}
