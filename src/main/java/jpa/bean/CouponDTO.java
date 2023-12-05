package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Coupon")
@Data
public class CouponDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private int seqCoupon;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	@Column
	private String couponType;
	
	@Column
	private int discount;
	
	@Column
	private int cnt;
	
}
