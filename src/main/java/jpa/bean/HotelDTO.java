package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Hotel")
@Data
public class HotelDTO {
	
	@Id
	@Column(nullable = false)
	private int seqHotel;
	
	@Column
	private String seqHotelCategory;
	
	@Column
	private String name;
	
	@Column
	private String subscribe;
	
	@Column
	private String mainKeyword;
	
	@Column
	private String keyword;
	
	@Column
	private String addr;
	
	@Column
	private String ownerEmail;
	
	@Column
	private String workinghour;
	
	@Column
	private String holiday;
	
	@Column
	private String placeEx;
	
	@Column
	private String facilities;
	
	@Column
	private String alert;
	
	@Column
	private String refund;
	
	@Column
	private boolean coupon;
	
	@Column
	private boolean TV;
	
	@Column
	private boolean internet;
	
	@Column
	private boolean copy;
	
	@Column
	private boolean whiteboard;
	
	@Column
	private boolean mic;
	
	@Column
	private boolean cooking;
	
	@Column
	private boolean food;
	
	@Column
	private boolean alcohol;
	
	@Column
	private boolean washing;
	
	@Column
	private boolean parking;
	
}
