package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.HotelDTO;

public interface HotelDAO extends JpaRepository<HotelDTO, Integer> {

}
