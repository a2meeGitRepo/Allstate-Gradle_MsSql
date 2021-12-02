/**
 * @ Dattatray Bodhale
 * Jan 27, 2020
 */
package com.allstateMsSql.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.UserInfo;


public interface UserRepo extends JpaRepository<UserInfo, Integer>{

	@Query("From UserInfo u where u.username=?1")
	Optional<UserInfo> getUsersByUsername(String username);

}
