package com.allstateMsSql.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="device_mst")
public class Device {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="device_id")
	private int deviceId;
	
	@Column(name="device_name")
	private String deviceName;
	
	
	@Column(name="mac_id")
	private String macId;
	@Column(name="antena_no")
	private String antenaNo;
	
	@Column(name="assigned_bit")
	private int assignedBit;
	
	@Column(name="location_name")
	private String locationName;
	
	
	public int getAssignedBit() {
		return assignedBit;
	}

	public void setAssignedBit(int assignedBit) {
		this.assignedBit = assignedBit;
	}

	@Column(name="configuration")
	private String configuration;
	
	
	@Column(name="device_type")
	private String  deviceType;
	
	/*@ManyToOne
	@JoinColumn(name="added_by", referencedColumnName="user_id")
	private UserInfo addedBy;
	*/
	
	@Column(name="added_date")
	private Date addedDate;
	
	@Column(name="active")
	private int active;
	@Column(name="delet")
	private int delet;
	
	
	public int getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(int deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getMacId() {
		return macId;
	}

	public void setMacId(String macId) {
		this.macId = macId;
	}

	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
/*
	public UserInfo getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(UserInfo addedBy) {
		this.addedBy = addedBy;
	}
*/
	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public int getDelet() {
		return delet;
	}

	public void setDelet(int delet) {
		this.delet = delet;
	}

	public String getAntenaNo() {
		return antenaNo;
	}

	public void setAntenaNo(String antenaNo) {
		this.antenaNo = antenaNo;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	/*@Override
	public String toString() {
		return "Device [deviceId=" + deviceId + ", deviceName=" + deviceName + ", macId=" + macId + ", antenaNo="
				+ antenaNo + ", assignedBit=" + assignedBit + ", locationName=" + locationName + ", configuration="
				+ configuration + ", deviceType=" + deviceType + ", addedBy=" + addedBy + ", addedDate=" + addedDate
				+ ", active=" + active + ", delet=" + delet + "]";
	}*/
	
	
	
	
	
}
