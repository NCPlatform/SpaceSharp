package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.CommentDTO;

public interface CommentDAO extends JpaRepository<CommentDTO, Integer> {

}
