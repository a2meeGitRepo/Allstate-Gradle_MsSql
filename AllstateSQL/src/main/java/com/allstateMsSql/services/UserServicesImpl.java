/**
 * @ Dattatray Bodhale
 * Jan 27, 2020
 */
package com.allstateMsSql.services;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.dto.UserDto;
import com.allstateMsSql.model.UserInfo;
import com.allstateMsSql.repo.UserRepo;

@Service
@Transactional
public class UserServicesImpl implements UserServices {

	@Autowired
	UserRepo userRepo;
	
	
	@Override
	public UserDto loginUser(UserInfo user) {
		UserDto dto=new UserDto();
		try {
			Optional<UserInfo> list =userRepo.getUsersByUsername(user.getUsername());
				System.out.println("USEINFI "+list.isPresent());
			if(list.isPresent()) {
				UserInfo userInfo = list.get();
				if(userInfo.getPassword().equals(user.getPassword())) {
					dto.setCode(200);
					dto.setMassage("Sucessfully");
					dto.setData(userInfo);
				}else {
					dto.setCode(500);
					dto.setMassage("Password Invalid");
				}
				
			}else {
				dto.setCode(500);
				dto.setMassage("User name Invalid");
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			dto.setCode(500);
			dto.setMassage("Something Wrong");
		}
		return dto;
	}


	/* (non-Javadoc)
	 * @see com.net.services.UserServices#getUserById(int)
	 */
	@Override
	public UserInfo getUserById(int userId) {
		// TODO Auto-generated method stub
		Optional<UserInfo> list = userRepo.findById(userId);
		return list.isPresent()?list.get():null;
	}

}
