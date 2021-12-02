package com.allstateMsSql.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="asset_emp_map")
public class AssetEmployeeAssigned {

	@Id
	 @GeneratedValue()
	@Column(name="asset_emp_map_id")
	private int assetEmpMapId;
	
	@ManyToOne
	@JoinColumn(name="asset_id")
	Asset asset;
	@ManyToOne
	@JoinColumn(name="employee_id")
	Employee employee;
	
	@Column(name="mapped_date")
	private Date mappedDate;
	
	@Column(name="mapped_by")
	private String mappedBy;
	
	@Column(name="mapped_status")
	private int mappedStatus;
	
	@Column(name="release_date")
	private Date releaseDate;

	public int getAssetEmpMapId() {
		return assetEmpMapId;
	}

	public void setAssetEmpMapId(int assetEmpMapId) {
		this.assetEmpMapId = assetEmpMapId;
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Date getMappedDate() {
		return mappedDate;
	}

	public void setMappedDate(Date mappedDate) {
		this.mappedDate = mappedDate;
	}

	public String getMappedBy() {
		return mappedBy;
	}

	public void setMappedBy(String mappedBy) {
		this.mappedBy = mappedBy;
	}

	public int getMappedStatus() {
		return mappedStatus;
	}

	public void setMappedStatus(int mappedStatus) {
		this.mappedStatus = mappedStatus;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	
	
	
	
	
}
