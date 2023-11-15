package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.UserDTO;

public interface UserDAO extends JpaRepository<UserDTO, String> {
    
}