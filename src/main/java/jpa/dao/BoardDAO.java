package jpa.dao;

import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;

@Repository
public interface BoardDAO extends JpaRepository<BoardDTO, Integer> {

	Optional<BoardDTO> getBySeqRefBoard(int parentSeqBoard);
	Page<BoardDTO> findAll(Pageable pageable);
}
