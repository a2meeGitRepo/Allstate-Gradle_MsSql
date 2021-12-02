/**
 * @ Dattatray Bodhale
 * Jan 27, 2020
 */
package com.allstateMsSql.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.dto.UserDto;
import com.allstateMsSql.model.UserInfo;
import com.allstateMsSql.services.UserServices;


@RestController
@CrossOrigin("*")
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserServices userServices;
	
	// Login 
	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody UserDto loginUser(@RequestBody UserInfo user) {
		UserDto userDto = null;
		try {
			System.out.println("USER "+user.getUsername());
			userDto = userServices.loginUser(user);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userDto;
	}
	

}
