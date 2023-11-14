package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.CouponDTO;

public interface CouponDAO extends JpaRepository<CouponDTO, Integer> {

}
