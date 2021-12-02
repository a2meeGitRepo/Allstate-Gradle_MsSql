package com.allstateMsSql.services;

import java.util.List;

import com.allstateMsSql.configuration.EmailSenderDetials;
import com.allstateMsSql.dto.ResponceObject;
import com.allstateMsSql.model.EmailReceiver;



public interface EmailService {

	List<EmailSenderDetials> getAllEmailSenderDetials();
	void addEmailDetial(EmailSenderDetials emailSenderDetials);
	void deletEmailDetial(EmailSenderDetials emailSenderDetials);
	void addEmailReceiver(EmailReceiver emailReceiver);
	List<EmailReceiver> getAllEmailReceiver();
	void deletEmailReceiver(EmailReceiver emailReceiver);
	ResponceObject sendMail(String recipient, String subject, String message);
}
