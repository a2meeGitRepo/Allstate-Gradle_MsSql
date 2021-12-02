package com.allstateMsSql.configuration;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="email_sender")
public class EmailSenderDetials {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	 @Column(name = "host")
	 private String host;
	 
	 @Column(name = "port")
	 private String port;
	 
	 @Column(name = "user_name")
	 private String userName;
	 
	 @Column(name = "from_mail")
	 private String fromMail;
	 
	 @Column(name = "password")
	 private String password;
	 @Column(name = "signiture")
	 private String signiture;
	 
	 @Column(name = "to_mail")
	 private String toMail;
	 
	 @Column(name = "to_mail3")
	 private String toMail3;
	 
	 public String getToMail3() {
		return toMail3;
	}


	public void setToMail3(String toMail3) {
		this.toMail3 = toMail3;
	}


	public String getToMail1() {
		return toMail1;
	}


	public void setToMail1(String toMail1) {
		this.toMail1 = toMail1;
	}


	@Column(name = "to_mail2")
	 private String toMail1;
	 
	 
	 public String getToMail() {
		return toMail;
	}


	public void setToMail(String toMail) {
		this.toMail = toMail;
	}


	public String getSigniture() {
		return signiture;
	}


	public void setSigniture(String signiture) {
		this.signiture = signiture;
	}


	@Column(name = "active")
	 private int active;
	 
	 @Column(name = "added_date")
	 private Date addedDate;
	 
	 @Column(name = "upd_datetime")
	 private Date updDatetime;
	 
	 @Column(name = "upd_by")
	 private String updBy;

	 
	 @Column(name = "added_by")
	 private String addedBy;


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getHost() {
		return host;
	}


	public void setHost(String host) {
		this.host = host;
	}


	public String getPort() {
		return port;
	}


	public void setPort(String port) {
		this.port = port;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
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


	public String getFromMail() {
		return fromMail;
	}


	public void setFromMail(String fromMail) {
		this.fromMail = fromMail;
	}


	public Date getUpdDatetime() {
		return updDatetime;
	}


	public void setUpdDatetime(Date updDatetime) {
		this.updDatetime = updDatetime;
	}


	public String getUpdBy() {
		return updBy;
	}


	public void setUpdBy(String updBy) {
		this.updBy = updBy;
	}


	public String getAddedBy() {
		return addedBy;
	}


	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	 

}
