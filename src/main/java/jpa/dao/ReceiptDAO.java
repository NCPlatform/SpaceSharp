package jpa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ReceiptDTO;

public interface ReceiptDAO extends JpaRepository<ReceiptDTO, Integer> {

	ReceiptDTO findBySeqReservation(int seqReservation);

}