package jpa.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ChattingDTO;
import jpa.bean.ChattingRoomDTO;

public interface ChattingDAO extends JpaRepository<ChattingDTO,Integer> {

	Collection<? extends ChattingDTO> findAllBySenderemailAndReceiveremail(String email, String email2);

	Collection<? extends ChattingDTO> findAllByChannelId(int channelId);

}
