package jpa.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.BoardDTO;

public interface BoardDAO extends JpaRepository<BoardDTO, Integer> {

	Optional<BoardDTO> getBySeqRefBoard(int parentSeqBoard);

}
