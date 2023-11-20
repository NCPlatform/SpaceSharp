package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ReservationDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReservationDAO extends JpaRepository<ReservationDTO, Integer> {

    @Query("SELECT r FROM ReservationDTO r WHERE r.seqRoom = :seqRoom AND DATE(r.travelStartDate) = DATE(:date)")
    List<ReservationDTO> findReservationsByRoomAndDate(@Param("seqRoom") int seqRoom, @Param("date") Date date);

}
