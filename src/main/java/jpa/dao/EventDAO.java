package jpa.dao;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.EventDTO;

public interface EventDAO extends JpaRepository<EventDTO, Integer> {
	
	Page<EventDTO> findAllByFinishDateBefore(Pageable pageable, Date now);

	Page<EventDTO> findAllByFinishDateAfter(Pageable pageable, Date now);

	List<EventDTO> findAllByFinishDateBetween(Date before, Date now);

	List<EventDTO> findAllByFinishDateLessThanEqualAndStartDateGreaterThanEqual(Date date, Date date2);

}
