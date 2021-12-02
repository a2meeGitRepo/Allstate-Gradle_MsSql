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

import org.apache.catalina.User;

@Entity
@Table(name="tag_mst")
public class Tag {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tag_id")
	private int tagId;
	
	@Column(name="tag_type")
	private int tagType;
	
	
	@Column(name="tag_code")
	private String tagCode;
	
	@Column(name="status_bit")
	private int statusBit;
	
	@Column(name="added_date")
	private Date addedDate;
	
	@Column(name="upd_datetime")
	private Date updDatetime;
	
	@ManyToOne
	@JoinColumn(name="added_by", referencedColumnName="user_id")
	private UserInfo addedBy;

	/**
	 * @return the tagId
	 */
	public int getTagId() {
		return tagId;
	}

	/**
	 * @param tagId the tagId to set
	 */
	public void setTagId(int tagId) {
		this.tagId = tagId;
	}

	/**
	 * @return the tagType
	 */
	public int getTagType() {
		return tagType;
	}

	/**
	 * @param tagType the tagType to set
	 */
	public void setTagType(int tagType) {
		this.tagType = tagType;
	}

	/**
	 * @return the tagCode
	 */
	public String getTagCode() {
		return tagCode;
	}

	/**
	 * @param tagCode the tagCode to set
	 */
	public void setTagCode(String tagCode) {
		this.tagCode = tagCode;
	}

	/**
	 * @return the statusBit
	 */
	public int getStatusBit() {
		return statusBit;
	}

	/**
	 * @param statusBit the statusBit to set
	 */
	public void setStatusBit(int statusBit) {
		this.statusBit = statusBit;
	}

	/**
	 * @return the addedDate
	 */
	public Date getAddedDate() {
		return addedDate;
	}

	/**
	 * @param addedDate the addedDate to set
	 */
	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
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

	/**
	 * @return the addedBy
	 */
	public UserInfo getAddedBy() {
		return addedBy;
	}

	/**
	 * @param addedBy the addedBy to set
	 */
	public void setAddedBy(UserInfo addedBy) {
		this.addedBy = addedBy;
	}

	
	
	
	
	
	
	
}
