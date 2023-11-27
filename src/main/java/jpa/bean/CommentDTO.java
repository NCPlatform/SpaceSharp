package jpa.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Comment")
@Data
public class CommentDTO {

	@Id
	@Column(nullable=false)
	private int seqComment;
	
	@Column(nullable=false)
	private String email;
	
	@Column
	private int rating;
	
	@Column
	private int seqRefComment;
	
	@Column
	private int seqReservation;
	
	@Column
	private Date commentDate;
	
	@Column
	private String picture;
	
}
