package jpa.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jpa.bean.CommentDTO;

public interface CommentDAO extends JpaRepository<CommentDTO, Integer> {

	public List<CommentDTO> findAllBySeqReservation(int seqReservation);

	public List<CommentDTO> findTop6ByOrderBySeqCommentDesc();

	public Page<CommentDTO> findAllByEmail(Pageable pageable, String email);

	@Query("SELECT DISTINCT co FROM CommentDTO co "
			+ "LEFT JOIN ReservationDTO re ON co.seqReservation = re.seqReservation "
			+ "LEFT JOIN RoomDTO r ON re.seqRoom = r.seqRoom "
            + "LEFT JOIN HotelDTO h ON h.seqHotel = r.seqHotel "
            + "WHERE h.ownerEmail Like :email")
	public List<CommentDTO> findAllByOwnerEmail(@Param("email") String email);

}
