package mybatis.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class HotelRoomDTO {

	private String img;
	// column 줄 경우 길이는 varchar(1000) 생각 중
	public String getImg() {
		return img;
	}
	
	private int seqHotel;
	
	private String seqHotelCategory;
	
	private String name;
	
	private String subscribe;
	
	private String mainKeyword;
	
	private String keyword;
	
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
	private String addr;
	
	private String ownerEmail;
	
	private String workinghour;
	
	private String holiday;
	
	private String placeEx;
	
	private String facilities;
	
	private String alert;
	
	private String refund;
	
	private boolean coupon;
	
	private boolean TV;
	
	private boolean internet;
	
	private boolean copy;
	
	private boolean whiteboard;
	
	private boolean mic;
	
	private boolean cooking;
	
	private boolean food;
	
	private boolean alcohol;
	
	private boolean washing;
	
	private boolean parking;

	
	private boolean smoke;

	
	private boolean animal;

	
	private boolean pc;

	
	private boolean isTable;

	
	private boolean socket;

	
	private boolean open24;

	
	private boolean noHoliday;

	
	private boolean restaurant;

	
	private boolean freeFood;

	
	private boolean locker;

	
	private boolean mailService;

	
	private boolean kitchen;

	
	private boolean waterFurifier;

	
	private boolean catering;

	
	private boolean heater;

	
	private boolean airConditioner;

	
	private boolean fax;

	
	private boolean wareHouse;

	
	private boolean percelService;

	
	private boolean privateToilet;

	
	private boolean fittingRoom;

	
	private boolean roofTop;

	
	private boolean rounge;

	
	private boolean mirror;

	
	private boolean bbq;

	
	private boolean doorlock;
	
}
