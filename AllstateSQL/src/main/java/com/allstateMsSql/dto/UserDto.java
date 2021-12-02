/**
 * @ Dattatray Bodhale
 * Jan 27, 2020
 */
package com.allstateMsSql.dto;

import com.allstateMsSql.model.UserInfo;

public class UserDto {
	private int code;
	private String massage;
	private UserInfo data;
	/**
	 * @return the code
	 */
	public int getCode() {
		return code;
	}
	/**
	 * @param code the code to set
	 */
	public void setCode(int code) {
		this.code = code;
	}

	/**
	 * @return the massage
	 */
	public String getMassage() {
		return massage;
	}
	/**
	 * @param massage the massage to set
	 */
	public void setMassage(String massage) {
		this.massage = massage;
	}
	/**
	 * @return the data
	 */
	public UserInfo getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(UserInfo data) {
		this.data = data;
	}
	
	
	

}
