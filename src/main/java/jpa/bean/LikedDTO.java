package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Liked")
@Data
public class LikedDTO {
	
	@Id
	@Column(nullable = false)
	private int seqLiked;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private int seqHotel;
	
}
