package jpa.dao;

import java.util.Optional;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jpa.bean.BoardDTO;
import jpa.bean.UserDTO;

@Repository
public interface BoardDAO extends JpaRepository<BoardDTO, Integer> {

	Optional<BoardDTO> getBySeqRefSeqBoard(int parentSeqBoard);
	Page<BoardDTO> findAll(Pageable pageable);

	Page<BoardDTO> findBySeqRefSeqBoard(Pageable pageable, int seqRefSeqBoard);

	Optional<BoardDTO> findBySeqRefSeqBoard(int seqRefSeqBoard);
}
