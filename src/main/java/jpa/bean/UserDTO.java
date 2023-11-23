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
	
	@Column
	private String name;
	
	@Column
	private String nickname;
	
	@Column(nullable=false)
	private String password;
	
	@Column
	private String addr;
	
	@Column
	private int businessRegistrationNumber;
	
	@Column
	private String companyName;
	
	@Column
	private int usergrade;
	
	@Column
	private String payment;
	
	@Column
	private String tel;
	
	@Column
	private boolean iskakao;
	
	@Column
	private boolean isnaver;
}