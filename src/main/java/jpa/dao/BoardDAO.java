package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.BoardDTO;

public interface BoardDAO extends JpaRepository<BoardDTO, Integer> {

}
