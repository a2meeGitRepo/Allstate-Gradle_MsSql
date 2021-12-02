/**
 * @ Dattatray Bodhale
 * Jan 27, 2020
 */
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
@Table(name="asset_mst")
public class Asset {
	@Id
	 @GeneratedValue()
	@Column(name="id")
	private int Id;
	
	@Column(name="asset_type")
	private String assetType;
		
	@Column(name="serial_no")
	private String serialNo;
	
	@Column(name="asset_id")
	private String assetId;
	
	@Column(name="purchase_order_no")
	private String purchaseOrderNo;
	
	@Column(name="invoice_no")
	private String invoiceNo;
	
	@Column(name="invoice_date")
	private Date invoiceDate;
	
	@Column(name="tag_alllocation_status")
	private int tagAlllocationStatus;
	
	
	@Column(name="age")
	private String age;
	
	@Column(name="status")
	private String status;
	
	@Column(name="make")
	private String make;
	
	@Column(name="model")
	private String model;
		
	
	@ManyToOne
	@JoinColumn(name="branch_id")
	Branch branch;
	
	@Column(name="active")
	private int active;
	
	@Column(name="available_status")
	private int availableStatus;
	
	public int getAvailableStatus() {
		return availableStatus;
	}

	public void setAvailableStatus(int availableStatus) {
		this.availableStatus = availableStatus;
	}

	@Column(name="added_date")
	private Date addedDate;
		
	@Column(name="added_by")
	private String added_by;
	
	
	@Column(name="tag_code")
	private String tagCode;
	

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getAssetType() {
		return assetType;
	}

	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}

	
	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	public String getPurchaseOrderNo() {
		return purchaseOrderNo;
	}

	public void setPurchaseOrderNo(String purchaseOrderNo) {
		this.purchaseOrderNo = purchaseOrderNo;
	}

	

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public String getAdded_by() {
		return added_by;
	}

	public void setAdded_by(String added_by) {
		this.added_by = added_by;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getTagCode() {
		return tagCode;
	}

	public void setTagCode(String tagCode) {
		this.tagCode = tagCode;
	}

	public int getTagAlllocationStatus() {
		return tagAlllocationStatus;
	}

	public void setTagAlllocationStatus(int tagAlllocationStatus) {
		this.tagAlllocationStatus = tagAlllocationStatus;
	}
	
	
	
	
	
	
}
