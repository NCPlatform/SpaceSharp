package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Hotel")
@Data
public class HotelDTO {
	
	@Column
	private String img;
	
	@Id
	@Column(nullable = false)
	private int seqHotel;
	
	@Column
	private String seqHotelCategory;
	
	
	public void setSeqHotelCategory(String cates) {
		seqHotelCategory = cates;
	}
	
	@Column
	private String name;
	
	@Column
	private String subscribe;
	
	@Column
	private String mainKeyword;
	
	@Column
	private String keyword;
	
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
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
	
	@Column
	private boolean isAccept;
	
	@Override
	public String toString() {
		return "HotelDTO{" +
				"img='" + img + '\'' +
				", seqHotel=" + seqHotel +
				", seqHotelCategory='" + seqHotelCategory + '\'' +
				", name='" + name + '\'' +
				", subscribe='" + subscribe + '\'' +
				", mainKeyword='" + mainKeyword + '\'' +
				", keyword='" + keyword + '\'' +
				", addr='" + addr + '\'' +
				", ownerEmail='" + ownerEmail + '\'' +
				", workinghour='" + workinghour + '\'' +
				", holiday='" + holiday + '\'' +
				", placeEx='" + placeEx + '\'' +
				", facilities='" + facilities + '\'' +
				", alert='" + alert + '\'' +
				", refund='" + refund + '\'' +
				", coupon=" + coupon +
				", TV=" + TV +
				", internet=" + internet +
				", copy=" + copy +
				", whiteboard=" + whiteboard +
				", mic=" + mic +
				", cooking=" + cooking +
				", food=" + food +
				", alcohol=" + alcohol +
				", washing=" + washing +
				", parking=" + parking +
				", smoke=" + smoke +
				", animal=" + animal +
				", pc=" + pc +
				", socket=" + socket +
				", open24=" + open24 +
				", noHoliday=" + noHoliday +
				", restaurant=" + restaurant +
				", freeFood=" + freeFood +
				", locker=" + locker +
				", mailService=" + mailService +
				", kitchen=" + kitchen +
				", waterFurifier=" + waterFurifier +
				", catering=" + catering +
				", heater=" + heater +
				", airConditioner=" + airConditioner +
				", fax=" + fax +
				", wareHouse=" + wareHouse +
				", percelService=" + percelService +
				", privateToilet=" + privateToilet +
				", fittingRoom=" + fittingRoom +
				", roofTop=" + roofTop +
				", rounge=" + rounge +
				", mirror=" + mirror +
				", bbq=" + bbq +
				", doorlock=" + doorlock +
				", isAccept=" + isAccept +
				'}';
	}
}