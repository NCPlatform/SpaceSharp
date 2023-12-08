package jpa.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ReservationDTO;
import jpa.bean.ReserveViewDTO;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReservationDAO extends JpaRepository<ReservationDTO, Integer> {

    @Query(value = "SELECT r FROM ReservationDTO r WHERE r.seqRoom = :seqRoom AND ((DATE(r.travelStartDate) BETWEEN DATE(:startDate) AND DATE(:endDate)) OR (DATE(r.travelEndDate) BETWEEN DATE(:startDate) AND DATE(:endDate)))")
    List<ReservationDTO> findReservationsByRoomAndDate(@Param("seqRoom") int seqRoom, @Param("startDate") Date startDate,@Param("endDate") Date endDate);

	Collection<? extends ReservationDTO> findAllBySeqRoom(int seqRoom);

	Optional<ReservationDTO> getBySeqReservation(int seqReservation);

	Optional<ReservationDTO> findByEmailAndReservationDate(String email, Date reservationDate);

	Optional<ReservationDTO> findTopByOrderBySeqReservationDesc();
	

	@Query("select new jpa.bean.ReserveViewDTO( "
			+ "userT.name as user_name,"
			+ "reserT.travelStartDate as departure,"
			+ "reserT.travelEndDate as arrival,"
			+ "roomT.name as room_name,"
			+ "hotelT.ownerEmail )"
			+ "from ReservationDTO reserT " 
			+ "INNER JOIN UserDTO userT ON reserT.email = userT.email "
			+ "INNER JOIN RoomDTO roomT ON roomT.seqRoom = reserT.seqRoom "
			+ "INNER JOIN HotelDTO hotelT ON hotelT.seqHotel = roomT.seqHotel "
			+ "where hotelT.ownerEmail = :userEmail")
	List<ReserveViewDTO> viewReservations(@Param("userEmail") String userEmail);


	Page<ReservationDTO> findAllByEmail(Pageable pageable, String email);

	@Query("SELECT DISTINCT re FROM ReservationDTO re "
			+ "LEFT JOIN RoomDTO r ON re.seqRoom = r.seqRoom "
            + "LEFT JOIN HotelDTO h ON h.seqHotel = r.seqHotel "
            + "WHERE h.ownerEmail Like :email")
	List<ReservationDTO> findAllByOwnerEmail(@Param("email")String email);

}