/**
 * @ Dattatray Bodhale
 * Jan 27, 2020
 */
package com.allstateMsSql.services;
import java.util.List;

import com.allstateMsSql.dto.UserDto;
import com.allstateMsSql.model.UserInfo;


public interface UserServices {

	UserDto loginUser(UserInfo user);
	UserInfo getUserById(int userId);

}
