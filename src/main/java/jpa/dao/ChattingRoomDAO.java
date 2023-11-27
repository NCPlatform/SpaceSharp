package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ChattingRoomDTO;

public interface ChattingRoomDAO extends JpaRepository<ChattingRoomDTO,Integer> {

	List<ChattingRoomDTO> findAllByUsersContaining(String email);

}
