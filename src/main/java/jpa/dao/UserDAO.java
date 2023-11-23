package jpa.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.UserDTO;

public interface UserDAO extends JpaRepository<UserDTO, String> {
	
	boolean existsByEmail(String email);

	UserDTO findByEmail(String email);


	






	Page<UserDTO> findAllByUsergradeLessThan(Pageable pageable, int i);

	Page<UserDTO> findAllByUsergrade(Pageable pageable, int i);
}