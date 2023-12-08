package jpa.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.IssuedCouponDTO;

public interface IssuedCouponDAO extends JpaRepository<IssuedCouponDTO, Integer> {

	List<IssuedCouponDTO> findAllByEmail(String email);
	
	Optional<IssuedCouponDTO> findByEmailAndSeqCoupon(String email, int seqCoupon);

	List<IssuedCouponDTO> findAllBySeqCoupon(int seqCoupon);

}
