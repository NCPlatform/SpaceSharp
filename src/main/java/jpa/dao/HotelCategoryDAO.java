package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.HotelCategoryDTO;
import jpa.bean.HotelDTO;

public interface HotelCategoryDAO extends JpaRepository<HotelCategoryDTO, Integer> {

}
