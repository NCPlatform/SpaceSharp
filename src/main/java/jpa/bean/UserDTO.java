package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "User")
@Data
public class UserDTO {
	
	@Id
	@Column(name="email", nullable=false)
	private String email;
	
	@Column(name="name", nullable=false)
	private String name;
	
	@Column(name="nickname")
	private String nickname;
	
	@Column(name="password", nullable=false)
	private String password;
	
	@Column(name="addr")
	private String addr;
	
	@Column(name="businessRegistrationNumber")
	private int businessRegistrationNumber;
	
	@Column(name="companyName")
	private String companyName;
	
	@Column(name="usergrade")
	private int usergrade;
	
	@Column(name="payment")
	private String payment;
	
	@Column(name="tel")
	private String tel;

}
