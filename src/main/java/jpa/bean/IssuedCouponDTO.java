package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "IssuedCoupon")
@Data
public class IssuedCouponDTO {
	
	@Id
	@Column(nullable = false)
	private int seqIssuedCoupon;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private int seqCoupon;
	
	@Column
	private Date IssuedDate;
	
	@Column
	private Date endOfUse;
	
}
