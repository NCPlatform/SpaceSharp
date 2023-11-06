package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "BoardCategory")
@Data
public class BoardCategoryDTO {
	
	@Id
	@Column(name="seqBoardCategory", nullable = false)
	private int seqBoardCategory;
	
	@Column(name="title", nullable = false)
	private String title;
	
}
