package com.allstateMsSql.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.dto.ResponceObject;
import com.allstateMsSql.model.Device;
import com.allstateMsSql.services.DeviceService;



@RestController
@CrossOrigin("*")
@RequestMapping("device")
public class DeviceController {
	
	@Autowired
	DeviceService deviceService;
	/**
	 * 
	 * @author datta
	 * 
	 * For get All Device List
	 * 
	 */
	
	@RequestMapping(value = "/getAllDevice", method = RequestMethod.GET)
	public @ResponseBody List<Device> getAllDevice() {
		List<Device> devices= null;
		try {
			devices = deviceService.getAllDevice();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return devices;
	}
	
	@RequestMapping(value = "/getAllAvailableDevices", method = RequestMethod.GET)
	public @ResponseBody List<Device> getAllAvailableDevices(@RequestParam("deviceType") int deviceType) {
		List<Device> devices= null;
		try {
			devices = deviceService.getAllAvailableDevices(deviceType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return devices;
	}
	/**
	 * 
	 * @author datta
	 * 
	 * For Add New Device 
	 * 
	 */		
		@RequestMapping(value = "/addNewDevice", method = RequestMethod.POST)
		public @ResponseBody ResponceObject addNewDevice(@RequestBody Device device) {
			ResponceObject responceObject =new ResponceObject();
			try {
				if(device.getDeviceType()=="RF READER"){
					Optional<Device> optional=deviceService.getDeviceByMacIdAndAntenaNo(device.getMacId(),device.getAntenaNo());
					if(optional.isPresent()){
						
						responceObject.setCode(500);
						responceObject.setMessage("Device Mac ID  and Antena No Already Exits... !!!");
					}else{
						Device device2=deviceService.addNewDevice(device);
						responceObject.setData(device2);
						responceObject.setCode(200);
						responceObject.setMessage("Device Added.......... Successfully !!!");
					}
				}else{
					Optional<Device> optional=deviceService.getDeviceByMacId(device.getMacId());
					if(optional.isPresent()){
						
						responceObject.setCode(500);
						responceObject.setMessage("Device Mac ID Already Exits... !!!");
					}else{
						Device device2=deviceService.addNewDevice(device);
						responceObject.setData(device2);
						responceObject.setCode(200);
						responceObject.setMessage("Device Added.......... Successfully !!!");
					}
				}
				
				
				
				
			} catch (Exception e) {
				e.printStackTrace();
				responceObject.setCode(500);
				responceObject.setMessage("Something Wrong");
			}
			return responceObject;
		}

	 	/**
		 * 
		 * @author datta
		 * 
		 * For get Update Device 
		 * 
		 */		
		@RequestMapping(value = "/updateDeviceStatus", method = RequestMethod.POST)
		public @ResponseBody ResponceObject updateDeviceStatus(@RequestBody Device device) {
			ResponceObject responceObject =new ResponceObject();
			try {
					if(device.getActive()==1){
						device.setActive(0);
					}else{
						device.setActive(1);
					}
				Device device2=deviceService.addNewDevice(device);
				responceObject.setData(device2);
				responceObject.setCode(200);
				responceObject.setMessage("Status Change .......... Successfully !!!");
				
				
			} catch (Exception e) {
				e.printStackTrace();
				responceObject.setCode(500);
				responceObject.setMessage("Something Wrong");
			}
			return responceObject;
		}
		
		@RequestMapping(value = "/deletDevice", method = RequestMethod.POST)
		public @ResponseBody ResponceObject deletDevice(@RequestBody Device device) {
			ResponceObject responceObject =new ResponceObject();
			try {
				device.setDelet(1);
				deviceService.addNewDevice(device);
				responceObject.setCode(200);
				responceObject.setMessage("Device Deleted .......... Successfully !!!");
				
				
			} catch (Exception e) {
				e.printStackTrace();
				responceObject.setCode(500);
				responceObject.setMessage("Something Wrong");
			}
			return responceObject;
		}
		
		

}
