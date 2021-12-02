package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Device;
import com.allstateMsSql.repo.DeviceRepo;

@Service
public class DeviceServiceImpl implements DeviceService{

	@Autowired
	DeviceRepo deviceRepo;
	
	@Override
	public List<Device> getAllDevice() {
		// TODO Auto-generated method stub
		return deviceRepo.findAll();
	}

	@Override
	public List<Device> getAllAvailableDevices(int deviceType) {
		// TODO Auto-generated method stub
		return deviceRepo.getAllAvailableDevices(deviceType);
	}

	@Override
	public Optional<Device> getDeviceByMacIdAndAntenaNo(String macId, String antenaNo) {
		// TODO Auto-generated method stub
		return deviceRepo.getDeviceByMacIdAndAntenaNo(macId,antenaNo);
	}

	@Override
	public Device addNewDevice(Device device) {
		// TODO Auto-generated method stub
		//device.setDeviceId(1);
		System.out.println("Device "+device.toString());
		return deviceRepo.save(device);
	}

	@Override
	public Optional<Device> getDeviceByMacId(String macId) {
		// TODO Auto-generated method stub
		return deviceRepo.getDeviceByMacId(macId);
	}

}
