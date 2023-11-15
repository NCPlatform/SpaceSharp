package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ReservationDTO;

public interface ReservationDAO extends JpaRepository<ReservationDTO, Integer> {

}
