package jpa.bean;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Chat")
@Data
public class ChattingDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private int seqChat;
	
	@Column
	private String senderemail;
	
	@Column
	private String content;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@CreationTimestamp
	@Column
	private Date releaseDate;
	
	@Column
	private int channelId;
}
