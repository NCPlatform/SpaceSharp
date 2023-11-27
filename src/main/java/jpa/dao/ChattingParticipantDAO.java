package jpa.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ChattingDTO;
import jpa.bean.ChattingParticipantDTO;
import jpa.bean.UserDTO;

public interface ChattingParticipantDAO extends JpaRepository<ChattingParticipantDTO,Integer> {

	List<ChattingParticipantDTO> findAllByMemberemail(String email);

	List<ChattingParticipantDTO> findAllByChannelId(int channelId);

}
