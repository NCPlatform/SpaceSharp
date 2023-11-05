package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Reservation")
@Data
public class ReservationDTO {

	@Id
	@Column
	private int seqReservation;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private int seqRoom;
	
	@Column(nullable = false)
	private Date reservationDate;
	
	@Column(nullable = false)
	private Date travelStartDate;
	
	@Column(nullable = false)
	private Date travelEndDate;
	
	@Column
	private int travelfulltime;
	
	@Column
	private int active;
	
	@Column
	private String payment;
	
}
