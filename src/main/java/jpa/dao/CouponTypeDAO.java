package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.CouponTypeDTO;

public interface CouponTypeDAO extends JpaRepository<CouponTypeDTO, Integer> {

}
