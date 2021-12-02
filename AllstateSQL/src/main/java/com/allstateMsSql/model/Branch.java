/**
 * @ Dattatray Bodhale
 * Feb 5, 2020
 */
package com.allstateMsSql.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="branch_mst")
public class Branch {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="branch_id")
	private int branchId;
	
	@Column(name="branch_name")
	private String branchName;
	
	@Column(name="added_date")
	private Date added_date;
	
	@Column(name="upd_datetime")
	private Date updDatetime;

	
	/**
	 * @return the branchId
	 */
	public int getBranchId() {
		return branchId;
	}

	/**
	 * @param branchId the branchId to set
	 */
	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	/**
	 * @return the branchName
	 */
	public String getBranchName() {
		return branchName;
	}

	/**
	 * @param branchName the branchName to set
	 */
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	/**
	 * @return the added_date
	 */
	public Date getAdded_date() {
		return added_date;
	}

	/**
	 * @param added_date the added_date to set
	 */
	public void setAdded_date(Date added_date) {
		this.added_date = added_date;
	}

	/**
	 * @return the updDatetime
	 */
	public Date getUpdDatetime() {
		return updDatetime;
	}

	/**
	 * @param updDatetime the updDatetime to set
	 */
	public void setUpdDatetime(Date updDatetime) {
		this.updDatetime = updDatetime;
	}

	
	
	
}
