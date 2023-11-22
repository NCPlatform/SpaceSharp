package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.RoomDTO;

public interface RoomDAO extends JpaRepository<RoomDTO, Integer> {
	List<RoomDTO> findBySeqHotel(int seqHotel);
}
