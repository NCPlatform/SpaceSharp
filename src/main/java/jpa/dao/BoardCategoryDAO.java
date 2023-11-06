package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.BoardCategoryDTO;

//@Repository
public interface BoardCategoryDAO extends JpaRepository<BoardCategoryDTO, Integer> {

}
