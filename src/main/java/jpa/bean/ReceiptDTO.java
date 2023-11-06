package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Receipt")
@Data
public class ReceiptDTO {

	@Id
	@Column
	private int apply_num;
	
	@Column
	private String email;
	
	@Column
	private String bank_name;
	
	@Column(nullable = false)
	private int seqReservation;
	
	@Column
	private String receipt_url;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private int paidAmount;
	
	@Column(nullable = false)
	private Date payDate;
	
	@Column
	private String couponDiscount;
	
}
