package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "CouponTypeDTO")
@Data
public class CouponTypeDTO {

	@Id
	@Column(nullable = false)
	private int seqCouponType;
	
	@Column
	private String title;
	
	@Column
	private int discount;
	
}