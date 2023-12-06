package jpa.dao;

import java.util.Optional;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jpa.bean.BoardDTO;

@Repository
public interface BoardDAO extends JpaRepository<BoardDTO, Integer> {

	Optional<BoardDTO> getBySeqRefSeqBoard(int parentSeqBoard);
	
	Page<BoardDTO> findAll(Pageable pageable);

	Page<BoardDTO> findBySeqRefSeqBoard(Pageable pageable, int seqRefSeqBoard);

	Page<BoardDTO> findAllByEmailAndSeqBoardCategory(Pageable pageable, String email, int i);

	Page<BoardDTO> findAllBySeqBoardCategoryAndTitleContaining(Pageable pageable, int seqBoardCategory,
			String searchKey);

	Page<BoardDTO> findBySeqRefSeqBoardAndSeqBoardCategory(Pageable pageable, int seqRefSeqBoard, int i);


	Page<BoardDTO> findBySeqRefSeqBoardAndSeqBoardCategoryLike(Pageable pageable, int seqRefSeqBoard, int i);
}
