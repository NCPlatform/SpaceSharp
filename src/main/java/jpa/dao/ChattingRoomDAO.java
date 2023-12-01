package jpa.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jpa.bean.ChattingRoomDTO;

public interface ChattingRoomDAO extends JpaRepository<ChattingRoomDTO,Integer> {

	Collection<? extends ChattingRoomDTO> findAllByChannelId(int channelId);

	ChattingRoomDTO findByName(String string);

	void deleteAllByChannelId(int channelId);


}
