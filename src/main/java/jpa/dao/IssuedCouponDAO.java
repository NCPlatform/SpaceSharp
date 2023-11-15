package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.IssuedCouponDTO;

public interface IssuedCouponDAO extends JpaRepository<IssuedCouponDTO, Integer> {

}
