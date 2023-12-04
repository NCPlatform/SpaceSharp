package jpa.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ReservationDTO;
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

	Page<ReservationDTO> findAllByEmail(Pageable pageable, String email);

}