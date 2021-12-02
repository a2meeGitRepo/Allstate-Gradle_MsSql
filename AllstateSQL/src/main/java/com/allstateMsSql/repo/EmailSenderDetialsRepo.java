package com.allstateMsSql.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.configuration.EmailSenderDetials;



public interface EmailSenderDetialsRepo extends JpaRepository<EmailSenderDetials, Integer> {
	@Query("From EmailSenderDetials e where e.active=1")
	Optional<EmailSenderDetials> getActiveSender();

}
