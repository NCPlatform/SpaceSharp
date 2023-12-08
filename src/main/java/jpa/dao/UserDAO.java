package jpa.dao;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import jpa.bean.UserDTO;

import java.util.Collection;
import java.util.List;

public interface UserDAO extends JpaRepository<UserDTO, String> {
	
	boolean existsByEmail(String email);
	
	Page<UserDTO> findAllByUsergradeLessThan(Pageable pageable, int i);

	Page<UserDTO> findAllByUsergrade(Pageable pageable, int i);

	List<UserDTO> findAllByEmail(String memberemail);

	UserDTO findByEmail(String email);
	
    void delete(UserDTO userDTO);
    
    UserDTO findByNameAndPassword(String name, String password);
    
    boolean existsByEmailAndIskakao(String email, boolean iskakao);
    
    

}