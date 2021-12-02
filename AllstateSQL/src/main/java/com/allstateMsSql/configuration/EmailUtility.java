package com.allstateMsSql.configuration;

import java.util.Date;
import java.util.List;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;



/**
 * A utility class for sending e-mail with attachment.
 * @author www.codejava.net
 *
 */
public class EmailUtility {
	
	public static void sendEmail(SendEmailData data)
					throws AddressException, MessagingException {
		
		 
		String host=data.getDetials().getHost();
		String port=data.getDetials().getPort();
		String userName=data.getDetials().getUserName();
		String fromMail=data.getDetials().getFromMail();
		String password=data.getDetials().getPassword();
		
	
		
		
		// sets SMTP server properties
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "false");
		
		/*properties.put("mail.user", userName);
		properties.put("mail.password", password);*/

		// creates a new session with an authenticator
		Authenticator auth = new Authenticator() {
			public PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(userName, password);
			}
		};
		Session session = Session.getInstance(properties,auth);
		// creates a new e-mail message
		Message msg = null;
		
		try {
			msg = new MimeMessage(session);

			msg.setFrom(new InternetAddress(fromMail));
			msg.setReplyTo(InternetAddress.parse(fromMail, false));
			InternetAddress[] toAddresses = { new InternetAddress(data.getRecipient()) };
			msg.setRecipients(Message.RecipientType.TO, toAddresses);
			msg.setSubject(data.getSubject());

			// creates message part
			
			
			
			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(data.getMessage(), "text/html");
		

			// creates multi-part
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

	
			    String message1 = "<div style=\"color:red;\">BRIDGEYE</div>";
			    msg.setContent(message1, "text/html; charset=utf-8");
			
			System.out.println(msg);
			
		
			msg.setContent(multipart);

			// sends the e-mail
			try {
				Transport.send(msg);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("Email Sent Successfully to "+data.getRecipient());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//System.out.println("Email Msg="+msg);
		
	}
}