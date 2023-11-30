package jpa.bean;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "IssuedCoupon")
@Data
public class IssuedCouponDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private int seqIssuedCoupon;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private int seqCoupon;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@CreationTimestamp
	@Column
	private Date IssuedDate;
	
	@Column
	private boolean isUse;
	
}
