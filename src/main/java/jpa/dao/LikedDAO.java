package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.LikedDTO;

public interface LikedDAO extends JpaRepository<LikedDTO, Integer> {

	List<LikedDTO> findAllBySeqHotel(int seqHotel);

}
