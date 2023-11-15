package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.BoardCategoryDTO;

public interface BoardCategoryDAO extends JpaRepository<BoardCategoryDTO, Integer> {

}
