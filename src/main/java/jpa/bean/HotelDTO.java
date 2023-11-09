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
	
	@Column(columnDefinition = "boolean default false")
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

	@Column
	private boolean smoke;

	@Column
	private boolean animal;

	@Column
	private boolean pc;

	@Column
	private boolean table;

	@Column
	private boolean socket;

	@Column
	private boolean open24;

	@Column
	private boolean noHoliday;

	@Column
	private boolean restaurant;

	@Column
	private boolean freeFood;

	@Column
	private boolean locker;

	@Column
	private boolean mailService;

	@Column
	private boolean kitchen;

	@Column
	private boolean waterFurifier;

	@Column
	private boolean catering;

	@Column
	private boolean heater;

	@Column
	private boolean airConditioner;

	@Column
	private boolean fax;

	@Column
	private boolean wareHouse;

	@Column
	private boolean percelService;

	@Column
	private boolean privateToilet;

	@Column
	private boolean fittingRoom;

	@Column
	private boolean roofTop;

	@Column
	private boolean rounge;

	@Column
	private boolean mirror;

	@Column
	private boolean bbq;

	@Column
	private boolean doorlock;
	
}