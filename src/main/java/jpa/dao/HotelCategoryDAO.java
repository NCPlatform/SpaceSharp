package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.HotelCategoryDTO;

public interface HotelCategoryDAO extends JpaRepository<HotelCategoryDTO, Integer> {

}
