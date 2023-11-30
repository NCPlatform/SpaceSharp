package jpa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.IssuedCouponDTO;

public interface IssuedCouponDAO extends JpaRepository<IssuedCouponDTO, Integer> {

	List<IssuedCouponDTO> findAllByEmail(String email);
}
