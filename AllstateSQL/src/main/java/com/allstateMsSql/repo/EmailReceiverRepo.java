package com.allstateMsSql.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.allstateMsSql.model.EmailReceiver;


public interface EmailReceiverRepo  extends JpaRepository<EmailReceiver, Integer>{

}
