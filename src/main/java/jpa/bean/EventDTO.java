package jpa.bean;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Event")
@Data
public class EventDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private int seqEvent;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	@Column
	private String img;
	
	@Column
	private String mainImg;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@CreationTimestamp
	@Column
	private Date startDate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
	@Column
	private Date finishDate;
	
	@Column
	private String CouponSeq;
	
}
