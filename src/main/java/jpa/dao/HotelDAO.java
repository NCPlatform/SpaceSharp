package jpa.dao;

import java.util.List;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public List<HotelDTO> findTop6ByOrderBySeqHotelDesc();

	//public Page<HotelDTO> findAllByOwnerEmail(String email, Pageable pageable);
	
	@Query("select hotelDTO.seqHotel, hotelDTO.name, hotelDTO.addr, hotelDTO.img from HotelDTO hotelDTO where hotelDTO.ownerEmail like :email order by hotelDTO.seqHotel")
	public Page<HotelDTO> getMyPlace(@Param("email") String email, Pageable pageable);
	
	@Query("SELECT h, COUNT(l.seqHotel) AS likeCount FROM HotelDTO h " +
	        "LEFT JOIN RoomDTO r ON h.seqHotel = r.seqHotel " +
	        "LEFT JOIN ReservationDTO res ON r.seqRoom = res.seqRoom " +
	        "LEFT JOIN LikedDTO l ON h.seqHotel = l.seqHotel " +
	        "WHERE h.seqHotelCategory LIKE %:seqHotelCategory% " +
	        "AND (res.travelStartDate IS NULL OR CAST(CONCAT(:date,' 00:00:00') AS TIMESTAMP) < res.travelStartDate OR CAST(CONCAT(:date,' 23:59:59') AS TIMESTAMP) > res.travelEndDate) " +
	        "AND (:addr='' OR h.addr LIKE %:addr% OR h.addr LIKE %:searchValue%) " +
	        "AND (:minPrice IS NULL OR :maxPrice IS NULL OR r.price IS NULL OR (r.price >= :minPrice AND r.price <= :maxPrice) " +
	        "OR (:searchValue <> '' AND (h.name LIKE %:searchValue% OR h.addr LIKE %:searchValue%))) " +
	        "GROUP BY h.seqHotel " +
	        "ORDER BY likeCount DESC")
    List<HotelDTO> searchHotel(@Param("seqHotelCategory") String seqHotelCategory,
                               @Param("date") Date date,
                               @Param("addr") String addr,
                               @Param("searchValue") String searchValue,
                               @Param("minPrice") Integer minPrice,
                               @Param("maxPrice") Integer maxPrice);
	
	@Query("SELECT h, COUNT(l.seqHotel) AS likeCount, MIN(r.price) AS minPrice FROM HotelDTO h " +
	        "LEFT JOIN RoomDTO r ON h.seqHotel = r.seqHotel " +
	        "LEFT JOIN ReservationDTO res ON r.seqRoom = res.seqRoom " +
	        "LEFT JOIN LikedDTO l ON h.seqHotel = l.seqHotel " +
	        "WHERE h.seqHotelCategory LIKE %:seqHotelCategory% " +
	        "AND (res.travelStartDate IS NULL OR CAST(CONCAT(:date,' 00:00:00') AS TIMESTAMP) < res.travelStartDate OR CAST(CONCAT(:date,' 23:59:59') AS TIMESTAMP) > res.travelEndDate) " +
	        "AND (:addr='' OR h.addr LIKE %:addr% OR h.addr LIKE %:searchValue%) " +
	        "AND (:minPrice IS NULL OR :maxPrice IS NULL OR r.price IS NULL OR (r.price >= :minPrice AND r.price <= :maxPrice) " +
	        "OR (:searchValue <> '' AND (h.name LIKE %:searchValue% OR h.addr LIKE %:searchValue%))) " +
	        "GROUP BY h.seqHotel " +
	        "ORDER BY CASE WHEN COALESCE(MIN(r.price), 0) = 0 THEN 1 ELSE 0 END, COALESCE(MIN(r.price), 0) ASC")
	List<HotelDTO> searchHotelByLowPrice(@Param("seqHotelCategory") String seqHotelCategory,
	                           @Param("date") Date date,
	                           @Param("addr") String addr,
	                           @Param("searchValue") String searchValue,
	                           @Param("minPrice") Integer minPrice,
	                           @Param("maxPrice") Integer maxPrice);
	@Query("SELECT h, COUNT(l.seqHotel) AS likeCount FROM HotelDTO h " +
	        "LEFT JOIN RoomDTO r ON h.seqHotel = r.seqHotel " +
	        "LEFT JOIN ReservationDTO res ON r.seqRoom = res.seqRoom " +
	        "LEFT JOIN LikedDTO l ON h.seqHotel = l.seqHotel " +
	        "WHERE h.seqHotelCategory LIKE %:seqHotelCategory% " +
	        "AND (res.travelStartDate IS NULL OR CAST(CONCAT(:date,' 00:00:00') AS TIMESTAMP) < res.travelStartDate OR CAST(CONCAT(:date,' 23:59:59') AS TIMESTAMP) > res.travelEndDate) " +
	        "AND (:addr='' OR h.addr LIKE %:addr% OR h.addr LIKE %:searchValue%) " +
	        "AND (:minPrice IS NULL OR :maxPrice IS NULL OR r.price IS NULL OR (r.price >= :minPrice AND r.price <= :maxPrice) " +
	        "OR (:searchValue <> '' AND (h.name LIKE %:searchValue% OR h.addr LIKE %:searchValue%))) " +
	        "GROUP BY h.seqHotel " +
	        "ORDER BY COALESCE(MIN(r.price), 0) DESC")
	List<HotelDTO> searchHotelByHighPrice(@Param("seqHotelCategory") String seqHotelCategory,
	                           @Param("date") Date date,
	                           @Param("addr") String addr,
	                           @Param("searchValue") String searchValue,
	                           @Param("minPrice") Integer minPrice,
	                           @Param("maxPrice") Integer maxPrice);

	@Query("SELECT DISTINCT h FROM HotelDTO h "
			+ "LEFT JOIN LikedDTO l ON h.seqHotel = l.seqHotel "
			+ "WHERE l.email LIKE :email")
	public List<HotelDTO> findAllByEmail(@Param("email")String email);

	public List<HotelDTO> findAllByOwnerEmail(String email);

}
