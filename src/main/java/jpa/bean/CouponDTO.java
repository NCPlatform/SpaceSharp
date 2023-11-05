package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Coupon")
@Data
public class CouponDTO {
	
	@Id
	@Column
	private int seqCoupon;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	@Column(nullable = false)
	private int seqCouponType;
	
}
