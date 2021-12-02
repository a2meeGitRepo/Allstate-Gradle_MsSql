package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import com.allstateMsSql.model.Device;


public interface DeviceService {

	List<Device> getAllDevice();

	List<Device> getAllAvailableDevices(int deviceType);

	Optional<Device> getDeviceByMacIdAndAntenaNo(String macId, String antenaNo);

	Device addNewDevice(Device device);

	Optional<Device> getDeviceByMacId(String macId);

}
