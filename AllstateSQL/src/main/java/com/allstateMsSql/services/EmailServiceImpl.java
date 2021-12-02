package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.configuration.EmailSenderDetials;
import com.allstateMsSql.configuration.EmailUtility;
import com.allstateMsSql.configuration.SendEmailData;
import com.allstateMsSql.dto.ResponceObject;
import com.allstateMsSql.model.EmailReceiver;
import com.allstateMsSql.repo.EmailReceiverRepo;
import com.allstateMsSql.repo.EmailSenderDetialsRepo;


@Service
public class EmailServiceImpl implements EmailService{
	
	
	@Autowired
	EmailSenderDetialsRepo emailSenderDetialsRepo;
	
	@Autowired
	EmailReceiverRepo emailReceiverRepo;


	@Override
	public List<EmailSenderDetials> getAllEmailSenderDetials() {
		// TODO Auto-generated method stub
		return emailSenderDetialsRepo.findAll();
	}

	@Override
	public void addEmailDetial(EmailSenderDetials emailSenderDetials) {
		// TODO Auto-generated method stub
		emailSenderDetialsRepo.save(emailSenderDetials);
		
	}

	@Override
	public void deletEmailDetial(EmailSenderDetials emailSenderDetials) {
		// TODO Auto-generated method stub
		emailSenderDetialsRepo.delete(emailSenderDetials);
	}

	@Override
	public void addEmailReceiver(EmailReceiver emailReceiver) {
		// TODO Auto-generated method stub
		emailReceiverRepo.save(emailReceiver);
	}

	@Override
	public List<EmailReceiver> getAllEmailReceiver() {
		// TODO Auto-generated method stub
		return emailReceiverRepo.findAll();
	}

	@Override
	public void deletEmailReceiver(EmailReceiver emailReceiver) {
		// TODO Auto-generated method stub
		emailReceiverRepo.delete(emailReceiver);
	}

	@Override
	public ResponceObject sendMail(String recipient,String subject, String message) {
		// TODO Auto-generated method stub
		ResponceObject object = new ResponceObject();
		Optional<EmailSenderDetials> senders=emailSenderDetialsRepo.getActiveSender();
		if(senders.isPresent()){
			EmailUtility emailUtility = new EmailUtility();
			SendEmailData sendEmailData= new SendEmailData();
			sendEmailData.setDetials(senders.get());
			sendEmailData.setMessage(message+senders.get().getSigniture());
			sendEmailData.setRecipient(recipient);
			sendEmailData.setSubject(subject);
			try {
				emailUtility.sendEmail(sendEmailData);
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				object.setCode(500);
				object.setMessage("Email Not Send :"+senders.get().getToMail());
			}
		}else{
			object.setCode(500);
			object.setMessage("Email Not Send :"+senders.get().getToMail());
		}
		return null;
	}


}
