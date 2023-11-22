package jpa.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jpa.bean.HotelDTO;

public interface HotelDAO extends JpaRepository<HotelDTO, Integer> {
	
	@Query("select hotelDTO.seqHotel from HotelDTO hotelDTO where hotelDTO.ownerEmail=:email and hotelDTO.addr=:addr and hotelDTO.name=:name")
	public int importSeq(@Param("email") String ownerEmail, @Param("addr") String addr, @Param("name") String name);

	List<HotelDTO> findBySeqHotelCategoryContaining(String seqHotelCategory);
	
	@Query("SELECT h FROM HotelDTO h WHERE h.seqHotelCategory IN :categories")
    List<HotelDTO> findBySeqHotelCategoryIn(@Param("categories") List<String> seqHotelCategories);
	

}
