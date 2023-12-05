package jpa.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.LikedDTO;

public interface LikedDAO extends JpaRepository<LikedDTO, Integer> {

	List<LikedDTO> findAllBySeqHotel(int seqHotel);

	Optional<LikedDTO> findByEmailAndSeqHotel(String email, int seqHotel);

}
