package jpa.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "HotelCategory")
@Data
public class HotelCategoryDTO {
	
	@Id
	@Column(nullable = false)
	private int seqHotelCategory;
	
	@Column(nullable = false)
	private String name;
	
	@Column
	private String tab;
	
}
