package jpa.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.CouponDTO;

public interface CouponDAO extends JpaRepository<CouponDTO, Integer> {

	Page<CouponDTO> findAllByTitleContaining(Pageable pageable, String searchValue);

}
