package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.LikedDTO;

public interface LikedDAO extends JpaRepository<LikedDTO, Integer> {

}
