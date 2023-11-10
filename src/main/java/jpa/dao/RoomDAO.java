package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.RoomDTO;

public interface RoomDAO extends JpaRepository<RoomDTO, Integer> {

}
