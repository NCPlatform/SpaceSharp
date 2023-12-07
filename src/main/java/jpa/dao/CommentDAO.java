package jpa.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.CommentDTO;

public interface CommentDAO extends JpaRepository<CommentDTO, Integer> {

	public List<CommentDTO> findAllBySeqReservation(int seqReservation);

	public List<CommentDTO> findTop6ByOrderBySeqCommentDesc();

	public Page<CommentDTO> findAllByEmail(Pageable pageable, String email);

}
