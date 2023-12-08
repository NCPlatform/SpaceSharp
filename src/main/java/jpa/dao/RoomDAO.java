package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jpa.bean.RoomDTO;

public interface RoomDAO extends JpaRepository<RoomDTO, Integer> {
	public List<RoomDTO> findBySeqHotel(int seqHotel);

	@Query("SELECT DISTINCT r FROM RoomDTO r " +
            "LEFT JOIN HotelDTO h ON h.seqHotel = r.seqHotel "
            + "WHERE h.ownerEmail Like :email")
	public List<RoomDTO> findAllByOwnerEmail(@Param("email")String email);

//	@Query("select roomDTO.seqRoom, roomDTO.name, roomDTO.img, roomDTO.people from RoomDTO roomDTO where roomDTO.seqHotel = :seq order by roomDTO.seqRoom")
//	public List<RoomDTO> getMyRoom(@Param("seq") int seqHotel);
	
	
}
