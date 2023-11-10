package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.HotelDTO;

public interface HotelDAO extends JpaRepository<HotelDTO, Integer> {

	List<HotelDTO> findAllBySeqHotelCategory(String seqHotelCategory);

}
