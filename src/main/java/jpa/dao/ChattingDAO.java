package jpa.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ChattingDTO;
import jpa.bean.ChattingRoomDTO;

public interface ChattingDAO extends JpaRepository<ChattingDTO,Integer> {

	List<ChattingDTO> findAllBySenderemail(String email);

	List<ChattingDTO> findAllByChannelId(int channelId);

	List<ChattingDTO> findAllByChannelIdOrderBySeqChatDesc(int channelId);

	void deleteAllByChannelId(int channelId);

}
