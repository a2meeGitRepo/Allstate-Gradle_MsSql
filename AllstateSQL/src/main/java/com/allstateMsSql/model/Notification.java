/**
 * @ Dattatray Bodhale
 * Feb 14, 2020
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
@Table(name="notification_tr")
public class Notification {
	
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="notification_id")
	private int notificationId;
	
	@Column(name="messsge")
	private String messsge;
	
	@Column(name="notification_datatime")
	private Date notificationDatatime;
	
	@Column(name="view_datetime")
	private Date viewDatetime;

	@Column(name="view_bit")
	private int view_bit;

	/**
	 * @return the notificationId
	 */
	public int getNotificationId() {
		return notificationId;
	}

	/**
	 * @param notificationId the notificationId to set
	 */
	public void setNotificationId(int notificationId) {
		this.notificationId = notificationId;
	}

	/**
	 * @return the messsge
	 */
	public String getMesssge() {
		return messsge;
	}

	/**
	 * @param messsge the messsge to set
	 */
	public void setMesssge(String messsge) {
		this.messsge = messsge;
	}

	/**
	 * @return the notificationDatatime
	 */
	public Date getNotificationDatatime() {
		return notificationDatatime;
	}

	/**
	 * @param notificationDatatime the notificationDatatime to set
	 */
	public void setNotificationDatatime(Date notificationDatatime) {
		this.notificationDatatime = notificationDatatime;
	}

	/**
	 * @return the viewDatetime
	 */
	public Date getViewDatetime() {
		return viewDatetime;
	}

	/**
	 * @param viewDatetime the viewDatetime to set
	 */
	public void setViewDatetime(Date viewDatetime) {
		this.viewDatetime = viewDatetime;
	}

	/**
	 * @return the view_bit
	 */
	public int getView_bit() {
		return view_bit;
	}

	/**
	 * @param view_bit the view_bit to set
	 */
	public void setView_bit(int view_bit) {
		this.view_bit = view_bit;
	}
	
	
	
	
}
