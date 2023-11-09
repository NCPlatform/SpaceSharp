package jpa.bean;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Board")
@Data
public class BoardDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private int seqBoard;
	
	@Column
	private int seqBoardCategory;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	@Column
	private int seqRefSeqBoard;
	
	@Column
	private String email;
	
	@CreationTimestamp
	@Column
	private Date releaseDate;
	
	
}
