package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Room")
@Data
public class RoomDTO {

	@Id
	@Column
	private int seqRoom;
	
	@Column
	private int seqHotel;
	
	@Column
	private String name;
	
	@Column
	private int price;
	
	@Column
	private String img;
	
	@Column
	private String normalExplain;
	
	@Column
	private String placeSize;
	
	@Column
	private String people;
	
	@Column
	private String datetime;
	
	@Column
	private String reserveRule;
}
