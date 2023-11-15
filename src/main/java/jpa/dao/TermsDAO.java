package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.TermsDTO;

public interface TermsDAO extends JpaRepository<TermsDTO, String> {

}
