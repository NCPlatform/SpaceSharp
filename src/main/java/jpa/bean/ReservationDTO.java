package jpa.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import user.service.UserService;

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
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
	@Column(nullable = false)
	private Date reservationDate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
	@Column(nullable = false)
	private Date travelStartDate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
	@Column(nullable = false)
	private Date travelEndDate;
	
	@Column
	private int travelfulltime;
	
	@Column
	private Integer active;
	
	@Column
	private String payment;
	

}