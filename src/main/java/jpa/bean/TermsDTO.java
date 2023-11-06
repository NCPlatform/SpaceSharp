package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Terms")
@Data
public class TermsDTO {
	
	@Id
	@Column
	private String title;
	
	@Column
	private String content;
}
